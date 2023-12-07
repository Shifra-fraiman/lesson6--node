const express= require('express');
const workers = require('./controllers/workerscontroller.js');
const coursess = require('./controllers/coursesscontroller.js');
const app= express();

app.use(workers);
app.use(coursess);

// app.use(coursess.json())
// app.use(coursess.urlencoded({ extended: false }))

app.listen(3000, () => { 
    console.log("listening on 3000 server"); 
});
