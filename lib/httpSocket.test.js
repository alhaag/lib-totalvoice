const rewire = require('rewire')
const httpSocket = rewire('./httpSocket.js')

describe('httpSocket unit tests', function () {

  test('getHostOfURL', () => {
    const getHostOfURL = httpSocket.__get__('getHostOfURL')
    const expectHost = 'example.com'

    expect(getHostOfURL('http://example.com')).toEqual(expectHost)
    expect(getHostOfURL('http://example.com/test')).toEqual(expectHost)
    expect(getHostOfURL('http://example.com:3000/test')).toEqual(expectHost)
    expect(getHostOfURL('https://example.com:3000/test')).toEqual(expectHost)
    expect(getHostOfURL('https://example.com:3000/test')).toEqual(expectHost)
  })

  test('getPortOfURL', () => {
    const getPortOfURL = httpSocket.__get__('getPortOfURL')

    expect(getPortOfURL('http://example.com')).toEqual(80)
    expect(getPortOfURL('https://example.com')).toEqual(443)
    expect(getPortOfURL('http://example.com/test')).toEqual(80)
    expect(getPortOfURL('http://example.com:3000/test')).toEqual(3000)
    expect(getPortOfURL('https://example.com:3000/test')).toEqual(3000)
  })

  test('getPortOfURL', () => {
    const getPathOfURL = httpSocket.__get__('getPathOfURL')

    expect(getPathOfURL('http://example.com')).toEqual('/')
    expect(getPathOfURL('https://example.com')).toEqual('/')
    expect(getPathOfURL('http://example.com/test')).toEqual('/test')
    expect(getPathOfURL('http://example.com:3000/test')).toEqual('/test')
    expect(getPathOfURL('https://example.com:3000/test/abc')).toEqual('/test/abc')
  })

  test('getProtocolOfURL', () => {
    const getProtocolOfURL = httpSocket.__get__('getProtocolOfURL')

    expect(getProtocolOfURL('http://example.com')).toEqual('http')
    expect(getProtocolOfURL('https://example.com')).toEqual('https')
    expect(getProtocolOfURL('http://example.com/test')).toEqual('http')
    expect(getProtocolOfURL('http://example.com:3000/test')).toEqual('http')
    expect(getProtocolOfURL('https://example.com:3000/test/abc')).toEqual('https')
  })

  test('packetEncode', () => {
    const packetEncode = httpSocket.__get__('packetEncode')
    expect(packetEncode({url: 'http://example.com'})).toEqual('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n\r\n')
    expect(packetEncode({url: 'http://example.com', method: 'POST', json: {id: 1}})).toEqual('POST / HTTP/1.1\r\nHost: example.com\r\nContent-Length: 8\r\n\r\n{\"id\":1}\r\n\r\n')
  })

})
