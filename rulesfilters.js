const { unset } = require("lodash");

const newBtn = document.getElementById("newButton");
newBtn.onclick = () => {
    removeAllRules();
    removeAllFilters();
}


const filtersTable = document.getElementById("filtersTable");

const addFilterBtn = document.getElementById("addFilterBtn");
addFilterBtn.onclick = () => addFilter();
const addFilterContainer = document.getElementById("addFilterContainer");

function addFilter(){
    const div = document.createElement('div');
    div.className = 'filter-value rf-div-table-row';

    div.innerHTML = ` 
    <select class="filterInEx filters rf-div-table-col"  style="width:145px; padding: top 2px; padding-left:4px;">
        <option value="Include">Include</option>
        <option value="Exclude">Exclude</option>
    </select>
    <select class="filterSelection filters rf-div-table-col"  style="display: unset; width:145px; padding: top 2px; padding-left:4px;">
        <option value="files">files</option>
        <option value="files with names">files with names</option>
        <option value="files with extensions">files with extensions</option>
        <option value="images">images</option>
        <option value="music">music</option>
        <option value="videos">videos</option>
        <option value="folders">folders</option>
        <option value="subfolders">subfolders</option>
    </select>
    <select class="firstPositionSelection filters rf-div-table-col" style="max-width: 120px; display:unset;">
        <option value="all">all</option>
        <option value="matching">matching</option>
        <option value="containing">containing</option>
        <option value="starting with">starting with</option>
        <option value="ending with">ending with</option>
        <option value="matching regex">matching Regex</option>
        <option value="in folder">in folder</option>
        <option value="length">length</option>
        <option value="longer">longer than</option>
        <option value="shorter">shorter than</option>
        <option value="accessed">accessed</option>
        <option value="created">created</option>
        <option value="modified">modified</option>
        <option value="taken">taken</option>
    </select>

    <!-- if matching, containing, starting with or ending is selected -->
    <div class="matching rf-div-table-col" style="display:none;">
        <input style="min-width:40px; min-height: 15px;" type="text" value="type here"></input>
        <img style="width:75px; overflow-x:visible; padding-right:4px; display: none;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>

    <!-- if matching regex is selected -->
    <div class="regex rf-div-table-col" style="display:none;">
        regex
    </div>

    <!-- if in folder is selected -->
    <div class="infolder rf-div-table-col" style="display:none;">
        full folder path
    </div>

    <!-- if length, longer than or shorter then is selected -->
    <div class="length rf-div-table-col" style="display:none;">
        <input style="min-width:40px; min-height: 15px;" type="number" min="0" max="100" value="0"></input>
    </div>

    <!-- if accessed, created, modified or taken is selected -->
    <div class="accessed rf-div-table-col" style="display: none;">
        <select class="filters rf-div-table-col"  style="height: 100%; padding-left:12px;">
            <option value="at">at</option>
            <option value="before">before</option>
            <option value="after">after</option>
        </select>
        <input style="min-width:40px; min-height: 15px;" type="date" value="12:00am"></input>
        <input style="min-width:40px; min-height: 15px;" type="time" value=" "></input>
    </div>
    `;
    let childrenList = div.childNodes;
    console.log(childrenList);
    //bind event handlers
    childrenList[3].addEventListener("change", (event) => {
        fchildList3(event, childrenList);
    });

    childrenList[5].addEventListener("change", (event) => {
        fchildList5(event, childrenList);
    });


    const img1 = document.createElement('img');
    img1.style="width:25px; position:fixed; left:0; padding-left:4px; padding-top:9px;";
    img1.src="SVG/Left   Checkbox   Checked   Default.svg";
    img1.className+="enableRule enabled";
    img1.addEventListener("click", (event) =>{
        enableDisableFilter(img1, event, div);
    });
    const img2 = document.createElement('img');
    img2.style="width:20px; position:fixed; left:0; margin-left:885px; padding-top:12px;";
    img2.src="SVG/Left   Remove   Default.svg";
    img2.addEventListener("click", (event) =>{
        removeFilter(event, div, img1, img2);
    });


    addFilterContainer.remove();
    filtersTable.appendChild(img1);
    filtersTable.appendChild(img2);
    filtersTable.appendChild(div);
    filtersTable.appendChild(addFilterContainer);

    filtersList.push(new Rule(div,img1,img2));
}
function enableDisableFilter(img, event, div){
    if(img.classList.contains("enabled")){
        //disable it
        img.classList.remove("enabled");
        img.className+=" disabled";
        img.src="SVG/Left   Checkbox   Unchecked   Default.svg";
        div.style.opacity = "0.3";
    }
    else if(img.classList.contains("disabled")){
        //enable it
        img.classList.remove("disabled");
        img.className+=" enabled";
        img.src="SVG/Left   Checkbox   Checked   Default.svg";
        div.style.opacity = "1.0";
    }
}



