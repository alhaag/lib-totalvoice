/**
 * Modulo responsável por tratar sockets de conexão HTTP.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const net = require('net')
const tls = require('tls')
const fs = require('fs')

/**
 * Module variables
 * @private
 */
const SEPARATOR = '\r\n'

/**
 * Module exports.
 * @public
 */
module.exports.request = request

/**
 * Gera uma requisição HTTP.
 *
 * @param {Object} options Opções de requisição.
 * @param {Function} callback Função de callback
 */
function request (options, callback) {
  if (!('url' in options)) {
    throw new Error('url is required!')
  }

  const protocol = getProtocolOfURL(options.url)
  const host = getHostOfURL(options.url)
  const port = getPortOfURL(options.url)

  const tlsOptions = {
    key: fs.readFileSync(__dirname + '/certs/private-key.pem'),
    cert: fs.readFileSync(__dirname + '/certs/public-cert.pem'),
    rejectUnauthorized: false
  }

  if (protocol === 'http') {
    var client = new net.Socket()

    client.connect(port, host, function () {
      console.log('1. connected')

      let packet = packetEncode(options)
      sendMessage(client, packet)
    })
  } else {
    var client = tls.connect(port, host, tlsOptions, function() {
      // Check if the authorization worked
      if (!client.authorized) {
        console.log("Connection not authorized: " + client.authorizationError)
      }
      console.log('1. connected')
      let packet = packetEncode(options)
      sendMessage(client, packet)
    })
  }

  client.on('data', function (data) {
    console.log('2. data')
    client.destroy() // kill client after server's response
    let packet = data.toString()
    const decodedPacket = receiveMessage(packet)
    callback(null, decodedPacket)
  })

  client.on('close', function () {
    console.log('3. connection closed')
  })
}

function sendMessage(client, packet) {
  console.log('TX >>>>>>>>>')
  console.log(packet)
  console.log('>>>>>>>>>>>>\n')
  client.write(packet)
}

function receiveMessage(packet) {
  console.log('RX <<<<<<<<<')
  console.log(packet)
  console.log('<<<<<<<<<<<<\n')
  return packetDecode(packet)
}

function packetEncode(options) {
  const method = options.method || 'GET'
  const path = getPathOfURL(options.url)
  const host = getHostOfURL(options.url)
  const httpVersion = options.httpVersion || '1.1'
  const body = (options.json) ? JSON.stringify(options.json) : options.body
  options.headers = options.headers || []
  var headers = Object.keys(options.headers).map(headerKey => {
    return `${headerKey}: ${options.headers[headerKey]}`
  })
  if (body) {
    headers.push(`Content-Length: ${body.length}`)
  }
  headers = headers.join(SEPARATOR)

  var packet = `${method} ${path} HTTP/${httpVersion}` + SEPARATOR +
    'Host: ' + host + SEPARATOR +
    headers + SEPARATOR + SEPARATOR

  if (body) {
    packet += body +  SEPARATOR +  SEPARATOR
  }
  return packet
}

function packetDecode(strPacket) {
  const arrAux = strPacket.split(SEPARATOR + SEPARATOR)
  const allHeaders = arrAux[0].split(SEPARATOR)
  const responseHeader = allHeaders.shift() // HTTP/1.1 200 OK
  const statusCode = responseHeader.split(' ')[1]
  const headers = allHeaders
  const body = arrAux[1]

  return {
    statusCode,
    headers,
    body
  }
}

function getHostOfURL(url) {
  const arrAux = splitProtocol(url) // 'http://teste.com:3000/abc/def' => ['http', '//teste.com:3000/abc/def', '']
  const hostAndPath = arrAux[1].replace('\/\/', '') // '//teste.com:3000/abc/def' => 'teste.com:3000/abc/def'
  const host = hostAndPath.split(/\/(.+)/)[0] // teste.com:3000
  const hostWhitoutPort = (host.indexOf(':') !== -1) ? host.split(':')[0] : host
  return hostWhitoutPort
}

function getPortOfURL(url) {
  const arrAux = splitProtocol(url) // 'http://teste.com:3000/abc/def' => ['http', '//teste.com:3000/abc/def', '']
  const hostAndPath = arrAux[1].replace('\/\/', '') // '//teste.com:3000/abc/def' => 'teste.com:3000/abc/def'
  const host = hostAndPath.split(/\/(.+)/)[0] // teste.com:3000
  const port = (host.indexOf(':') !== -1)
    ? host.split(':')[1]
    : ((getProtocolOfURL(url) === 'https') ? 443 : 80)
  return parseInt(port)
}

function getPathOfURL(url) {
  const arrAux = splitProtocol(url) // 'http://teste.com:3000/abc/def' => ['http', '//teste.com:3000/abc/def', '']
  const hostAndPath = arrAux[1].replace('\/\/', '') // '//teste.com:3000/abc/def' => 'teste.com:3000/abc/def'
  const path = hostAndPath.split(/\/(.+)/)[1] // abc/def
  return (path) ? `/${path}` : '/'
}

function getProtocolOfURL (url) {
  const protocol = url.split(/:(.+)/)[0] || 'http'
  return protocol
}

function splitProtocol(url) {
  return url.split(/:(.+)/) // 'http://teste.com:3000/abc/def' => ['http', '//teste.com:3000/abc/def', '']
}
