/**
 * Módulo que consome recursos de SMS da API da TotalVoice.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module exports.
 * @public
 */
module.exports = sms

/**
 * Instancia módulo.
 *
 * @param {Object} httpClient
 */
function sms(httpClient) {

  const PATH = '/sms'

  /**
   * Envia um sms para um número destino.
   *
   * @param {String} numero_destino
   * @param {String} mensagem
   * @param {Bool} resposta_usuario
   * @param {Bool} multi_sms
   * @param {String} data_criacao
   * @return {Promise}
   */
  this.enviar = (numero_destino, mensagem, resposta_usuario, multi_sms, data_criacao) => {
    return httpClient.post(PATH, {
      numero_destino,
      mensagem,
      resposta_usuario,
      multi_sms,
      data_criacao
    })
  }

  /**
   * Busca um sms por ID.
   *
   * @param {Number} id
   * @return {Promise}
   */
  this.buscar = function (id) {
    return httpClient.get(`${PATH}/${id}`)
  }

  /**
   * Relatório de mensagens SMS.
   *
   * @param {String} data_inicio
   * @param {String} data_fim
   * @return {Promise}
   */
  this.relatorio = function (data_inicio, data_fim) {
    return httpClient.get(`${PATH}/relatorio`, {
      params: {
        data_inicio,
        data_fim
      }
    })
  }

}
