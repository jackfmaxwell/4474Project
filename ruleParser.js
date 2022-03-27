//const fileRenaming = require("./fileRenameFunctions"); ERRORING FILE
/*
const ruleSelectionOption = document.getElementById("ruleSelection");
const firstPositionSelection = document.getElementById("firstPositionSelection");
const firstPositionFirstTextBox = document.getElementById("firstPositionFirstTextBox");
const firstPositionIdentifierSelection = document.getElementById("firstPositionIdentifierSelection");
const firstPositionSecondTextBox = document.getElementById("firstPositionSecondTextBox");
const lastPositionSelection = document.getElementById("lastPositionSelection");
const leftMatchCaseBoxes = document.getElementsByClassName("leftmatchcase");
const rightMatchCaseBoxes = document.getElementsByClassName("rightmatchcase");
const lastTextBox = document.getElementById("lasttextbox");

function ruleSelectionEvent(){
    let ruleSelectionValue = ruleSelectionOption.value;

    let items = [];


    if(ruleSelectionValue === "remove" || ruleSelectionValue === "reverse" || ruleSelectionValue === "randomize"){
        items = ["From Position", "From End", "From Before First", "From Before Last", "From After First", "From After Last", "From Before Each"];
    }else if(ruleSelectionValue === "add"){
        items = ['Text', "Date", "Folder Name", "Number"];
    }else if(ruleSelectionValue === "setcase"){
        items = ["UPPER", "lower", "Title", "iNVERTED"];
    }else if(ruleSelectionValue === "replace"){
        items = ["First", "Last", "Each"];
    }else if(ruleSelectionValue === "regex"){
        items = null;
    }else if(ruleSelectionValue === "setlength"){
        items = ['To', "Minimum To", "Maximum To"];
    }else if(ruleSelectionValue === "move"){
        items = ["First", "Last", "Each", "Text Before", "Text After", "Text In Range", "From Position To End"];
    }
    if(items == null){
        firstPositionSelection.style.display = "none";
    }else{
        let str = ""
    for (let item of items){
        str += "<option value=\"" + item + "\">" + item + "</option>"
    }
    firstPositionSelection.innerHTML = str;
    firstPositionSelection.style.display = "unset";
    }
    firstPosSelectionEvent();
}

function firstPosSelectionEvent(){
    let firstPositionSelectionValue = firstPositionSelection.value;
    let items = [];
    let textBoxIsOn = true;
    let firstPositionIdentifierSelectionOn = false;
    let firstPositionSecondTextBoxOn = false;
    let lastPositionSelectionOn = true;
    let matchCase = false;
    switch(firstPositionSelectionValue)
    {
        case "Text":
            textBoxIsOn = true;
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "Date":
            textBoxIsOn = false;
            items = ["Accessed", "Created", "Modified", "Taken", "Current"];
            firstPositionIdentifierSelectionOn = true;
            firstPositionSecondTextBoxOn = true;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "Folder Name":
            textBoxIsOn = true;
            items = ["Folder Name"];
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "Number":
            textBoxIsOn = true;
            items = ["Incrementing By", "Decrementing By"]
            firstPositionIdentifierSelectionOn = true;
            firstPositionSecondTextBoxOn = true;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "UPPER":
        case "lower":
        case "Title":
        case "iNVERTED":
            textBoxIsOn = false;
            items = ["From Position", "From End", "From Before First", "From Before Last", "From After First", "From After Last", "From Before Each", "From After Each"];
            firstPositionIdentifierSelectionOn = true;
            firstPositionSecondTextBoxOn = true;
            lastPositionSelectionOn = true;
            matchCase = true;
            break;
        case "From Position":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "From End":
            textBoxIsOn = false
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "From Before First":
        case "From Before Last":
        case "From After First":
        case "From After Last":
        case "From Before Each":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = true;
            matchCase = true;;
            break;
        case "First":
        case "Last":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = true;
            lastPositionSelectionOn = false;
            matchCase = true;
            break;
        case "Each":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = false;
            matchCase = true;
        case "":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = false;
            matchCase = false;
            break;
        case "To":
        case "Minimum To":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "Maximum To":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = false;
            matchCase = false;
            break;
        case "First":
        case "Last":
        case "Each":
        case "Text Before":
        case "Text After":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            matchCase = true;
            break;
        case "Text In Range":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = true;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        case "From End To Position":
            textBoxIsOn = true
            firstPositionIdentifierSelectionOn = false;
            firstPositionSecondTextBoxOn = false;
            lastPositionSelectionOn = true;
            matchCase = false;
            break;
        default:
            alert("Hit default case");
    }
    
    if(matchCase){
        for (let i = 0; i < leftMatchCaseBoxes.length; i++){
            leftMatchCaseBoxes[i].style.display = "unset";
            leftMatchCaseBoxes[i].parentElement.style.display = "unset";

        }
    }else{
        for (let i = 0; i < leftMatchCaseBoxes.length; i++){
            leftMatchCaseBoxes[i].style.display = "none";
            leftMatchCaseBoxes[i].parentElement.style.display = "none";

        }
    }

    if(textBoxIsOn){
        firstPositionFirstTextBox.style.display = "unset";
        firstPositionFirstTextBox.parentElement.style.display = "unset";

    }else{
        firstPositionFirstTextBox.style.display = "none";
        firstPositionFirstTextBox.parentElement.style.display = "none";
    }

    if(firstPositionIdentifierSelectionOn){
        firstPositionIdentifierSelection.style.display = "unset";
    }else{
        firstPositionIdentifierSelection.style.display = "none";
    }

    if(firstPositionSecondTextBoxOn){
        firstPositionSecondTextBox.parentElement.style.display = "unset";
    }else{
        firstPositionSecondTextBox.parentElement.style.display = "none";
    }

    if(lastPositionSelectionOn){
        let values = [];
        if(firstPositionSelectionValue === "To" || firstPositionSelectionValue === "Minimum To"){
            values = ["Padding Left With", "Padding Right With"];
        }else{
            values = ["To Position", "To End", "To Position From End", "To Before First", "To Before Last", "To After First", "To After Last"]
        }
        let str = "";
        for (let item of values){
            str += "<option value=\"" + item + "\">" + item + "</option>"
        }
        lastPositionSelection.innerHTML = str;
        lastPositionSelection.style.display = "unset";
    }else{
        lastPositionSelection.style.display = "none";
    }

    let str = "";
    for (let item of items){
        str += "<option value=\"" + item + "\">" + item + "</option>"
    }
    firstPositionIdentifierSelection.innerHTML = str;
    lastPosEvent();
}

function lastPosEvent(){
    let lastPositionSelectionValue = lastPositionSelection.value;
    let textBoxOn = true;
    let matchCase = true;

    switch(lastPositionSelectionValue)
    {
        case "To Position":
            textBoxOn = true;
            matchCase = false;
            break;
        case "To End":
            textBoxOn = false;
            matchCase = false;
            break;
        case "To Position From End":
            textBoxOn = true;
            matchCase = false;
            break;
        case "To Before First":
        case "To Before Last":
        case "To After First": 
        case "To After Last":
            textBoxOn = true;
            matchCase = true;
            break;
        case "Padding Left With":
        case "Padding Right With":
            textBoxOn = true;
            matchCase = true;
            break;
        default:
            alert("default case");
    }
    if(ruleSelectionOption.value){
        // If set length rule
        if(firstPositionSelection.value === "Maximum To"){

        }else{

        }
    }
    if(matchCase){
        for (let i = 0; i < rightMatchCaseBoxes.length; i++){
            rightMatchCaseBoxes[i].style.display = "unset";
            rightMatchCaseBoxes[i].parentElement.style.display = "unset";

        }
    }else{
        for (let i = 0; i < rightMatchCaseBoxes.length; i++){
            rightMatchCaseBoxes[i].style.display = "none";
            rightMatchCaseBoxes[i].parentElement.style.display = "none";
        }
    }

    if(textBoxOn){
        lastTextBox.style.display = "unset";
        lastTextBox.parentElement.style.display = "unset";
    }else{
        lastTextBox.style.display = "none";
        lastTextBox.parentElement.style.display = "none";
    }

}

ruleSelectionOption.addEventListener('change', ruleSelectionEvent);
firstPositionSelection.addEventListener('change', firstPosSelectionEvent);
lastPositionSelection.addEventListener('change', lastPosEvent);

module.exports = ruleSelectionEvent;
module.exports = firstPosSelectionEvent;
module.exports = lastPosEvent;
DONT NEED THIS FILE SINCE NO LONGER HAVE STATIC RULES IN HMTL*/