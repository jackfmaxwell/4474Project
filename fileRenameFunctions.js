//TODO Create all the ruleset
var v = require('voca')

function fileRemove(text, startIndex, endIndex){
    return v.splice(text, startIndex, endIndex - startIndex);
}

function fileReverse(text, startAt, endAt){
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.reverse(subString));
}

function fileRandomize(){
    return null;
}

function fileSetTileCase(){
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.titleCase(subString));
}

function fileSetInvertedCase(){
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.swapCase(subString));
}

function fileSetUpperCase(text, startAt, endAt){
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.upperCase(subString));
}

function fileSetLowerCase(text, startAt, endAt){
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.lowerCase(subString));
}

function fileReplace(isFirstLastEach, count, text, withText){
    if(isFirstLastEach == 0){
        //ReplaceFirstCount
        let newString = text;
        for(let i = 0; i< count; i++){
            newString = newString.replace(text, withText);
        }
    }else if(isFirstLastEach == 1){
        //ReplaceLastCount
        let newString = text;
        for(let i = 0; i < count; i++){
            newString = newString.replace(new RegExp(text + '$'), withText)
        }
    }else{
        //ReplaceEach
        const re = new RegExp(text, "g");
        const newString = text.replace(re, withText);
    }
    return newString;
}

function fileRegex(find, replace, string){
    const re = new RegExp(find, "g");
    const newString = string.replace(find, replace);
    return newString;
}

function fileSetLength(toMinMax, count, padLeftRight, text, withText){
    if(toMinMax == 0){
        //To option Selected
    }else if(toMinMax == 1){
        // Min option selected
        
    }else{
        // Max option selected
        return text.substring(0, count);
    }
    return null;
}

function fileMove(){
    return null;
}

// STRING POSITION FINDERS
// OUTPUT SHOULD BE THE INDEX OF THE STRING

function BeforeFirst(text, toFind){
    let index = v.search(text, toFind);
    if(index <= 0) return index;
    return v.search(text, toFind) - 1;
}

function beforeLast(text, toFind){
    let index = -2;
    while(index != -1){
        index = v.search(text, toFind);
    }
    if(index <= 0 ) return index
    return index - 1;
}

function AfterFirst(text, toFind){
    let index = v.search(text, toFind);
    if(index == -1) return -1;
    return index + toFind.length;
}

function AfterLast(text, toFind){
    let index = -2;
    while(index != -1){
        index = v.search(text, toFind);
    }
    if(index == -1) return index
    return index + toFind.length;
}

function BeforeEach(text, toFind){
    return null;
}

function AfterEach(text, toFind){
    return null;
}

export {fileRemove, fileReverse, fileRandomize, fileSetTileCase, fileSetInvertedCase, fileSetUpperCase, fileSetLowerCase, fileReplace, fileRegex, fileSetLength, fileMove}