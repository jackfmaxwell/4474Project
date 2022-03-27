const rulesTable = document.getElementById("rulesTable");

const addRuleBtn = document.getElementById("addRuleBtn");
addRuleBtn.onclick = () => switchToDropdown();
function switchToDropdown(){
    rulesBtnDropdown.style.display = "inherit";
    addRuleBtn.style.display = "none";
}
const rulesBtnDropdown = document.getElementById("rulesBtnDropdown");
function selectRuleToAdd(){
    rulesBtnDropdown.style.display = "none";
    addRuleBtn.style.display = "inherit";
    addRule(rulesBtnDropdown.value)
}

const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", parseRuleList)

const addRuleContainer = document.getElementById("addRuleContainer");

function addRule(rule){
    const div = document.createElement('div');
    div.className = 'rule-value rf-div-table-row';

    div.innerHTML = ` 
    <select class="ruleSelection rules rf-div-table-col"  style="max-width: 120px; padding: top 2px; padding-left:4px;">
        <option value="add">Add</option>
        <option value="remove">Remove</option>
        <option value="reverse">Reverse</option>
        <option value="randomize">Randomize</option>
        <option value="setcase">Set Case</option>
        <option value="replace">Replace</option>
        <option value="regex">Regex</option>
        <option value="setlength">Set Length</option>
        <option value="move">Move</option>
    </select>
    <select class="firstPositionSelection rules rf-div-table-col" style="max-width: 120px;">
        <option value="Text">Text</option>
        <option value="Date">Date</option>
        <option value="Folder Name">Folder Name</option>
        <option value="Number">Number</option>
    </select>

    <div class="rf-div-table-col" style="max-width:210; min-width:180px; display: inline;">
        <input class="firstPositionFirstTextBox" style="max-width:140px; display: none;" type="text"></input>
        <img class="leftmatchcase" style="width:75px; padding-right:4px; display: none;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>
    <select class="firstPositionIdentifierSelection rules rf-div-table-col" style="max-width: 120px; display: none;">
        <option value="fromPosition">from position</option>
        <option value="fromEnd">from end</option>
        <option value="fromBeforeFirst">from before first</option>
        <option value="fromBeforeLast">from before last</option>
        <option value="fromAfterFirst">from after first</option>
        <option value="fromAfterLast">from after last</option>
        <option value="fromBeforeEach">from before each</option>
    </select>
    <div class="rf-div-table-col" style="max-width:210; min-width:180px; display: inline;">
        <input class="firstPositionSecondTextBox" style="max-width:140px; display: none;" type="text"></input>
        <img class="leftmatchcase" style="width:75px; padding-right:4px; display: none;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>
    <select class="lastPositionSelection rules rf-div-table-col">
        <option value="To Position">To Position</option>
        <option value="To End">To End</option>
        <option value="To Position From End">To Position From End</option>
        <option value="To Before First">To Before First</option>
        <option value="To Before Last">To Before Last</option>
        <option value="To After First">To After First</option>
        <option value="To After Last">To After Last</option>
    </select>

    <div class="debug rf-div-table-col" style="max-width:210; min-width:180px; display: inline;">
        <input style="lasttextbox max-width:120px;" type="text"></input>
        <img class="rightmatchcase" style="width:75px; padding-right:4px;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>
</div>
    `;
    let childrenList = div.childNodes;
    console.log(childrenList);
    childrenList[1].addEventListener("change", (event) => {
        let nodeList = event.currentTarget.parentElement.childNodes;
        let ruleSelectionValue = childrenList[1].value;
        let firstPositionSelection = childrenList[3];
        let items;
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
        firstPositionSelection.style.display = "block";
        }
    });
    childrenList[3].addEventListener("change", (event) => {
        let nodeList = event.currentTarget.parentElement.childNodes;
        let firstPositionSelectionValue = nodeList[3].value;
        let firstPositionFirstTextBox = event.currentTarget.parentElement.getElementsByClassName("firstPositionFirstTextBox");
        let firstPositionIdentifierSelection = event.currentTarget.parentElement.getElementsByClassName("firstPositionIdentifierSelection");
        let firstPositionSecondTextBox = event.currentTarget.parentElement.getElementsByClassName("firstPositionSecondTextBox");
        let lastPositionSelection = event.currentTarget.parentElement.getElementsByClassName("lastPositionSelection");
        let leftMatchCaseBoxes = event.currentTarget.parentElement.getElementsByClassName("leftmatchcase");
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
                leftMatchCaseBoxes[i].style.display = "block";
                leftMatchCaseBoxes[i].parentElement.style.display = "block";
            }
        }else{
            for (let i = 0; i < leftMatchCaseBoxes.length; i++){
                leftMatchCaseBoxes[i].style.display = "none";
                leftMatchCaseBoxes[i].parentElement.style.display = "none";
            }
        }
    
        if(textBoxIsOn){
            console.log(firstPositionFirstTextBox);
            firstPositionFirstTextBox[0].style.display = "block";
            firstPositionFirstTextBox[0].parentElement.style.display = "block";
        }else{
            firstPositionFirstTextBox[0].style.display = "none";
            firstPositionFirstTextBox[0].parentElement.style.display = "none";
        }
    
        if(firstPositionIdentifierSelectionOn){
            firstPositionIdentifierSelection[0].style.display = "block";
        }else{
            firstPositionIdentifierSelection[0].style.display = "none";
        }
    
        if(firstPositionSecondTextBoxOn){
            firstPositionSecondTextBox[0].parentElement.style.display = "block";
        }else{
            firstPositionSecondTextBox[0].parentElement.style.display = "none";
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
            lastPositionSelection[0].innerHTML = str;
            lastPositionSelection[0].style.display = "block";
        }else{
            lastPositionSelection[0].style.display = "none";
        }
    
        let str = "";
        for (let item of items){
            str += "<option value=\"" + item + "\">" + item + "</option>"
        }
        firstPositionIdentifierSelection[0].innerHTML = str;
    });
    childrenList[11].addEventListener("change", (event) => {
        let nodeList = event.currentTarget.parentElement.childNodes;
        let lastPositionSelectionValue = nodeList[11].value;
        let ruleSelectionOption = event.currentTarget.parentElement.getElementsByClassName("ruleSelection");
        let firstPositionSelection = event.currentTarget.parentElement.getElementsByClassName("firstPositionSelection");
        let rightMatchCaseBoxes = event.currentTarget.parentElement.getElementsByClassName("rightmatchcase");
        let lastTextBox = event.currentTarget.parentElement.getElementsByClassName("lasttextbox");
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
        if(ruleSelectionOption.value === "Set Length"){
            // If set length rule
            if(firstPositionSelection.value === "Maximum To"){
                matchCase = true;
            }else{
                
            }
        }
        if(matchCase){
            for (let i = 0; i < rightMatchCaseBoxes.length; i++){
                rightMatchCaseBoxes[i].style.display = "block";
                rightMatchCaseBoxes[i].parentElement.style.display = "block";
            }
        }else{
            for (let i = 0; i < rightMatchCaseBoxes.length; i++){
                rightMatchCaseBoxes[i].style.display = "none";
                rightMatchCaseBoxes[i].parentElement.style.display = "none";
            }
        }
    
        if(textBoxOn){
            lastTextBox.style.display = "block";
            lastTextBox.parentElement.style.display = "block";
        }else{
            lastTextBox.style.display = "none";
            lastTextBox.parentElement.style.display = "none";
        }
    
    });

    const img1 = document.createElement('img');
    img1.style="width:25px; position:fixed; left:0; padding-left:4px; padding-top:9px;";
    img1.src="SVG/Left   Checkbox   Checked   Default.svg";
    const img2 = document.createElement('img');
    img2.style="width:20px; position:fixed; left:0; margin-left:885px; padding-top:12px;";
    img2.src="SVG/Left   Remove   Default.svg";

    addRuleContainer.remove();
    rulesTable.appendChild(img1);
    rulesTable.appendChild(img2);
    rulesTable.appendChild(div);
    rulesTable.appendChild(addRuleContainer);
}

