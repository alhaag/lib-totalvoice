/**
 * Modulo responsável por emular a API da TotalVoice.
 *
 * Util para realizar o desenvolvimento inicial sem a necessidade de interagir
 * diretamente com a API oficial.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module dependencies
 * @private
 */
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')


/**
 * Module variables.
 */
const port = 3000
const app = express()
const server = http.createServer(app)

// define middlewares and limits
// -----------------------------------------------------------------------------
app.use(bodyParser.json({ limit: '2mb' })) // set request body limit
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))

// define api resources
// -----------------------------------------------------------------------------
app.get('/', (req, res) => {
  console.log('GET / ', req.body)
  res.send('Hello World!')
})

app.post('/sms', (req, res) => {
  console.log('POST /sms ', req.body)
  res.json({
    "status": 200,
    "sucesso": true,
    "motivo": 0,
    "mensagem": "sms criado com sucesso",
    "dados": {
      "id": 4921
    }
  })
})

app.post('/chamada', (req, res) => {
  console.log('POST /sms ', req.body)
  res.json({
    "status": 200,
    "sucesso": true,
    "motivo": 0,
    "mensagem": "chamada criada com sucesso",
    "dados": {
      "id": 4921
    }
  })
})

// server listen
// -----------------------------------------------------------------------------
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP port bind.
 */
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port
  console.log('Listening on %s', bind)
}

/**
 * Event listener for HTTP server "error" event.
 *
 * @param error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('%s requires elevated privileges', bind)
      process.exit(1)
    case 'EADDRINUSE':
      // console.error(bind + ' is already in use');
      console.error('%s is already in use', bind)
      process.exit(1)
    default:
      throw error
  }
}
