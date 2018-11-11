/**
 * Aplicação de exmplo de utilização da biblioteca lib-totalvoice.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const libTotalVoice = require('../index.js')
require('dotenv').config()

/**
 * Module variables.
 * @private
 */
// const BASE_PATH = 'http://api-fake:3000'

const ACCESS_TOKEN = process.env.ACCESS_TOKEN // defined in .env file
// const totalVoice = new libTotalVoice(ACCESS_TOKEN, BASE_PATH)
const totalVoice = new libTotalVoice(ACCESS_TOKEN)

// -----------------------------------------------------------------------------
// Sequencia de requisições de teste
// -----------------------------------------------------------------------------
async function startExamples() {
  try {
    // SMS
    // -------------------------------------------------------------------------
    // envia SMS
    let smsResult = await totalVoice.sms.enviar('48999999999', 'Teste de evio de SMS')
    console.log('SMS result', smsResult)

    // consulta SMS enviado
    let idSMS = JSON.parse(smsResult.body).dados.id
    let smsPorIdResult = await totalVoice.sms.buscar(idSMS)
    console.log('SMS por ID result', smsPorIdResult)

    // relatório de SMSs enviados
    let smsRelatorioResult = await totalVoice.sms.relatorio('2018-11-10T23:34:08-03:00', '2018-11-12T23:34:08-03:00')
    console.log('SMS relatorio result', smsRelatorioResult)

    // Chamada
    // -------------------------------------------------------------------------
    // gera chamada A -> B
    let chamadaResult = await totalVoice.chamada.ligar('48999999999', '4832222222')
    console.log('Chamada result', chamadaResult)

    // encerra chamada após 15 segundos
    let idChamada = JSON.parse(chamadaResult.body).dados.id
    setTimeout(async () => {
      let encerrarChamadaResult = await totalVoice.chamada.encerrar(idChamada)
      console.log('Encerrar chamada result', encerrarChamadaResult)
    }, 15 * 1000)

    // TTS
    // -------------------------------------------------------------------------
    // envia mensagem por TTS
    let ttsResult = await totalVoice.tts.enviar('4832222222', 'Teste de mensagem gerada por text to speach')
    console.log('TTS result', ttsResult)

    // Consulta TTS por ID
    let idTTS = JSON.parse(ttsResult.body).dados.id
    let ttsPorIdResult = await totalVoice.tts.buscar(idTTS)
    console.log('TTS por ID result', ttsPorIdResult)

    // relatório de TTSs enviados
    let ttsRelatorioResult = await totalVoice.tts.relatorio('2018-11-10T23:34:08-03:00', '2018-11-12T23:34:08-03:00')
    console.log('TTS relatorio result', ttsRelatorioResult)

  } catch (error) {
    console.error(error)
  }

}

// wait api fake
setTimeout(() => {
  startExamples()
}, 1000)

