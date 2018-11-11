/**
 * Módulo responsável por realizar as requisições HTTP.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const httpSocket = require('./httpSocket')

/**
 * Module exports.
 * @public
 */
module.exports = HTTPClient

/**
 *
 */
function HTTPClient(baseURL = '', defaultHeaders) {

  this.generateRequest = function (method, path, body, additionalHeaders = {}) {

    const url = `${baseURL}${path}`
    const headers = {...defaultHeaders, ...additionalHeaders}

    console.log(
      `HTTPClient.generateRequest =>
      method: ${method}, url: ${url},
      headers: ${JSON.stringify(headers)},
      body: ${JSON.stringify(body)}`
    )

    return new Promise((resolve, reject) => {
      let options = {
        url: url,
        method: method,
        headers: headers,
        json: body
      }

      httpSocket.request(options, function (err, body) {
        if (err) reject(err)
        resolve(body)
      })
    })
  }

  this.get = (path, body, additionalHeaders) => this.generateRequest('GET', path, body, additionalHeaders)
  this.post = (path, body, additionalHeaders) => this.generateRequest('POST', path, body, additionalHeaders)
  this.put = (path, body, additionalHeaders) => this.generateRequest('PUT', path, body, additionalHeaders)
  this.delete = (path, body, additionalHeaders) => this.generateRequest('DELETE', path, body, additionalHeaders)
  // TODO: implement others verbs
}
