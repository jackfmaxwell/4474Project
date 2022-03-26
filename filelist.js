const path = require("path");
const ipc = require('electron').ipcRenderer

const browseButton = document.getElementById('browseButton')
const filelist = document.getElementById("filelist");   //might be bad naming

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

// Drag and Drop file features --------------------------------------
filelist.addEventListener('dragover', (event) => {
    //The box that receives the file(s) should highlight when hovering over (idk how to do this)
    event.preventDefault();
    event.stopPropagation();
})

filelist.addEventListener('drop', (event) => {
    //After droping, an entry for the file(s) should appear on the UI (idk how to do this)
    event.preventDefault();
    event.stopPropagation();

    console.log("File(s) have been dropped");

    // print to console
    for (const file of event.dataTransfer.files) {
        console.log('file path: ', file.path);
        fileList.push(file.path);    //add path to the list that keeps tracks of the files
        addRow(file.path);           //add element to UI
    }

});

filelist.addEventListener('dragenter', (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("File entered the drop zone");
});

filelist.addEventListener('dragleave', (event) => {
    //The box that receives the file(s) should unhighlight when drag cursor leaves (idk how to do this)
    event.preventDefault();
    event.stopPropagation();
    console.log("File has left the drop zone");
});

filelist.addEventListener('dragend', (event) => {
    //The box that receives the file(s) should unhighlight when drag operation ends(idk how to do this)
    event.preventDefault();
    event.stopPropagation();
    console.log("Drag operation has ended");
});
// -------------------------------------------------------------

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