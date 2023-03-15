const express = require("express")//import express module
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port=4500;
const mysql=require("./connection").con


app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/success", function(req,res){
    res.sendFile(path.join(__dirname + "/views/success.html"))
});

app.get("/loginsuccess", function(req,res){
    res.sendFile(path.join(__dirname + "/views/loginsuccess.html"))
});

app.get("/singlepg", function(req,res){
    res.sendFile(path.join(__dirname + "/views/single-product.html"))
});

app.get("/usersignup", (req, res) => {
    // fetching data from form
    const { name, street, house, pincode, email, phone, password } = req.query

    // Sanitization XSS...
    let qry = "select * from user where email=?";
    mysql.query(qry, [email], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("user", { checkmesg: true })
            } else {


                // insert query
                let qry2 = "insert into user(name, street, house, pincode, email, phone, password) values (?,?,?,?,?,?,?)";
                mysql.query(qry2, [name, street, house, pincode, email, phone, password], (err, results) => {
                    console.log(results)
                    // if (results.affectedRows > 0) {
                    //     res.render("user", { mesg: true })
                    // }
                    res.sendFile(path.join(__dirname + "/views/success.html"))
                })
            }
        }
    })
});

// app.get('/loginperson', function(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;
    
//     // Check if user exists in the database
//     connection.query('SELECT * FROM master WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
//       if (error) {
//         throw error;
//       }
//       if (results.length > 0) {
//         // User authenticated, redirect to the dashboard
//         res.redirect('/success');
//       } else {
//         // Invalid credentials, show error message
//         res.send('Invalid emailid or password');
//       }
//     });
//   });

app.get("/loginperson", (req, res) => {
    // fetch data from the form


    const { email, password } = req.query;

    let qry = "select * from master where email=? and password=?";
    mysql.query(qry, [email,password], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                // User authenticated, redirect to the dashboard
                res.redirect('/loginsuccess');
              } else {
                // Invalid credentials, show error message
                res.send('Invalid emailid or password');
              }

        }
        console.log(results)
    });
})

app.listen(port,(err)=>{
    if(err)
    throw err
    else
    console.log("Server running at %d port",port)
})