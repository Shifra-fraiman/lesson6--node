const workers = require('../Data/workers.json');
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


app.get('/workers', async(req, res) => { 
    try{
        const role= req.query.role.toLowerCase();
        const platoon= req.query.platoon.toLowerCase();
        const dateStartWorking= req.query.dateStartWorking.toLowerCase();
        const workersStandInCondition=workers.find(worker=> worker.role===role&& worker.platoon===platoon&& worker.dateStartWorking===dateStartWorking);
        if(!workersStandInCondition){
            res.status(404);
            res.send(`status eror: ${res.statusCode}`);
        }
        else{
            res.json(workersStandInCondition);
        }
        
    }
    catch(eror){
        res
            .status(500)
            .json({"status": res.statusCode ,  massage: "There is currently an eror in the server. please, try again later"});
    }
});

app.get('/workers/:id', (req, res) => { 
    try{
        const id = Number(req.params.id);
        const worker= workers.find(worker=> worker.id===id);
        if(!worker){
            res.status(404);
            res.send(`Eror status: ${res.statusCode}`);
        }
        else{
            res.send(`id: ${worker.id}: name: ${worker.name}, phone: ${worker.phone}, email: ${worker.email}, role: ${worker.role}, platoon: ${worker.platoon}, date ot start working: ${worker.dateStartWorking} `);
        }
    }
    catch{
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
app.post("/workers", async(req, res)=>{
    const data= req.body;
    try{
        const dataObject= {
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email ,
            role: data.role,
            platoon: data.flatoon,
            dateStartWorking: data.dateStartWorking,
        }
        const allPrevData=(await fsPromises.readFile( "./Data/workers.json"));
        const allData= JSON.parse(allPrevData);
        allData.push(dataObject);

        try { 
            await fsPromises.writeFile("./Data/workers.json", JSON.stringify(allData))
            res.send(fs.readFileSync("./Data/workers.json"));
        } catch (err) { 
            console.error(err); 
        } 
    }
    catch(err){
        console.log(err);
    }  
})

app.delete("/workers", async(req, res)=>{
   
    try{
        const id= req.body.id;
        const allPrev=(await fsPromises.readFile( "./Data/workers.json"));
        const allPrevData= JSON.parse(allPrev);
        const allDataAfterDelete=allPrevData.filter(worker=> worker.id!=parseInt(id));
    
        try { 
            await fsPromises.writeFile("./Data/workers.json", JSON.stringify(allDataAfterDelete))
            res.send(fs.readFileSync("./Data/workers.json"));
        } catch (err) { 
            console.error(err); 
        } 
    }
    catch(err){
        console.log(err);
    }  
})

app.put("/workers", async(req, res)=>{
    try{
        const update=req.body;
        const id= update.id;
        const allPrev=(await fsPromises.readFile( "./Data/workers.json"));
        const allPrevData= JSON.parse(allPrev);
        console.log(`(!update.name): ${(!update.name)}`);
        console.log(` update.name: ${update.name}`);
        console.log(`(!update.phone): ${(!update.phone)}`);
        console.log(`(!update.email): ${(!update.email)}`);
        console.log(`update.email : ${update.email}`);

       
        const allDataAfterUpdate=allPrevData.map(worker=> worker.id===parseInt(id)? 
        {   id: update.id,
            name: (!update.name)? worker.name :update.name,
            phone: (!update.phone)? worker.phone :update.phone,
            email: (!update.email)? worker.email :update.email ,
            role: (!update.role)? worker.role :update.role,
            platoon: (!update.flatoon)? worker.flatoon :update.flatoon,
            dateStartWorking: (!update.dateStartWorking)? worker.dateStartWorking :update.dateStartWorking, 
        }
         :worker);
        try { 
            await fsPromises.writeFile("./Data/workers.json", JSON.stringify(allDataAfterUpdate))
            res.send(fs.readFileSync("./Data/workers.json"));
        } catch (err) { 
            console.error(err); 
        } 
    }
    catch(err){
        console.log(err);
    }  
})

module.exports = app;
