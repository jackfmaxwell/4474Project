const { Console } = require('console');
var fs = require('fs');
const { end } = require('global-tunnel-ng');
const { forEach, add } = require('lodash');
const path = require("path");
const { start } = require('repl');
const { workerData } = require("worker_threads");
const ipc = require('electron').ipcRenderer


const renameFunction = require("./fileRenameFunctions");
const browseButton = document.getElementById('browseButton')
const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", parseRuleList)
const renameBtn = document.getElementById("renameFiles");
const removeAllButton  = document.getElementById('removeAllButton')
const filelist = document.getElementById("filelist");   //might be bad naming
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
var fileList = {};
var modified_filenames = {};
var selected = 0;


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
            fileRow.firstChild.nextElementSibling.textContent = fileRow.nextElementSibling.textContent;
        }
        
     });
}



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


function removeAll(){
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
}

//Sends open file explorer request to main process
undoButton.addEventListener('click', function (event) {
    modified_filenames = {};
    for (const [key,value] of Object.entries(fileList)){
        modified_filenames[key] = value;
    }
    console.log(modified_filenames);
    undoChanges();
    console.log(modified_filenames);
    undoButton.src = "SVG/Button   Undo   Disabled.svg"
    redoButton.src = "SVG/Button   Redo   Default.svg"
})

redoButton.addEventListener('click', function (event) {
    removeAll();
    console.log(modified_filenames);
    for (const [key,value] of Object.entries(modified_filenames)){
        addRow(modified_filenames[key])
    }
    undoButton.src = "SVG/Button   Undo   Disabled.svg"
    redoButton.src = "SVG/Button   Redo   Disabled.svg"
})


function undoChanges(){
    for (const [key,value] of Object.entries(fileList)){
        fileList[key] = key
    }
    let skippedfirst = false;
    const filenames = document.querySelectorAll('.col-image');
    filenames.forEach(function(filename){
        if(!skippedfirst){
            skippedfirst=true;
            return;
        }
        filename.nextElementSibling.textContent = path.basename(filename.id)
        filename.nextElementSibling.nextElementSibling.textContent = filename.id;
    })
}



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
    <div class="div-table-col col-image"><img style="width:14px; padding-left: 4px; padding-right: 8px;" src="SVG/File   List   Checkbox   Unchecked.svg" draggable="false"><div style="display:inline;">` + filename + `</div></div>
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
                if(!check_box.firstChild.src.includes('Un')){
                    selected -= 1;
                }
                check_box.parentElement.remove();
                const div = document.createElement('div');
                div.className = 'div-table-row';
                div.innerHTML += '&nbsp;';
                document.getElementById('last-row').after(div);
                document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
            })
        }
    });
    fileList[filepath] = filepath
    document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
}

