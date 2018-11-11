# Aplicação de exemplo para consumo da lib-totalvoice

Biblioteca NodeJS com zero depenências para para consumo da API da TotalVoice.

https://api.totalvoice.com.br/doc/

## Funcionalidades

Os seguintes recursos da API estão disponíveis para consumo por meio da biblioteca:

- [ ] /status/*
- [ ] /audio/*
- [ ] /composto/*
- [X] /chamadas/* (parcial)
- [X] /sms/*
- [X] /tts/*
- [ ] /ramal/*
- [ ] /ura/*
- [ ] /webphone/*
- [ ] /conta/*
- [ ] /fila/*
- [ ] /did/*
- [ ] /saldo/*
- [ ] /webhook/*
- [ ] /bina/*
- [ ] /verificacao/*
- [ ] /conferencia/*

## Requisitos

 * NodeJs 8.x ou maior

## Utilização

```javascript
const libTotalVoice = require('../lib-totalvoice')

const ACCESS_TOKEN = 'token_de_acesso_obtido_no_registro'
const totalVoice = new libTotalVoice(ACCESS_TOKEN)

totalVoice.sms.enviar('4899999999', 'Teste de evio de SMS').then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})
```

## Aplicação de exemplo

No diretório **example** está disponível uma aplicação de exemplo que pode ser executada por containers Docker
com hot reload para auxiliar o entendimento.

Para executar a aplicação de exemplo deve-se instalar as depenências:

```shell
$ cd example
$ yarn install
```

ou

```shell
$ npm install
```

Realizar o build da imagem Docker executando a script (apenas na primeira utilização):

```shell
$ ./build.sh
```

Com a imagem gerada, iniciar a aplicação:
```shell
$ docker-compose up --force-recreate
```

## Testes

```shell
$ yarn test
```
