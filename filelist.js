var fs = require('fs');
const path = require("path");
const { workerData } = require("worker_threads");
const ipc = require('electron').ipcRenderer

const browseButton = document.getElementById('browseButton')
const removeAllButton  = document.getElementById('removeAllButton')
const filelist = document.getElementById("filelist");   //might be bad naming
var fileList = [];

var selected = 0;


const rows = Array.from(document.getElementsByClassName('div-table-row'));

rows.forEach(row => {
     console.log(row.textContent.length)
     if(row.textContent.length != 1 && row.textContent.length != 136){
        fileList.push(row.lastChild.textContent);
     }
})

document.getElementById("selectedCheckBoxes").textContent = "0 of " + fileList.length + " Selected";

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

//Event listener for X on filelist. Removes all files from list
removeAllButton.addEventListener('click', function (event) {
    const rows = Array.from(document.getElementsByClassName('div-table-row'));

    rows.forEach(row => {
        console.log(row.textContent.length)
        if(row.textContent.length != 1 && row.textContent.length != 136){
            row.remove();
            const div = document.createElement('div');
            div.className = 'div-table-row';
            div.innerHTML += '&nbsp;';
            document.getElementById('last-row').after(div);
        }
    fileList = []
    document.getElementById("selectedCheckBoxes").textContent = selected + " of " + fileList.length + " Selected";

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
        if(document.getElementById(file.path) == null){
            fileList.push(file.path);    //add path to the list that keeps tracks of the files
            addRow(file.path);          //add element to UI
        }  
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


//adds checkbox event listener to starting files in list
checkboxEventAdder();

//adds files to HTML list and includes event listeners
function addRow(filepath){
    const div = document.createElement('div');
    div.className = 'div-table-row';
    div.id = filepath;

    var filename = path.basename(filepath);

    div.innerHTML = `
    <div class="div-table-col col-image"><img style="width:14px; padding-left: 4px; padding-right: 8px;" src="SVG/File   List   Checkbox   Unchecked.svg">` + filename + `</div>
    <div class="div-table-col">` + filename + `</div>
    <div class="div-table-col">` + filepath + `</div>
    `;

    var lastRow = document.getElementById('last-row')
    lastRow.before(div);
    lastRow.nextElementSibling.remove()
    
    checkboxEventAdder();
    document.getElementById("selectedCheckBoxes").textContent = selected + " of " + fileList.length + " Selected";

}

function removeRow(id) {
    document.getElementById(id).remove()
    //adds empty row if file table is sufficently empty
    if(document.getElementById("divTable").childElementCount < 23){
        const div = document.createElement('div');
        div.className = 'div-table-row';
        div.innerHTML += '&nbsp;';
        document.getElementById('last-row').before(div);
    }
}

//adds event listener to check boxes in file list
function checkboxEventAdder(){
    const check_boxes = document.querySelectorAll('.col-image');

    if(!check_boxes[0].firstChild.src.includes('Un') && !check_boxes[0].firstChild.src.includes('Partial')){
        check_boxes.forEach(function(check_box){
            check_box.firstChild.src = "SVG/File   List   Checkbox   Checked.svg";
        })
    }

    check_boxes.forEach(function(check_box){
        check_box.addEventListener('click', function (event) {
            if (!check_box.firstChild.src.includes('Un')){
                check_box.firstChild.src = "SVG/File   List   Checkbox   Unchecked.svg";
                selected -= 1;
                document.getElementById("selectedCheckBoxes").textContent = selected + " of " + fileList.length + " Selected";
            } else {
                console.log(check_box.firstChild.src)
                check_box.firstChild.src = "SVG/File   List   Checkbox   Checked.svg";
                selected += 1;
                document.getElementById("selectedCheckBoxes").textContent = selected + " of " + fileList.length + " Selected";
            }
        });
    })
}

//renames file on system (async)
function renameFiles(oldFilepath, newFilePath){
    fs.rename(oldFilepath, newFilePath, function(err){
        if (err) throw err;
    });
}
