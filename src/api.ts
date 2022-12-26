import app, { protocol } from "electron";
const runChaosServer = require('./express')

class API {
  constructor(electronApp: app.App) {
    console.log("Chaos API is about to register routes, websockets and listen");
    runChaosServer()
    this.initializeInterception();
  }

  initializeInterception() {
    const content = Buffer.from("you've been conned!");

    protocol.interceptBufferProtocol("http", (request, result) => {
      return result(content);
      // if (request.url === "http://www.google.com")
      // fetch other http protocol content and return to the electron
    });
  }
}

export default API;
