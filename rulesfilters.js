
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

const addRuleContainer = document.getElementById("addRuleContainer");

function addRule(rule){
    const div = document.createElement('div');
    div.className = 'rf-div-table-row';

    div.innerHTML = `
    <select class="rules rf-div-table-col"  style="max-width: 120px; padding: top 2px; padding-left:4px;">
        <option value="Add">Add</option>
        <option value="Remove">Remove</option>
        <option value="Reverse">Reverse</option>
        <option value="Randomize">Randomize</option>
        <option value="Set Title Case">Set Title Case</option>
        <option value="Set iNVERTED case">Set iNVERTED case</option>
        <option value="Set UPPER case">Set UPPER case</option>
        <option value="Set lower case">Set lower case</option>
        <option value="Replace">Replace</option>
        <option value="Regex">Regex</option>
        <option value="Set Length">Set Length</option>
        <option value="Move">Move</option>
    </select>
    <select class="rules rf-div-table-col" style="max-width: 120px;">
        <option>from position</option>
        <option>from end</option>
        <option>from before first</option>
        <option>from before last</option>
        <option>from after first</option>
        <option>from after last</option>
        <option>from before each</option>
    </select>
    <div class="rf-div-table-col" style="max-width:210; min-width:180px; display: inline;">
        <input style="max-width:140px;" type="text"></input>
        <img style="width:75px; padding-right:4px;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>
    <select class="rules rf-div-table-col">
        <option>to position</option>
        <option>to end</option>
        <option>to position from end</option>
        <option>to before first</option>
        <option>to before last</option>
        <option>to after first</option>
        <option>to after last</option>
    </select>
    <div class="rf-div-table-col" style="max-width:210; min-width:180px; display: inline;">
        <input style="max-width:120px;" type="text"></input>
        <img style="width:75px; padding-right:4px;" src="SVG/Left   Input   MatchCase   Checked.svg">
    </div>
    `;

    const img1 = document.createElement('img');
    img1.style="width:25px; position:fixed; left:0; padding-left:17px; padding-top:12px;";
    img1.src="SVG/Left   Checkbox   Checked   Default.svg";
    const img2 = document.createElement('img');
    img2.style="width:20px; position:fixed; left:0; margin-left:47%; padding-top:12px;";
    img2.src="SVG/Left   Remove   Default.svg";

    addRuleContainer.remove();
    rulesTable.appendChild(img1);
    rulesTable.appendChild(img2);
    rulesTable.appendChild(div);
    rulesTable.appendChild(addRuleContainer);
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

