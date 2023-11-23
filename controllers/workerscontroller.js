const workers = require('../Data/workers.json');
const { Router } = require('express'); 
const app = Router(); 

app.get('/workers', (req, res) => { 
    try{
        const role= req.query.role.toLowerCase();
        const platoon= req.query.platoon.toLowerCase();
        const dateStartWorking= req.query.dateStartWorking.toLowerCase();
        console.log("role "+role);
        const workersStandInCondition=workers.filter(worker=> worker.role===role&& worker.platoon===platoon&& worker.dateStartWorking===dateStartWorking);
        console.log(workersStandInCondition);
        res.json(workersStandInCondition);
    }
    catch{
        res.json(workers);
    }
});

app.get('/workers/:id', (req, res) => { 
    const id = Number(req.params.id);
    const worker= workers.find(worker=> worker.id===id);
    if(!worker)
        worker=[];
    res.send(`id: ${worker.id}: name: ${worker.name}, phone: ${worker.phone}, email: ${worker.email}, role: ${worker.role}, platoon: ${worker.platoon}, date ot start working: ${worker.dateStartWorking} `);
}); 
  
module.exports = app;
