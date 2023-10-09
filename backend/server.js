const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const mysql = require('mysql');

const cors = require('cors');
server.use(cors());

server.use(bodyParser.json());

//db conn
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "dbtodo"
});

db.connect(function(error){
    if(error){
        console.log("Error connecting to the db");
    }else{
        console.log("Successfully connected to the db");
    }
})


//establish the port
server.listen(9002,function check(error){
    if(error){
        console.log("Error listening");
    }else{
        console.log("Started listening");
    }
})


//creating a task
server.post("/api/todo/add",(req,res)=>{
    let details = {
        task : req.body.task,
    }

    let sql = "INSERT INTO todo SET ?";
    db.query(sql,details,(error)=>{
        if(error){
            res.send({status: false,message: "Task creation is failed"});
        }else{
            res.send({status: true,message: "Task creation is success"});
        }
    })
})

//view the tasks
server.get("/api/todo/",(req,res)=>{
    let sql = "SELECT * FROM todo";
    db.query(sql,function(error,result){
        if(error){
            console.log("Error occurred")
        }else{
            console.log(result)
            res.send({status: true,data : result});
        }
    })
})

//update the task
server.put("/api/todo/update/:id",(req,res)=>{
    let sql = "UPDATE todo SET task='" + req.body.task + "'" + " WHERE id=" + req.params.id;
    let a = db.query(sql,(error,result)=>{
        if(error){
            res.send({status: false,message: "Task update is failed"});
        }else{
            res.send({status: true,message: "Task update is success"});
        }
    })
})


//delete the task
server.delete("/api/todo/delete/:id",(req,res)=>{
    let sql = "DELETE FROM todo WHERE id=" + req.params.id;
    let query = db.query(sql,(error)=>{
        if(error){
            res.send({status: false,message: "Task deletion is failed"});
        }else{
            res.send({status: true,message: "Task deletion is success"});
        }
    })
})