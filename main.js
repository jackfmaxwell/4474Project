const { app, BrowserWindow } = require("electron");
const path = require("path");
var fs = require("fs");
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
      filters: [{ name: 'text', extensions: ['csv'] }]
    }).then(result=>{
        console.log(result.filePaths)
        var filepath = result.filePaths[0];
        console.log("SENDING FILE");
        console.log(filepath);
        event.sender.send('rulefilter-open-reply', filepath);
    })
});

ipc.on('save-rulefilter-csv', function (event, arg){
    console.log("Inside call");
    dialog.showSaveDialog({
        title: 'Select the File Path to save',
        defaultPath: path.join(__dirname, '../assets/sample.csv'),
        // defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Save',
        // Restricting the user to only Text Files.
        filters: [
            {
                name: 'Text Files',
                extensions: ['csv']
            }, ],
        properties: []
    }).then(file => {
        // Stating whether dialog operation was cancelled or not.
        console.log(file.canceled);
        if (!file.canceled) {
            console.log(file.filePath.toString());
              
            // Creating and Writing to the sample.txt file
            fs.writeFile(file.filePath.toString(), 
                         arg, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }).catch(err => {
        event.sender.send('save-rulefilter-csv-reply', 'failed');
        console.log(err)
    });
    event.sender.send('save-rulefilter-csv-reply', 'saved');
});

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width : 1856,
        height: 1024,
        minWidth : 1856,
        minHeight: 1024,
        resizable: false,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    mainWindow.removeMenu();
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