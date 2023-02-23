let transport, stream = null
onmessage = (e) => {
  console.log('Message received from main script');
  try {
    switch(e.data.event) {
      case 'start':
        transport = initTransport(e.data.url, e.data.options)
        postMessage({event:'start', transport:transport})
      break;

      case 'setup-bidirectional':
      stream = setUpBidirectional()
      readData(stream.readable)
      break;

      case 'write-bidirectional':
      writeData(stream.writable, e.data.data)
      break;

      case 'data':

      break;

      case 'stop':
        closeTransport(e.transport)
      break;
    }
  } catch {

    postMessage({event: 'error'});
  }
}
async function initTransport(url, options: {}) {
  // Initialize transport connection
  const transport = new WebTransport(url, options);

  // The connection can be used once ready fulfills
  await transport.ready;

  return transport
}

async function readData(readable) {
  const reader = readable.getReader();
  while (true) {
    const {value, done} = await reader.read();
    if (done) {
      break;
    }
    // value is a Uint8Array.
    postMessage({event: 'data-read', data:value});
  }
}

async function writeData(writable, data) {
  const writer = writable.getWriter();
  writer.write(data)
  postMessage({event: 'data-written', data: data})
}

async function setUpBidirectional() {
  const stream = await transport.createBidirectionalStream();
  // stream is a WebTransportBidirectionalStream
  // stream.readable is a ReadableStream
  // stream.writable is a WritableStream
  return stream
}
async function closeTransport(transport) {
    // Respond to connection closing
  try {
    await transport.closed;
    console.log(`The HTTP/3 connection to ${url} closed gracefully.`);
  } catch(error) {
    console.error(`The HTTP/3 connection to ${url} closed due to ${error}.`);
  }
}
