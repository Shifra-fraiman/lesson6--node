const coursess = require('../Data/coursess.json');
const { Router } = require('express'); 
const app = Router();

app.get("/coursess", (req, res)=>{
    res.json(coursess);
})

app.get("/coursess/:code", (req, res)=>{
    const code= Number(req.params.code);
    const course= coursess.find(course=> course.code===code);
    const dataCourse=`code: ${course.code}, description: ${course.description}`
    res.send(dataCourse);
})
module.exports = app;
