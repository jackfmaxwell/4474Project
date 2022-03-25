const path = require("path");
const ipc = require('electron').ipcRenderer

const browseButton = document.getElementById('browseButton')

const fileList = [];

//Sends open file explorer request to main process
browseButton.addEventListener('click', function (event) {
    return new Promise(resolve => {
        ipc.send('open-file-dialog');
        ipc.on('browse-reply', (event, result) => {
            if(document.getElementById(result[0]) == null){
                fileList.push(result[0]);
                addRow(result[0]);
            }
            resolve(result);
        })
    });
})

//Sends open file explorer request to main process
openButton.addEventListener('click', function (event) {
    return new Promise(resolve => {
        ipc.send('open-rulefilter-txt');
        ipc.on('rulefilter-open-reply', (event, result) => {
            //add functionality here
            resolve(result);
        })
    });
})

function addRow(filepath){
    const div = document.createElement('div');
    div.className = 'div-table-row';
    div.id = filepath;

    
    var filename = path.basename(filepath);


    div.innerHTML = `
    <div class="div-table-col"><img style="width:14px; padding-left: 4px; padding-right: 8px;" src="SVG/File   List   Checkbox   Unchecked.svg">` + filename + `</div>
    <div class="div-table-col"></div>
    <div class="div-table-col">` + filepath + `</div>
    `;

    document.getElementById('divTable').appendChild(div);


}

function removeRow(id) {
    document.getElementById(id).removeChild(input.parentNode);
}


