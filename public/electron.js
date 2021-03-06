const { app, BrowserWindow, screen: electronScreen } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const createMainWindow = () => {
    let mainWindow = new BrowserWindow({
        width: electronScreen.getPrimaryDisplay().workArea.width,
        height: electronScreen.getPrimaryDisplay().workArea.height,
        show: false,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    })
    const startURL = 'http://localhost:3001'

    if (!isDev) {
        mainWindow.setMenu(null)
    }

    mainWindow.loadURL(isDev ? startURL : `file://${path.join(__dirname, '../build/index.html')}`)

    mainWindow.once('ready-to-show', () => mainWindow.show())

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows().length) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
