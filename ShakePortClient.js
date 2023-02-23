export default class ShakePortClient {
  transport = null
  constructor() {
    this.worker = new Worker('worker.js')
  }

  startClient(data = {url, options = {}}) {
    this.worker.postMessage({event:'start', ...data})
    this.worker.onmessage = (event) => {
      switch(event.data.event) {
        case 'start':
          console.log('Started')
        break;
      }
    }
  }

  stopClient () {
    this.worker.postMessage({event:'stop'})
  }


  setUpBidirectional () {
    this.worker.postMessage({event:'setup-bidirectional'})
  }

  setUpUnidirectional () {
    this.worker.postMessage({event:'setup-unidirectional'})
  }

  writeBidirectional (data) {
    this.worker.postMessage({event:'write-bidirectional', data: data})
  }

  writeData (data) {
    this.worker.postMessage({event:'write-data', data: data})
  }
  
  writeUndirectional (data) {
    this.worker.postMessage({event:'write-unidirectional', data: data})
  }




}
