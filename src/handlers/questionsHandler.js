"use strict";
const QuestionsDbAccessor = require("../dbAccessor/QuestionsDbAccessor");
const dbAccessor = new QuestionsDbAccessor();

module.exports.GetQuestions = async (options) =>{

    // options have parameters of get request
    let buckets = await dbAccessor.selectAllQuestions(options);
    console.log(options);
    return {"test":"get"};
};

module.exports.InsertingQuestions = async (options) =>{
    // options have contents/body of post request
    let buckets = await dbAccessor.insertingQuestions(options);
    console.log(options);
    return {"test":"post"};
};