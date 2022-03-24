const ipc = require('electron').ipcRenderer

const browseButton = document.getElementById('browseButton')

//Sends open file explorer request to main process
browseButton.addEventListener('click', function (event) {
    return new Promise(resolve => {
        ipc.send('open-file-dialog')
        ipc.on('reply', (event, result) => {
            resolve(result);
            console.log(result[0])
        })
    });
})
