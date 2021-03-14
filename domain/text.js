export function Text(label, localeValueMap, version = 1, application = 'common') {
    this.label = label;
    this.version = version;
    this.localeValueMap = localeValueMap;
    this.application = application;
}

export function insertTextParam(textObj) {
    return {
        TableName: 'Text',
        Item: {
            PK: 'TEXT#' + textObj.application,
            SK: textObj.label + '#' + textObj.version,
            label: textObj.label,
            version: textObj.version,
            application: textObj.application,
            localeValue: textObj.localeValueMap
        }
    }
}

export function getTextParam(label, application, version = 1) {
    return {
        TableName: 'Text',
        Key: {
            "PK": 'TEXT#' + application,
            "SK": label + '#' + version
        }
    }
}

//module.exports.Text = Text
//module.exports.insertTextParam = insertTextParam
//module.exports.getTextParam = getTextParam