//adds event listener to check boxes in file list
function checkboxEventAdder(){
    const check_boxes = document.querySelectorAll('.col-image');

    let skippedfirst = false;
    check_boxes.forEach(function(check_box){
        check_box.addEventListener('click', function (event) {
            if (!check_box.firstChild.src.includes('Un')){
                check_box.firstChild.src = "SVG/File   List   Checkbox   Unchecked.svg";
                check_box.style.color = "grey"
                check_box.nextElementSibling.style.color = "grey"
                check_box.nextElementSibling.nextElementSibling.style.color = "grey"
                document.getElementById("selectedCheckBoxes").textContent = selected + " of " + Object.keys(fileList).length + " Selected";
            } else {
                console.log(check_box.firstChild.src)
                check_box.firstChild.src = "SVG/File   List   Checkbox   Checked.svg";
                check_box.style.color = "white"
                check_box.nextElementSibling.style.color = "white"
                check_box.nextElementSibling.nextElementSibling.style.color = "white"
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
    undoChanges();
    undoButton.src = "SVG/Button   Undo   Default.svg";
    redoButton.src = "SVG/Button   Undo   Disabled.svg";
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
                if(lastPositionSelection=="To Position"){
                    let filepath = value;
                    let filename = path.basename(filepath);
                    filepath = filepath.replace(filename, "");
                    fileList[key] = filepath.concat(renameFunction.fileAdd(filename, lastTextBox, firstPositionFirstTextBox));
                }
                else if(lastPositionSelection=="To End"){
                    let filepath = value;
                    let filename = path.basename(filepath);
                    filepath = filepath.replace(filename, "");
                    fileList[key] = filepath.concat(renameFunction.fileAdd(filename, path.parse(filename).name.length, firstPositionFirstTextBox));
                    console.log(filename.length)
                }
                else if(lastPositionSelection=="To Position From End"){
                    let filepath = value;
                    let filename = path.basename(filepath);
                    filepath = filepath.replace(filename, "");
                    fileList[key] = filepath.concat(renameFunction.fileAdd(filename, path.parse(filename).name.length-lastTextBox, firstPositionFirstTextBox));
                }
                else if(lastPositionSelection=="To Before First"){
                    let filepath = value;
                    let filename = path.basename(filepath);
                    filepath = filepath.replace(filename, "");
                    fileList[key] = filepath.concat(renameFunction.fileAdd(filename, path.parse(filename).name.indexOf(lastTextBox), firstPositionFirstTextBox));
                }
                else if(lastPositionSelection=="To Before Last"){
                    let filepath = value;
                    let filename = path.basename(filepath);
                    filepath = filepath.replace(filename, "");
                    fileList[key] = filepath.concat(renameFunction.fileAdd(filename, path.parse(filename).name.lastIndexOf(lastTextBox), firstPositionFirstTextBox));
                }
                else if(lastPositionSelection=="To After First"){
                    let filepath = value;
                    let filename = path.basename(filepath);
                    filepath = filepath.replace(filename, "");
                    fileList[key] = filepath.concat(renameFunction.fileAdd(filename, path.parse(filename).name.indexOf(lastTextBox)+lastTextBox.length, firstPositionFirstTextBox));
                }
                else if(lastPositionSelection=="To After Last"){
                    let filepath = value;
                    let filename = path.basename(filepath);
                    filepath = filepath.replace(filename, "");
                    fileList[key] = filepath.concat(renameFunction.fileAdd(filename, path.parse(filename).name.lastIndexOf(lastTextBox)+lastTextBox.length, firstPositionFirstTextBox));
                }
            }
            else if(ruleSelection=="remove"){
                let filepath = value;
                let filename = path.basename(filepath);
                filepath = filepath.replace(filename, "");
                let filelength = path.parse(filename).name.length

                let startIndex = 0;


                if(firstPositionSelection=="From Position"){
                    startIndex = firstPositionFirstTextBox;
                }
                if(firstPositionSelection=="From End"){
                    startIndex = filelength;
                }
                if(firstPositionSelection=="From Before First"){
                    startIndex =  filename.indexOf(firstPositionFirstTextBox);
                }
                if(firstPositionSelection=="From Before Last"){
                    startIndex =  filename.lastIndexOf(firstPositionFirstTextBox);
                }
                else if(firstPositionSelection=="From After First"){
                    startIndex = filename.indexOf(firstPositionFirstTextBox) + firstPositionFirstTextBox.length;
                }
                else if(firstPositionSelection=="From After Last"){
                    startIndex = filename.lastIndexOf(firstPositionFirstTextBox) + firstPositionFirstTextBox.length;
                }
               


                let endIndex = 0;
                if (lastPositionSelection=="To Position"){
                    endIndex = lastTextBox;
                }
                else if(lastPositionSelection=="To End"){
                     endIndex = filelength;
                }
                else if(lastPositionSelection=="To Position From End"){
                    endIndex = lastTextBox;
                }
                else if(lastPositionSelection=="To Before First"){
                    endIndex = filename.indexOf(lastTextBox);
                }
                else if(lastPositionSelection=="To Before Last"){
                    endIndex = filename.lastIndexOf(lastTextBox);
                }
                else if(lastPositionSelection=="To After First"){
                    endIndex = filename.indexOf(lastTextBox) + filelength;
                }
                else if(lastPositionSelection=="To After Last"){
                    endIndex = filename.lastIndexOf(lastTextBox) + filelength;
                }
                
                console.log(startIndex);
                console.log(endIndex)

                if(startIndex > endIndex){
                    let temp = endIndex;
                    endIndex = startIndex;
                    startIndex = temp;
                }
                fileList[key] = filepath.concat(renameFunction.fileRemove(filename, startIndex, endIndex));

            }
            else if(ruleSelection=="reverse"){
                let filepath = value;
                let filename = path.basename(filepath);
                filepath = filepath.replace(filename, "");
                let filelength = path.parse(filename).name.length

                let startIndex = 0;


                if(firstPositionSelection=="From Position"){
                    startIndex = firstPositionFirstTextBox;
                }
                if(firstPositionSelection=="From End"){
                    startIndex = filelength;
                }
                if(firstPositionSelection=="From Before First"){
                    startIndex =  filename.indexOf(firstPositionFirstTextBox);
                }
                if(firstPositionSelection=="From Before Last"){
                    startIndex =  filename.lastIndexOf(firstPositionFirstTextBox);
                }
                else if(firstPositionSelection=="From After First"){
                    startIndex = filename.indexOf(firstPositionFirstTextBox) + firstPositionFirstTextBox.length;
                }
                else if(firstPositionSelection=="From After Last"){
                    startIndex = filename.lastIndexOf(firstPositionFirstTextBox) + firstPositionFirstTextBox.length;
                }
               


                let endIndex = 0;
                if (lastPositionSelection=="To Position"){
                    endIndex = lastTextBox;
                }
                else if(lastPositionSelection=="To End"){
                     endIndex = filelength;
                }
                else if(lastPositionSelection=="To Position From End"){
                    endIndex = lastTextBox;
                }
                else if(lastPositionSelection=="To Before First"){
                    endIndex = filename.indexOf(lastTextBox);
                }
                else if(lastPositionSelection=="To Before Last"){
                    endIndex = filename.lastIndexOf(lastTextBox);
                }
                else if(lastPositionSelection=="To After First"){
                    endIndex = filename.indexOf(lastTextBox) + filelength;
                }
                else if(lastPositionSelection=="To After Last"){
                    endIndex = filename.lastIndexOf(lastTextBox) + filelength;
                }
                    

                if(startIndex > endIndex){
                    let temp = endIndex;
                    endIndex = startIndex;
                    startIndex = temp;
                }
                fileList[key] = filepath.concat(renameFunction.fileReverse(filename, startIndex, endIndex));
            }
           
            else if(ruleSelection=="randomize"){
                let filepath = value;
                let filename = path.basename(filepath);
                filepath = filepath.replace(filename, "");
                let filelength = path.parse(filename).name.length

                let startIndex = 0;


                if(firstPositionSelection=="From Position"){
                    startIndex = firstPositionFirstTextBox;
                }
                if(firstPositionSelection=="From End"){
                    startIndex = filelength;
                }
                if(firstPositionSelection=="From Before First"){
                    startIndex =  filename.indexOf(firstPositionFirstTextBox);
                }
                if(firstPositionSelection=="From Before Last"){
                    startIndex =  filename.lastIndexOf(firstPositionFirstTextBox);
                }
                else if(firstPositionSelection=="From After First"){
                    startIndex = filename.indexOf(firstPositionFirstTextBox) + firstPositionFirstTextBox.length;
                }
                else if(firstPositionSelection=="From After Last"){
                    startIndex = filename.lastIndexOf(firstPositionFirstTextBox) + firstPositionFirstTextBox.length;
                }
               


                let endIndex = 0;
                if (lastPositionSelection=="To Position"){
                    endIndex = lastTextBox;
                }
                else if(lastPositionSelection=="To End"){
                     endIndex = filelength;
                }
                else if(lastPositionSelection=="To Position From End"){
                    endIndex = lastTextBox;
                }
                else if(lastPositionSelection=="To Before First"){
                    endIndex = filename.indexOf(lastTextBox);
                }
                else if(lastPositionSelection=="To Before Last"){
                    endIndex = filename.lastIndexOf(lastTextBox);
                }
                else if(lastPositionSelection=="To After First"){
                    endIndex = filename.indexOf(lastTextBox) + filelength;
                }
                else if(lastPositionSelection=="To After Last"){
                    endIndex = filename.lastIndexOf(lastTextBox) + filelength;
                }
                    

                if(startIndex > endIndex){
                    let temp = endIndex;
                    endIndex = startIndex;
                    startIndex = temp;
                }
                fileList[key] = filepath.concat(renameFunction.fileRandomize(filename, startIndex, endIndex));
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
                let filename = fileRow.textContent;
                let filepath = fileRow.nextElementSibling.nextElementSibling.textContent;
                let newfilename = path.basename(fileRow.nextElementSibling.nextElementSibling.textContent);
                
                //need to strip newfilename off the file path and append the origianl filename, (thats our key)
                filepath = filepath.replace(newfilename, "");
                filepath = filepath.concat(filename);
                
                fileRow.nextElementSibling.textContent = path.basename(fileList[filepath]);
                fileRow.nextElementSibling.nextElementSibling.textContent = fileList[filepath];
            }
            
         });

    }
}
