const {
    app,
    BrowserWindow
} = require('electron')

const electron = require('electron')

let win

function createWindow() {

    const _width = 1200, _height = 800
    win = new BrowserWindow({
        width: _width,
        height: _height,
        minWidth: 800,
        minHeight: 600,
        icon: './assets/img/icon.png'
    })

    try {
        const screenSize = electron.screen.getPrimaryDisplay().size;
        win.setPosition((screenSize.width - _width) / 2,
            (screenSize.height - _height) / 2)
    }
    catch (er) {
        win.center()
    }

    win.setMenu(null)

    if (process.env.NODE_ENV === 'production') {
        win.loadURL(`file://${__dirname}/build/index.html`)
    } else {
        win.webContents.openDevTools()
        win.loadURL('http://localhost:3000')
    }

    win.on("closed", () => {
        win = null;
    });

}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    app.quit()
})

app.on("activate", () => {

    if (win === null)
        createWindow()

})