function parseRuleList(){
    let rulesList = document.getElementsByClassName("rule-value");
    for(let i = 0; i < rulesList.length; i++){
        // For each rule get all their values
        let ruleSelection = rulesList[i].getElementsByClassName("ruleSelection")[0].value;
        let firstPositionSelection = rulesList[i].getElementsByClassName("firstPositionSelection")[0].value; 
        let firstPositionFirstTextBox = rulesList[i].getElementsByClassName("firstPositionFirstTextBox")[0].value; 
        let firstPositionIdentifierSelection  = rulesList[i].getElementsByClassName("firstPositionIdentifierSelection")[0].value;
        let firstPositionSecondTextBox  = rulesList[i].getElementsByClassName("firstPositionSecondTextBox")[0].value;
        let lastPositionSelection   = rulesList[i].getElementsByClassName("lastPositionSelection ")[0].value; 
        console.log(ruleSelection);
        console.log(firstPositionSelection);
        console.log(firstPositionFirstTextBox);
        console.log(firstPositionIdentifierSelection);
        console.log(firstPositionSecondTextBox);
        console.log(lastPositionSelection);
    }
}

function showDiv(select){
    if(select.value==1){
        document.getElementById('matching').style.display = "table-row";
        document.getElementById('regex').style.display="none";
        document.getElementById('infolder').style.display = "none";
        document.getElementById('length').style.display = "none";
        document.getElementById('accessed').style.display = "none";
        
    } 
    else if(select.value==2){
        document.getElementById('regex').style.display="table-row";
        document.getElementById('matching').style.display = "none";
        document.getElementById('infolder').style.display = "none";
        document.getElementById('length').style.display = "none";
        document.getElementById('accessed').style.display = "none";
    }
    else if(select.value==3){
        document.getElementById('infolder').style.display = "table-row";
        document.getElementById('matching').style.display = "none";
        document.getElementById('regex').style.display="none";
        document.getElementById('length').style.display = "none";
        document.getElementById('accessed').style.display = "none";
       }  
    else if(select.value==4){
        document.getElementById('length').style.display = "table-row";
        document.getElementById('accessed').style.display = "none";
        document.getElementById('matching').style.display = "none";
        document.getElementById('regex').style.display="none";
        document.getElementById('infolder').style.display = "none";
    }
    else if(select.value==5){
        document.getElementById('accessed').style.display = "table-row";
        document.getElementById('length').style.display = "none";
        document.getElementById('matching').style.display = "none";
        document.getElementById('regex').style.display="none";
        document.getElementById('infolder').style.display = "none";
    }
    else{
        document.getElementById('matching').style.display = "none";
        document.getElementById('regex').style.display="none";
        document.getElementById('infolder').style.display = "none";
        document.getElementById('length').style.display = "none";
        document.getElementById('accessed').style.display = "none";
    }
 } 

