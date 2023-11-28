const workers = require('../Data/workers.json');
const { Router } = require('express'); 
const app = Router(); 

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
  
module.exports = app;
