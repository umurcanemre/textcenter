//var express = require('express');
//var { graphqlHTTP } = require('express-graphql');
//var { buildSchema } = require('graphql');

//var { Text }  = require('../domain/text.js');

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { Text } from '../domain/text.js';

var schema = buildSchema(`
    type Query {
        text(label: String!): Text
        texts: [Text]
    },
    type Text {
        label: String
        version: Int
        application: String
        localeValue: [LocaleValue]
    },
    type LocaleValue {
        locale: String
        value: String
   }
`);


let localeToMap = { us_EN: "test", tr_TR: "test", de_DE: "test" };
let text1 = new Text('test1', localeToMap);
localeToMap = { us_EN: "test2", tr_TR: "test2", de_DE: "test2" };
let text2 = new Text('test2', localeToMap);

var textsData = [text1, text2]

var getText = function(args) { 
    var label = args.label;
    return textsData.filter(text => {
        return text.label == label;
    })[0];
}
var getTexts = function() { 
    return textsData;
}

var root = {
    text: getText,
    texts: getTexts
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));