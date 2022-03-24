const path = require("path");
const ipc = require('electron').ipcRenderer

const browseButton = document.getElementById('browseButton')

const fileList = [];

//Sends open file explorer request to main process
browseButton.addEventListener('click', function (event) {
    return new Promise(resolve => {
        ipc.send('open-file-dialog')
        ipc.on('reply', (event, result) => {
            resolve(result);
            fileList.push(result[0]);
            addRow(result[0]);
        })
    });
})

function addRow(filepath){
    const div = document.createElement('div');
    div.className = 'div-table-row'

    
    var filename = path.basename(filepath)


    div.innerHTML = `
    <div class="div-table-col"><img style="width:14px; padding-left: 4px; padding-right: 8px;" src="SVG/File   List   Checkbox   Unchecked.svg">` + filename + `</div>
    <div class="div-table-col"></div>
    <div class="div-table-col">` + filepath + `</div>
    `;

    document.getElementById('divTable').appendChild(div);


}

function removeRow(input) {
    document.getElementById('content').removeChild(input.parentNode);
}


