const express = require("express")//import express module
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const session = require('express-session');
app.set("view engine","hbs");
app.set("views", "./views");



const port=4500;
const mysql=require("./connection").con
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json({ type: 'application/*+json' }));

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

app.get("/pg", function(req,res){
    res.sendFile(path.join(__dirname + "/views/pg_signup.html"))
});


app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname + "/views/about.html"))
});

app.get("/contact", function(req,res){
    res.sendFile(path.join(__dirname + "/views/contact.html"))
});

app.get("/orders", function(req,res){
    res.sendFile(path.join(__dirname + "/views/checkout.html"))
});

// app.get("/explore", function(req,res){
//     res.sendFile(path.join(__dirname + "/views/explore.html"))
// });

app.get("/success", function(req,res){
    res.sendFile(path.join(__dirname + "/views/success.html"))
});

app.get("/loginsuccess", function(req,res){
    res.sendFile(path.join(__dirname + "/views/loginsuccess.html"))
});

app.get("/checkout", function(req,res){
    res.sendFile(path.join(__dirname + "/views/checkout.html"))
});

// app.get("/singlepg", function(req,res){
//     res.sendFile(path.join(__dirname + "/views/single-product.html"))
// });

// app.get("/update", function(req,res){
//     res.sendFile(path.join(__dirname + "/views/updateprofile.html"))
// });






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

app.get("/pgsignup", (req, res) => {
    // fetching data from form
    const { pg_name, pg_address, pg_phone, pg_email, pg_password } = req.query

    // Sanitization XSS...
    let qry = "select * from pg where pg_email=?";
    mysql.query(qry, [pg_email], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("pg", { checkmesg: true })
            } else {


                // insert query
                let qry2 = "insert into pg (pg_name, pg_address, pg_email, pg_phone, pg_password) values (?,?,?,?,?)";
                mysql.query(qry2, [pg_name, pg_address, pg_email, pg_phone, pg_password], (err, results) => {
                    console.log(results);
                    if (err) throw err;
                    // if (results.affectedRows > 0) {
                    //     res.render("user", { mesg: true })
                    // }
                    //  res.sendFile(path.join(__dirname + "/views/success.html"))
                     res.redirect('/explore');
                })
            }
        }
    })
});

app.get('/explore', (req, res) => {
    let qry1="SELECT * from pg";
    mysql.query(qry1, (err, results) => {
        if (err) throw err;
    res.render('explore', { data: results })
})
});

app.get('/singlepg',(req, res) => {
    const pg_name = req.query.pg_name;
    // console.log(pg_name);
    const qry3="Select * from pg where pg_name=?";
    mysql.query(qry3,[pg_name], (err, results) => {
        if (err) throw err;
        res.render('singlepg', { pg_name: results[0].pg_name}) 
    })
 });

var id;
// var email,password;
app.get("/loginperson", (req, res) => {
    // fetch data from the form
        //console.log(req.query)
        const email=req.query.email;
        const password=req.query.password;
        // console.log(email,password);

    let qry = "SELECT * FROM master WHERE email=? and password=?";
    mysql.query(qry, [email,password], (err, results) => {
        if (err) throw err
        else {
            // console.log(results)
            if(results.length>0){
                id=results[0].id;
                // console.log(id)
                // res.send("<h1>USer found</h1>")
                // console.log(results)
                //console.log(results[0].email)

                res.redirect(`/userprofile/${id}`);

            }
            else
            {
                res.send("<h1>USer not found</h1>")
            }

        }});
   
})



app.get('/userprofile/:id', (req, res) => {

         id = req.params.id;
        const qry1 = 'SELECT * FROM user JOIN orders ON orders.user_id = user.id WHERE user.id =?';
        // console.log(id);
        mysql.query(qry1, [id], (error, results) => {
            if (error) throw error;
            else{
                if(results.length==0)
                {
                    
                    res.render("userprofile", { data: results,name:results[0].name,email:results[0].email});
                }
                console.log(results);
                res.render("userprofile", { data: results,name:results[0].name,email:results[0].email});
            }
       
            // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
        });
        
    // }
});

app.get("/update", (req, res) => {
    const email = req.query.email;
    // console.log(email);
    const qry3="Select * from user where email=?";
    mysql.query(qry3,[email],(error, results) => {
    console.log(results);
     res.render("updateprofile",{name:results[0].name,street:results[0].street,pincode:results[0].pincode,email:results[0].email,phone:results[0].phone,house:results[0].house,password:results[0].password})
    })
});


app.get("/views", (req, res) => {
    let qry = "select * from user ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});

app.get("/updateinfo",(req,res)=> {
    const email = req.query.email;
    // const password = req.query.password;
    const password1 = req.query.password1;
    const street = req.query.street;
    const house=req.query.house;
    const phone=req.query.phone;
    const pincode=req.query.pincode;
    let qry5='UPDATE user SET street = ?, house = ?, phone = ?, pincode=?, password=? WHERE email = ?'
    mysql.query(qry5,[street,house,phone,pincode,password1,email],(error, results) => {
        console.log(results);
        res.sendFile(path.join(__dirname + "/views/updatesuccess.html"))
        //  res.render("updateprofile",{name:results[0].name,street:results[0].street,pincode:results[0].pincode,email:results[0].email,phone:results[0].phone,house:results[0].house,password:results[0].password})
        })
});

app.listen(port,(err)=>{
    if(err)
    throw err
    else
    console.log("Server running at %d port",port)
})