export default class ShakePortClient {
  transport = null
  constructor(url, options = {}) {
    this.worker = new Worker('worker.js')
    this.worker.postMessage('start')
    this.worker.onmessage = (event) => {
      switch(event.data.event) {
        case 'start':
          this.transport = event.data.transport
        break;
      }
    };
  }
}
