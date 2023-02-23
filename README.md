## ShakePort Client

A WebTransport client package for easily adding WebTransport capabilities to your web application. It utilizes WebWorkers and message posting for optimized and extensible functionality.

## Install
``npm install @mastashake08/shakeport-client``

## Import In Your Project
```
const spc = new ShakePortClient();
spc.startClient({
  url:'<webtransport_server_url>'
})
```

## Responding To Messages
```
window.addEventListener("message", (event) => {
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  if (event.origin !== "http://example.com")
    return;

  // event.source is popup
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"
}, false);
```