const rulesTable = document.getElementById("rulesTable");

const addRuleBtn = document.getElementById("addRuleBtn");
addRuleBtn.onclick = () => addRule();
const addRuleContainer = document.getElementById("addRuleContainer");

function addRule(){
    const div = document.createElement('div');
    div.className = 'rule-value rf-div-table-row';

    div.innerHTML = ` 
    <select class="ruleSelection rules rf-div-table-col"  style="width:94px; padding: top 2px; padding-left:4px;">
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

    <div class="rf-div-table-col" style="max-width:210;">
        <input class="firstPositionFirstTextBox" style="max-width:95px; display: none;" type="text"></input>
        <img class="leftmatchcase" style="width:75px; overflow-x:visible; padding-right:4px; display: none;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>
    <select class="firstPositionIdentifierSelection rules rf-div-table-col" style="max-width: 125px; display: none;">
        <option value="fromPosition">from position</option>
        <option value="fromEnd">from end</option>
        <option value="fromBeforeFirst">from before first</option>
        <option value="fromBeforeLast">from before last</option>
        <option value="fromAfterFirst">from after first</option>
        <option value="fromAfterLast">from after last</option>
        <option value="fromBeforeEach">from before each</option>
    </select>
    <div class="rf-div-table-col" style="max-width:210;">
        <input class="firstPositionSecondTextBox" style="max-width:87px; display: none;" type="text"></input>
        <img class="leftmatchcase" style="width:75px; overflow-x:visible; padding-right:4px; display: none;" src="SVG/Left   Input   MatchCase   Checked.svg">
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

    <div class="rf-div-table-col" style="max-width:280;">
        <input class="lasttextbox" style="display: unset; max-width:87px;" type="text"></input>
        <img class="rightmatchcase" style="width:75px; overflow-x:visible; padding-right:4px;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>
</div>
    `;


    let childrenList = div.childNodes;
    console.log(childrenList);
    //bind event handlers
    childrenList[1].addEventListener("change", (event) => {
        rchildList1(event, childrenList);
    });
    childrenList[3].addEventListener("change", (event) => {
        rchildList3(event, childrenList);
    });
    childrenList[11].addEventListener("change", (event) => {
        rchildList11(event, childrenList);
    });

    const img1 = document.createElement('img');
    img1.style="width:25px; position:fixed; left:0; padding-left:4px; padding-top:9px;";
    img1.src="SVG/Left   Checkbox   Checked   Default.svg";
    img1.className+="enableRule enabled";
    img1.addEventListener("click", (event) =>{
        enableDisableRule(img1, event, div);
    });
    const img2 = document.createElement('img');
    img2.style="width:20px; position:fixed; left:0; margin-left:885px; padding-top:12px;";
    img2.src="SVG/Left   Remove   Default.svg";
    img2.addEventListener("click", (event) =>{
        removeRule(event, div, img1, img2);
        
    });

    addRuleContainer.remove();
    rulesTable.appendChild(img1);
    rulesTable.appendChild(img2);
    rulesTable.appendChild(div);
    rulesTable.appendChild(addRuleContainer);

    rulesList.push(new Rule(div,img1,img2));
}

function enableDisableRule(img, event, div){
    if(img.classList.contains("enabled")){
        //disable it
        img.classList.remove("enabled");
        img.className+=" disabled";
        img.src="SVG/Left   Checkbox   Unchecked   Default.svg";
        div.style.opacity = "0.3";
    }
    else if(img.classList.contains("disabled")){
        //enable it
        img.classList.remove("disabled");
        img.className+=" enabled";
        img.src="SVG/Left   Checkbox   Checked   Default.svg";
        div.style.opacity = "1.0";
    }
}
var rulesList = [];
class Rule{
    constructor(div, img1, img2){
        this.div = div;
        this.img1 = img1;
        this.img2 = img2;
    }
}
function removeRule(event, div, img1, img2){
    div.remove();
    img1.remove();
    img2.remove();
}
const removeAllRulesBtn = document.getElementById("rulesRemoveAllBtn");
function removeAllRules(){
    rulesList.forEach(rule =>{
        removeRule(null, rule.div, rule.img1, rule.img2);
    });
    rulesList = [];
}
removeAllRulesBtn.onclick = () =>{
   removeAllRules();
}

