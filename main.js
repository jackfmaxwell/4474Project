const { app, BrowserWindow } = require("electron");
const path = require("path");
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

//IPC used by renderer process to open system file explorer (for filelist)
ipc.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
      properties: ['openFile']
    }).then(result=>{
        console.log(result.filePaths)
        var filepath = result.filePaths
        event.sender.send('browse-reply', filepath);
    })
});

//IPC used by renderer process to open system file explorer (for rulefilter files)
ipc.on('open-rulefilter-txt', function (event) {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'text', extensions: ['txt'] }]
    }).then(result=>{
        console.log(result.filePaths)
        var filepath = result.filePaths
        event.sender.send('rulefilter-open-reply', filepath);
    })
});

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width : 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }

    });
    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
        
    }
});

