const coursess = require('../Data/coursess.json');
const { Router } = require('express'); 
const app = Router();

app.get("/coursess", (req, res)=>{
    res.json(coursess);
})

app.get("/coursess/:code", (req, res)=>{
    try{
        const code= Number(req.params.code);
        const course= coursess.find(course=> course.code===code);
        if(course==null){
            res.status(404);
            res.send(`status eror: ${res.statusCode}`);
        }
        else{
            const dataCourse=`code: ${course.code}, description: ${course.description} `
            res.send(dataCourse);
        }
    }
    catch(eror){
        res
            .status(500)
            .json({"status": res.statusCode ,  massage: "There is currently an eror in the server. please, try again later"});
    }
});

app.get("*", (req, res)=>{
    res.status(404);
    res.send(`Eror status: ${res.statusCode}. You have an error in the URL`);
});

module.exports = app;
