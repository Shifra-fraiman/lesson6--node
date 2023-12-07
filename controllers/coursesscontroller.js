const coursess = require('../Data/coursess.json');
const { Router } = require('express'); 
const app = Router();

//lesson 8
//bodyParser
const bodyParser= require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//fs- to read and write file
const fs= require('fs');
const fsPromises= require('fs').promises;

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


//lesson 8
app.post("/coursess", async(req, res)=>{
    const data= req.body;
    try{
        const dataObject= {
            code: data.code,
            description: data.description
        }
        const allPrevData=(await fsPromises.readFile( "./Data/coursess.json"));
        const allData= JSON.parse(allPrevData);
        allData.push(dataObject);

        try { 
            await fsPromises.writeFile("./Data/coursess.json", JSON.stringify(allData))
            res.send(fs.readFileSync("./Data/coursess.json"));
        } catch (err) { 
            console.error(err); 
        } 
    }
    catch(err){
        console.log(err);
    }  
})

app.delete("/coursess", async(req, res)=>{
   
    try{
        const code= req.body.code;
        console.log(code);
        const allPrev=(await fsPromises.readFile( "./Data/coursess.json"));
        const allPrevData= JSON.parse(allPrev);
        const allDataAfterDelete=allPrevData.filter(course=> course.code!=parseInt(code));
    
        try { 
            await fsPromises.writeFile("./Data/coursess.json", JSON.stringify(allDataAfterDelete))
            res.send(fs.readFileSync("./Data/coursess.json"));
        } catch (err) { 
            console.error(err); 
        } 
    }
    catch(err){
        console.log(err);
    }  
})

app.put("/coursess", async(req, res)=>{
   
    try{
        const update= req.body;
        
        const allPrev=(await fsPromises.readFile( "./Data/coursess.json"));
        const allPrevData= JSON.parse(allPrev);
        const allDataAfterUpdate=allPrevData.map(course=> course.code===parseInt(update.code)? {code: update.code, description: update.description} :course);
    
        try { 
            await fsPromises.writeFile("./Data/coursess.json", JSON.stringify(allDataAfterUpdate))
            res.send(fs.readFileSync("./Data/coursess.json"));
        } catch (err) { 
            console.error(err); 
        } 
    }
    catch(err){
        console.log(err);
    }  
})



module.exports = app;
