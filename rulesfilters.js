

const addRuleBtn = document.getElementById("addRuleBtn")
function addRule(){
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

