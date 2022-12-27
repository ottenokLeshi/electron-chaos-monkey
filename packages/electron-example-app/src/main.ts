const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '/preload.js')
    }
  })

  ipcMain.on('set-title', (event: any, title: string) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  mainWindow.loadFile(path.join(__dirname, '/page/index.html'))
}

app.commandLine.appendSwitch('allow-insecure-localhost', 'true')

app.whenReady().then(() => {
  createWindow()
  console.log('Application started')
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})