var filtersList = [];
class Filter{
    constructor(div, img1, img2){
        this.div = div;
        this.img1 = img1;
        this.img2 = img2;
    }
}
function removeFilter(event, div, img1, img2){
    div.remove();
    img1.remove();
    img2.remove();
}
function removeAllFilters(){
    filtersList.forEach(filter =>{
        removeRule(null, filter.div, filter.img1, filter.img2);
    });
    filtersList = [];
}
const removeAllFiltersBtn = document.getElementById("filtersRemoveAllBtn");
removeAllFiltersBtn.onclick = () =>{
    removeAllFilters();
}

function rchildList1(event, childrenList){
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
    firstPositionSelection.style.display = "unset";
    }
    rchildList3(event);
    rchildList11(event);
}
function rchildList3(event){
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
            console.log(firstPositionFirstTextBox);
            firstPositionFirstTextBox[0].style.display = "unset";
            firstPositionFirstTextBox[0].parentElement.style.display = "unset";
        }else{
            firstPositionFirstTextBox[0].style.display = "none";
            firstPositionFirstTextBox[0].parentElement.style.display = "none";
        }
    
        if(firstPositionIdentifierSelectionOn){
            firstPositionIdentifierSelection[0].style.display = "unset";
        }else{
            firstPositionIdentifierSelection[0].style.display = "none";
        }
    
        if(firstPositionSecondTextBoxOn){
            firstPositionSecondTextBox[0].parentElement.style.display = "unset";
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
            lastPositionSelection[0].style.display = "unset";
        }else{
            lastPositionSelection[0].style.display = "none";
        }
    
        let str = "";
        for (let item of items){
            str += "<option value=\"" + item + "\">" + item + "</option>"
        }
        firstPositionIdentifierSelection[0].innerHTML = str;
    rchildList11(event);
}
function rchildList11(event){
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
            for (let i = 0; i < lastTextBox.length; i++){
                lastTextBox[i].style.display = "unset";
                lastTextBox[i].parentElement.style.display = "unset";
            }
        }else{
            for (let i = 0; i < lastTextBox.length; i++){
                lastTextBox[i].style.display = "none";
                lastTextBox[i].parentElement.style.display = "none";
            }
        }
}

function fchildList3(event, childrenList){
    let filterSelection = childrenList[3].value;
    if(filterSelection==="files" || filterSelection==="files with names" || filterSelection==="files with extensions"){
        event.currentTarget.parentElement.getElementsByClassName("firstPositionSelection")[0].style.display = "unset";
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "unset";
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "none";
    }
    else{
        event.currentTarget.parentElement.getElementsByClassName("firstPositionSelection")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "none";
    }
}
function fchildList5(event, childrenList){
    let nodeList = event.currentTarget.parentElement.childNodes;
    let filterSelectionValue = childrenList[5].value;
    if(filterSelectionValue === "matching" || filterSelectionValue === "containing" || filterSelectionValue === "starting with" || filterSelectionValue==="ending with"){
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "unset";
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "none";
        
    }else if(filterSelectionValue === "matching regex"){
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "unset";
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "none";
    }else if(filterSelectionValue === "in folder"){
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "unset";
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "none";
    }else if(filterSelectionValue === "length" || filterSelectionValue === "longer" || filterSelectionValue === "shorter"){
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "unset";
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "none";
    }else if(filterSelectionValue === "accessed" || filterSelectionValue === "created" || filterSelectionValue === "modified" || filterSelectionValue === "taken"){
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "unset";
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "none";
    }
    else{
        event.currentTarget.parentElement.getElementsByClassName("accessed")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("length")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("infolder")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("regex")[0].style.display = "none";
        event.currentTarget.parentElement.getElementsByClassName("matching")[0].style.display = "none";
    
    }
    
}


