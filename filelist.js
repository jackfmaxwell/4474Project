const path = require("path");
const { workerData } = require("worker_threads");
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


//adds checkbox event listener to starting files in list
checkboxEventAdder();

//adds files to HTML list and includes event listeners
function addRow(filepath){
    const div = document.createElement('div');
    div.className = 'div-table-row';
    div.id = filepath;

    var filename = path.basename(filepath);

    div.innerHTML = `
    <div class="div-table-col-image"><img style="width:14px; padding-left: 4px; padding-right: 8px;" src="SVG/File   List   Checkbox   Unchecked.svg">` + filename + `</div>
    <div class="div-table-col"></div>
    <div class="div-table-col">` + filepath + `</div>
    `;

    document.getElementById('divTable').appendChild(div);

    checkboxEventAdder();

}

function removeRow(id) {
    document.getElementById(id).removeChild(input.parentNode);
}

//adds event listener to check boxes in file list
function checkboxEventAdder(){
    const check_boxes = document.querySelectorAll('.div-table-col-image');
    console.log(check_boxes);

    check_boxes.forEach(function(check_box){
        check_box.addEventListener('click', function (event) {
            if (!check_box.firstChild.src.includes('Un')){
                console.log("should uncheck here")
                check_box.firstChild.src = "SVG/File   List   Checkbox   Unchecked.svg";
            } else {
                console.log(check_box.firstChild.src)
                check_box.firstChild.src = "SVG/File   List   Checkbox   Checked.svg";
            }
        });
    })
}