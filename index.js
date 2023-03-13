const express = require("express")//import express module
const app = express();

const path = require('path');
const port=4500;


app.use(express.static('assets'));

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/views/index.html"))
});

app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname + "/views/login.html"))
});

app.get("/user", function(req,res){
    res.sendFile(path.join(__dirname + "/views/user.html"))
});

app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname + "/views/about.html"))
});

app.get("/contact", function(req,res){
    res.sendFile(path.join(__dirname + "/views/contact.html"))
});

app.get("/explore", function(req,res){
    res.sendFile(path.join(__dirname + "/views/shop.html"))
});

app.get("/singlepg", function(req,res){
    res.sendFile(path.join(__dirname + "/views/single-product.html"))
});

app.listen(port,(err)=>{
    if(err)
    throw err
    else
    console.log("Server running at %d port",port)
})