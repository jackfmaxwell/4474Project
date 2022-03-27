const { Console } = require('console');
var fs = require('fs');
const { forEach } = require('lodash');
const path = require("path");
const { workerData } = require("worker_threads");
const ipc = require('electron').ipcRenderer
const renameFunction = require("./fileRenameFunctions");


const browseButton = document.getElementById('browseButton')

const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", parseRuleList)

const renameBtn = document.getElementById("renameFiles");
renameBtn.onclick = () =>{
    for (const [key,value] of Object.entries(fileList)){
        console.log("Renaming " + key + " -> " + value);
        renameFiles(key, value);
        fileList[value] = fileList[key];
        delete fileList[key];
    }
    let skippedfirst = false;
    let fileRows = document.querySelectorAll('.col-image');
    fileRows.forEach(function(fileRow){
        if (!skippedfirst){
            skippedfirst=true;
            return;
        }
        if(!fileRow.firstChild.src.includes('Un')){
            console.log()
            fileRow.textContent =  fileRow.nextElementSibling.textContent;
        }
        
        
     });
}

const removeAllButton  = document.getElementById('removeAllButton')
const filelist = document.getElementById("filelist");   //might be bad naming
const undoButton = document.getElementById("undoButton");
var fileList = {};

var selected = 0;


document.getElementById("selectedCheckBoxes").textContent = "0 of " + Object.keys(fileList).length + " Selected";

