export function Page(label, textLabelVersionDefinitionMap, version = 1, application = 'common') {
    this.label = label;
    this.application = application;
    this.version = version;
    this.textLabelVersionDefinitionMap = textLabelVersionDefinitionMap;
    this.textLabelValueMap = {};
}

export function insertPageParam(textObj) {
    return {
        TableName: 'Text',
        Item: {
            PK: 'PAGE#' + textObj.application,
            SK: textObj.label + '#' + textObj.version,
            label: textObj.label,
            version: textObj.version,
            application: textObj.application,
            labelVersion: textObj.textLabelVersionDefinitionMap,
            localeValue: textObj.textLabelValueMap
        }
    }
}

export function getPageParam(label, application, version = 1) {
    return {
        TableName: 'Text',
        Key: {
            PK: 'PAGE#' + application,
            SK: label + '#' + version,
        }
    }
}