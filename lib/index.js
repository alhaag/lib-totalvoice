/**
 * Biblioteca que consome recursos da API da TotalVoice.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module dependencies
 * @private
 */
const HTTPClient = require('./httpClient')
const sms = require('./resources/sms')
const chamada = require('./resources/chamada')
const tts = require('./resources/tts')

/**
 * Module variables
 * @private
 */
const BASE_PATH = 'https://api.totalvoice.com.br'

/**
 * Module exports.
 * @public
 */
module.exports = init

/**
 * Instacia biblioteca.
 *
 * @param {string} token Token de acesso obitido junto a TotalVoice.
 * @param {object} options Opções de acordo com o serviço utilziado.
 */
function init(token, basePath = BASE_PATH) {
  console.log('construct lib-totalvoice')
  if (!token) {
    throw new Error('Access Token is required!')
  }

  const defaultHeaders = {
    'Access-Token': token,
    'Content-Type': 'application/json'
  }

  this.httpClient = new HTTPClient(basePath, defaultHeaders)
}

Object.defineProperty(init.prototype, 'sms', {
  get: function () {
    this._sms = this._sms || new sms(this.httpClient)
    return this._sms
  }
})

Object.defineProperty(init.prototype, 'chamada', {
  get: function () {
    this._chamada = this._chamada || new chamada(this.httpClient)
    return this._chamada
  }
})

Object.defineProperty(init.prototype, 'tts', {
  get: function () {
    this._tts = this._tts || new tts(this.httpClient)
    return this._tts
  }
})
