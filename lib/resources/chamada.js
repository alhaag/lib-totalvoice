/**
 * Módulo que consome recursos de chamada da API da TotalVoice.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module exports.
 * @public
 */
module.exports = chamada

/**
 * Instancia módulo.
 *
 * @param {Object} httpClient
 */
function chamada(httpClient) {

  const PATH = '/chamada'

  /**
   * Realiza uma chamada entre dois números.
   *
   * @param {String} numero_origem
   * @param {String} numero_destino
   * @param {Object} opcoes
   * @return {Promise}
   */
  this.ligar = function (numero_origem, numero_destino, opcoes = {}) {
    return httpClient.post(PATH, {
      numero_origem,
      numero_destino,
      opcoes
    })
  }

  /**
   * Encerra uma chamada por id.
   *
   * @param {Number} id ID da chamada obtido no momento da geração.
   * @return {Promise}
   */
  this.encerrar = function (id) {
    return httpClient.delete(`${PATH}/${id}`)
  }

}
