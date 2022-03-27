var v = require('voca')

exports.fileAdd = (text, startIndex, withText) => {
    return v.insert(text, withText, startIndex);
}

exports.fileRemove = (text, startIndex, endIndex) => {
    return v.splice(text, startIndex, endIndex - startIndex);
}

exports.fileReverse = (text, startAt, endAt) => {
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.reverse(subString));
}

exports.fileRandomize = (text, startAt, endAt) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = startAt; i < endAt; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, result);
}

exports.fileSetTileCase = () => {
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.titleCase(subString));
}

exports.fileSetInvertedCase = () => {
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.swapCase(subString));
}

exports.fileSetUpperCase = (text, startAt, endAt) => {
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.upperCase(subString));
}

exports.fileSetLowerCase = (text, startAt, endAt) => {
    subString = v.slice(text, startAt, endAt);
    return v.replace(text, subString, v.lowerCase(subString));
}

exports.fileReplace = (text, startAt, endAt, withText) => {
    subString = v.slice(text, startAt, endAt);
    v.replace(text, substring, withText);
}

exports.fileRegex = (find, replace, string) => {
    const re = new RegExp(find, "g");
    const newString = string.replace(find, replace);
    return newString;
}

exports.fileSetLength = (text, to, padLeft, padLeftRighText, minOrMax) => {
    if(minOrMax){
        // Min
        if(text.length > to + 1){
            // text past min length so trim
            v.splice(text, to, text.length - to);
        }else{
            // Text not to min length so add
            if(padLeft){
                v.padLeft(text, to + 1, padLeftRighText);
            }else{
                v.padRight(text, to + 1, padLeftRighText);
            }
        }
    }else{
        //Max
        if(text.length < to){
            //Text less then max add
            if(padLeft){
                v.padLeft(text, to + 1, padLeftRighText);
            }else{
                v.padRight(text, to + 1, padLeftRighText);
            }
        }else{
            // Text greater then max so trim
            v.splice(text, to, text.length - to);
        }
    }
    return text;
}

exports.fileMove = (text, startAt, endAt, to) => {
    let substring = v.slice(text, startAt, endAt);
    v.replace(text, substring, "");
    return v.insert(text, substring, to);
}

// STRING POSITION FINDERS
// OUTPUT SHOULD BE THE INDEX OF THE STRING

exports.BeforeFirst = (text, toFind, matchCase) => {
    if(!matchCase){
        text = v.lowerCase(text);
        toFind = v.lowerCase(toFind);
    }
    let index = v.search(text, toFind);
    if(index <= 0) return index;
    return v.search(text, toFind) - 1;
}

exports.beforeLast = (text, toFind, matchCase) => {
    if(!matchCase){
        text = v.lowerCase(text);
        toFind = v.lowerCase(toFind);
    }
    let index = -2;
    while(index != -1){
        index = v.search(text, toFind);
    }
    if(index <= 0 ) return index
    return index - 1;
}

exports.AfterFirst = (text, toFind, matchCase) => {
    if(!matchCase){
        text = v.lowerCase(text);
        toFind = v.lowerCase(toFind);
    }
    let index = v.search(text, toFind);
    if(index == -1) return -1;
    return index + toFind.length;
}

exports.AfterLast = (text, toFind, matchCase) => {
    if(!matchCase){
        text = v.lowerCase(text);
        toFind = v.lowerCase(toFind);
    }
    let index = -2;
    while(index != -1){
        index = v.search(text, toFind);
    }
    if(index == -1) return index
    return index + toFind.length;
}

// EACH Finders Output should be array of indexes to start or end at
exports.BeforeEach = (text, toFind, matchCase) => {
    if(!matchCase){
        text = v.lowerCase(text);
        toFind = v.lowerCase(toFind);
    }
    let substring = text;
    const result_array = [];

    let index = v.search(substring, toFind);
    while(index != -1){
        result_array.push(v.replace(substring, toFInd, ""));
        index = v.search(substring, toFInd)
    }
    return result_array;
}

exports.AfterEach = (text, toFind, matchCase) => {
    if(!matchCase){
        text = v.lowerCase(text);
        toFind = v.lowerCase(toFind);
    }
    let substring = text;
    const result_array = [];

    let index = v.search(substring, toFind) + toFind.length;
    while(index != -1){
        result_array.push(v.replace(substring, toFInd, ""));
        index = v.search(substring, toFInd) + toFind.length;
    }
    return result_array;
}
