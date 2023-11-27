const coursess = require('../Data/coursess.json');
const { Router } = require('express'); 
const app = Router();

app.get("/coursess", (req, res)=>{
    res.json(coursess);
})

// const errorHandler = (error, request, response, next) {
//     // Error handling middleware functionality
//     console.log( `error ${error.message}`) // log the error
//     const status = error.status || 400
//     // send back an easily understandable error message to the caller
//     response.status(status).send(error.message)
//   }
app.get("/coursess/:code", async(req, res)=>{
    try{
        const code= Number(req.params.code);
        const course= coursess.find(course=> course.code===code);
        if(course==null){
            // console.log("input error")
            res.status(404);
            // .json({ message: "Mandatory field: name is missing. " })
        }
        else{
            const dataCourse=`code: ${course.code}, description: ${course.description}`
            res.send(dataCourse);
        }
    }
    catch(eror){
        res
            .status(500)
            .json({"status": res.statusCode ,  massage: "There is currently an eror in the server. please, try again later"});
    }
})
module.exports = app;