//Sends open file explorer request to main process
browseButton.addEventListener('click', function (event) {
    return new Promise(resolve => {
        ipc.send('open-file-dialog');
        ipc.on('browse-reply', (event, result) => {
            if(document.getElementById(result[0]) == null){
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
        if(row.textContent.length != 1 && row.textContent.length != 136){
            row.remove();
            const div = document.createElement('div');
            div.className = 'div-table-row';
            div.innerHTML += '&nbsp;';
            document.getElementById('last-row').after(div);
        }
    fileList = {}
    selected = 0
    document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";

    }); 
})

//Sends open file explorer request to main process
undoButton.addEventListener('click', function (event) {
    for (const [key,value] of Object.entries(fileList)){
        fileList[key] = key
    }
    const filenames = document.querySelectorAll('.col-image');
    filenames.forEach(function(filename){
        filename.nextElementSibling.remove()
        const div = document.createElement('div');
        div.className = "div-table-col";
        div.textContent = key
        filename.after(div);
        filename.nextElementSibling.nextElementSibling.textContent = filename.id;
    })
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

    var filename = path.basename(filepath);

    div.innerHTML = `
    <div class="div-table-col col-image"><img style="width:14px; padding-left: 4px; padding-right: 8px;" src="SVG/File   List   Checkbox   Unchecked.svg" draggable="false">` + filename + `</div>
    <div class="div-table-col">` + filename + `</div>
    <div class="div-table-col">` + filepath + `</div>
    <div class="div-table-col">
    <img style="padding-right: 8px; width: 14px;" src="SVG/File   List   Remove   Default.svg"/>
    </div>
    `;

    div.firstElementChild.id = filepath;

    var lastRow = document.getElementById('last-row')
    lastRow.before(div);
    lastRow.nextElementSibling.remove()

    check_box = div.firstElementChild

    check_box.style.color = "grey"
    check_box.nextElementSibling.style.color = "grey"
    check_box.nextElementSibling.nextElementSibling.style.color = "grey"

    const check_boxes = document.querySelectorAll('.col-image');

    check_boxes.forEach(function(check_box){
        if(!fileList.hasOwnProperty(check_box.id)){
            check_box.addEventListener('click', function (event) {
                if (!check_box.firstChild.src.includes('Un')){
                    check_box.firstChild.src = "SVG/File   List   Checkbox   Unchecked.svg";
                    check_box.style.color = "grey"
                    check_box.nextElementSibling.style.color = "grey"
                    check_box.nextElementSibling.nextElementSibling.style.color = "grey"
                    selected -= 1;
                    document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
                } else {
                    check_box.firstChild.src = "SVG/File   List   Checkbox   Checked.svg";
                    check_box.style.color = "white"
                    check_box.nextElementSibling.style.color = "white"
                    check_box.nextElementSibling.nextElementSibling.style.color = "white"
                    selected += 1;
                    document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
                    
                }
            });
            check_box.parentElement.lastElementChild.addEventListener('click', function (event) {
                delete fileList[check_box.id]
                check_box.parentElement.remove();
                const div = document.createElement('div');
                div.className = 'div-table-row';
                div.innerHTML += '&nbsp;';
                document.getElementById('last-row').after(div);
            })
        }
    })
    fileList[filepath] = filepath
    document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
}

//adds event listener to check boxes in file list
function checkboxEventAdder(){
    const check_boxes = document.querySelectorAll('.col-image');

    check_boxes.forEach(function(check_box){
        check_box.addEventListener('click', function (event) {
            if (!check_box.firstChild.src.includes('Un')){
                check_box.firstChild.src = "SVG/File   List   Checkbox   Unchecked.svg";
                check_box.style.color = "grey"
                check_box.nextElementSibling.style.color = "grey"
                check_box.nextElementSibling.nextElementSibling.style.color = "grey"
                selected -= 1;
                document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
            } else {
                console.log(check_box.firstChild.src)
                check_box.firstChild.src = "SVG/File   List   Checkbox   Checked.svg";
                check_box.style.color = "white"
                check_box.nextElementSibling.style.color = "white"
                check_box.nextElementSibling.nextElementSibling.style.color = "white"
                selected += 1;
                document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
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

function parseRuleList(){
    let rulesList = document.getElementsByClassName("rule-value");
    for(let i = 0; i < rulesList.length; i++){
        // For each rule get all their values
        let ruleSelection = rulesList[i].getElementsByClassName("ruleSelection")[0].value;
        let firstPositionSelection = rulesList[i].getElementsByClassName("firstPositionSelection")[0].value; 

        let firstPositionFirstTextBox = rulesList[i].getElementsByClassName("firstPositionFirstTextBox")[0].value; 
        //let matchCaseLeft = rulesList[i].getElementsByClassName("leftmatchcase")[0].value;
        let firstPositionIdentifierSelection = rulesList[i].getElementsByClassName("firstPositionIdentifierSelection")[0].value;
        let firstPositionSecondTextBox = rulesList[i].getElementsByClassName("firstPositionSecondTextBox")[0].value;
        //let matchCaseLeft2 = rulesList[i].getElementsByClassName("leftmatchcase")[0].value;
        let lastPositionSelection  = rulesList[i].getElementsByClassName("lastPositionSelection ")[0].value; 
        let lastTextBox  = rulesList[i].getElementsByClassName("lasttextbox")[0].value; 
        //let matchCaseRight = rulesList[i].getElementsByClassName("rightmatchcase")[0].value;
        console.log("ruleselection: " + ruleSelection);
        console.log("first pos selection: " + firstPositionSelection);
        console.log("first pos first text box: " + firstPositionFirstTextBox);
        console.log("first pos identif sect: " + firstPositionIdentifierSelection);
        console.log("first pos secon text box: " + firstPositionSecondTextBox);
        console.log("last pos selection: " + lastPositionSelection);
        console.log("last text box: " + lastTextBox);

        for (const [key,value] of Object.entries(fileList)){
            if(ruleSelection=="add"){
                let filepath = key;
                let filename = path.basename(filepath);
                filepath = filepath.replace(filename, "");
                fileList[key] = filepath.concat(renameFunction.fileAdd(filename, lastTextBox, firstPositionFirstTextBox));
            }
            else if(ruleSelection=="remove"){
                let filepath = key;
                let filename = path.basename(filepath);
                filepath = filepath.replace(filename, "");
                fileList[key] = filepath.concat(renameFunction.fileAdd(filename, firstPositionFirstTextBox, lastTextBox));
            }
            else if(ruleSelection=="reverse"){
                
            }
            else if(ruleSelection=="randomize"){
                
            }
            else if(ruleSelection=="setcase"){
                
            }
            else if(ruleSelection=="replace"){
                
            }
            else if(ruleSelection=="regex"){
                
            }
            else if(ruleSelection=="setlength"){
                
            }
            else if(ruleSelection=="move"){
                
            }
            
        }
        let skippedfirst = false;
        let fileRows = document.querySelectorAll('.col-image');
        fileRows.forEach(function(fileRow){
            if (!skippedfirst){
                skippedfirst=true;
                return;
            }
            if(!fileRow.firstChild.src.includes('Un')){
                fileRow.nextElementSibling.textContent = path.basename(fileList[fileRow.nextElementSibling.nextElementSibling.textContent]);
                fileRow.nextElementSibling.nextElementSibling.textContent = fileList[fileRow.nextElementSibling.nextElementSibling.textContent];
            }
            
         });

    }
}
