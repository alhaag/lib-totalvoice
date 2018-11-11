/**
 * Módulo que consome recursos de TTS da API da TotalVoice.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module exports.
 * @public
 */
module.exports = tts

/**
 * Instancia módulo.
 *
 * @param {Object} httpClient
 */
function tts(httpClient) {

  const PATH = '/tts'

  /**
   * Envia mensagem transcrita por TTS (text-to-speach) para um número específico.
   *
   * @param {String} numero_destino
   * @param {String} mensagem
   * @param {Object} opcoes
   * @return {Promise}
   */
  this.enviar = (numero_destino, mensagem, opcoes) => {
    const data = {
      numero_destino,
      mensagem
    }
    return httpClient.post(PATH, {...data, ...opcoes})
  }

  /**
   * Busca um TTS por ID.
   *
   * @param {Number} id
   * @return {Promise}
   */
  this.buscar = (id) => {
    return httpClient.get(`${PATH}/${id}`)
  }

  /**
   * Relatório de mensagens TTS enviadas.
   *
   * @param {string} data_inicio
   * @param {string} data_fim
   * @return {Promise}
   */
  this.relatorio = (data_inicio, data_fim) => {
    return httpClient.get(`${PATH}/relatorio`, {
      params: {
        data_inicio,
        data_fim
      }
    })
  }

}
