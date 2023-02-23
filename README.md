## ShakePort Client

A WebTransport client package for easily adding WebTransport capabilities to your web application. It utilizes WebWorkers and message posting for optimized and extensible functionality.

## Install
``npm install @mastashake08/shakeport-client``

## Import In Your Project
``const spc = new ShakePortClient()
spc.startClient({
  url:'<webtransport_server_url>'
})``
