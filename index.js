const express = require("express")//import express module
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { con } = require("./connection");
// const session = require('express-session');
app.set("view engine","hbs");
app.set("views", "./views");
global.nonvegQ1;
global.vegQ1;
global.ordersQ1;
global.pending1;
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
app.use(express.urlencoded({extended:false}));

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

// app.get("/checkout", function(req,res){
//     res.sendFile(path.join(__dirname + "/views/checkout.html"))
// });
app.get("/ordersuccess", function(req,res){
    res.sendFile(path.join(__dirname + "/views/ordersuccess.html"))
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
                     res.redirect('/dashboard');
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
    const qry3="SELECT * FROM pg JOIN items ON items.pg_name = pg.pg_name WHERE pg.pg_name =?";
    mysql.query(qry3,[pg_name], (err, results) => {
        // console.log(results);
        if (err) throw err;
        res.render('singlepg', { pg_name: results[0].pg_name,item_description: results[0].item_description,item_category: results[0].item_category, item_id: results[0].item_id,quantity_available: results[0].quantity_available}) 
    })

 });
 
var item_id;
var item_category;
var pg_id;
var pg_name;
var order_id;
var order_item;
var order_quantity;
var delivery_status;
// var order_quantity1;
// var quantity;   
 app.get('/checkout', (req, res) => {
    if(req.session.userid==undefined || req.session.userid=="")
    {
        res.redirect(`/login`);
    }
    else{

   
 item_id=req.query.item_id;
 //quantity=req.query.order_quantity;
 //console.log("hello  "+req.query.order_quantity);
 //order_quantity1=parseInt(quantity);
//  if (isNaN(order_quantity1)) {
//     order_quantity1 = 0; // Set a default value
//   }
  
 const qry1="Select pg_id,pg_name,item_category from items where item_id=?";
 order_quantity=1;
 delivery_status="pending";
// const qry3="Select id from user where id=?";
 mysql.query(qry1,[item_id],(err,results) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving data');
      }
      if (results && results.length > 0 && results[0].pg_id && results[0].pg_name && results[0].item_category) {
        item_category = results[0].item_category;
        pg_id = results[0].pg_id;
        pg_name = results[0].pg_name;
        console.log(pg_name);
        console.log(pg_id);
        console.log(item_category);
        //console.log(order_quantity1);
        
        const qry2 = "INSERT INTO orders1 (user_id, pg_id, pg_name, order_item,item_id,delivery_status,order_quantity) VALUES (?,?, ?, ?, ?,?,?)";
        mysql.query(qry2, [id, pg_id, pg_name, item_category,item_id,delivery_status,order_quantity], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error inserting data');
        }
        else{
            console.log('Data inserted successfully');
            //return res.send('Data retrieved and inserted successfully');
            const qrydecrement = "Update items SET quantity_available = quantity_available - 1 where pg_id = ? and item_id = ?";
            mysql.query(qrydecrement,[pg_id,item_id],(err,results)=>{
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error inserting data');
                  }  
                  else{
                    console.log("Quantity Updated");
                  }
            })
            const qry3="select * from orders1 where item_id = ?";
            mysql.query(qry3,[item_id],(err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error retrieving data');
      }
      if (results && results.length > 0 && results[0].pg_id && results[0].pg_name && results[0].order_item && results[0].order_id && results[0].item_id) {
        order_item= results[0].order_item;
        pg_id = results[0].pg_id;
        pg_name = results[0].pg_name;
        order_id=results[0].order_id;
        //order_quantity1= results[0].order_quantity;
        res.render('checkout',{order_id,id,pg_id,pg_name,order_item,item_id})

      }
            })
        }
      });
        


      } 

      else {
        console.error('Invalid results returned');
        return res.status(500).send('Error retrieving data');
      }
    
});
    }
 });


var id;
var user_type;
var name;
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
                user_type=results[0].user_type;
                name=results[0].name;
                //console.log(user_type)
                if(user_type=='PG')
                { 
                    req.session.pgid=id;

                    
        //console.log(vegQ1);
        res.render("dashboard",{nonvegQty:0,vegQty:0,orderQty:0,pending:0});


                    
        //console.log(vegQ1);
        //res.render("dashboard",{nonvegQty:nonvegQ1,vegQty:vegQ1});
    }

                    // res.sendFile(path.join(__dirname + "/views/index_pg.html"));

                // res.send("<h1>USer found</h1>")
                // console.log(results)
                //console.log(results[0].email)
                 else{
                    req.session.userid=id;
                    res.redirect(`/userprofile`);
                 }
               

            }
            else
            {
                res.send("<h1>USer not found</h1>")
                 
            }

        }});
   
})



app.get('/userprofile', (req, res) => {


    if(req.session.userid==undefined || req.session.userid=="")
    {
        res.redirect(`/login`);
    }

    else{
console.log(req.session.userid);
    
         id = req.session.userid;
        const qry1 = 'SELECT * FROM user LEFT JOIN orders1 ON orders1.user_id = user.id WHERE user.id =?';
        
        // console.log(id);
        mysql.query(qry1, [id], (error, results) => {
            // const name = results[0].name;
            // const email = results[0].email;
            if (error) throw error;
            else{
                if(results.length>0)
                {
                //console.log(results);
                res.render("userprofile", {msg:true, data: results,name:results[0].name,email:results[0].email});
            }
            else
            {
                const qry2='Select * from user where id =?';
                mysql.query(qry2, [id], (error, results1) => {
                //console.log(results1);
                res.render("userprofile", {msg:false});
                })
            }
            
            
        
       
            // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
        
     }
      })
    }
})


var review_descp;
// app.get("/feedback", (req, res) => {
//     //const email = req.query.email;
//     // console.log(email);
//     const qry3="Select * from reviews where user_id=?";
//     mysql.query(qry3,[id],(error, results) => {
//     console.log(results);
//      res.render("dashboard",{name:results[0].user_name,review_descp:results[0].review_descp})
//     })
// });

app.get("/update1", (req, res) => {
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
        if (error) throw error;
        else{
            res.sendFile(path.join(__dirname + "/views/updatesuccess.html"),{data: results})
            //res.render("updateprofile",{name,street:results[0].street,pincode:results[0].pincode,email:results[0].email,phone:results[0].phone,house:results[0].house,password:results[0].password})
        }
        //console.log(results[0].password1);
        
        
        })
});


app.get('/confirmation', (req, res) => {
    res.sendFile(__dirname + '/views/confirmation.html');
  });
  app.get('/delivery', (req, res) => {
    res.render('delivery', { title: 'Delivery' });
});

  
  app.get('/delivery/confirmation', function(req, res) {
    // Render the delivery confirmation page with the retrieved data
    res.render('delivery_confirmation', { title: 'Delivery Confirmation' });
});
  
  app.post('/delivery', (req, res) => {
    const { delivery_date, delivery_time, delivery_location } = req.body;

    // Fetch available delivery agent from database
    const getAgentQuery = `SELECT * FROM delivery_agents WHERE availability_status = 'Available' LIMIT 1`;
    mysql.query(getAgentQuery, (err, agentResults) => {
        if (err) throw err;

        if (agentResults.length > 0) {
            const agent = agentResults[0];
            const agentId = agent.agent_id;

            // Insert delivery into database
            const insertDeliveryQuery = `
                INSERT INTO delivery (user_id, agent_id, delivery_date, delivery_time, delivery_location)
                VALUES (?, ?, ?, ?, ?)
            `;
            // Replace user_id with actual value from user table or use an example value for now
            const userId = 1000001;
            const values = [userId, agentId, delivery_date, delivery_time, delivery_location];
            mysql.query(insertDeliveryQuery, values, (err, deliveryResult) => {
                if (err) throw err;

                console.log(deliveryResult);
                // Update agent's availability status in the database
                const updateAgentQuery = `UPDATE delivery_agents SET availability_status = 'On a Delivery' WHERE agent_id = ?`;
                mysql.query(updateAgentQuery, [agentId], (err, updateResult) => {
                    if (err) throw err;

                    // Render delivery confirmation view with delivery and agent details
                    const deliveryId = deliveryResult.insertId;
                    const delivery = {
                        id: deliveryId,
                        user_id: userId,
                        agent_id: agentId,
                        delivery_date: delivery_date,
                        delivery_time: delivery_time,
                        delivery_location: delivery_location
                    };
                    res.render('delivery_confirmation', { title: 'Delivery Confirmation', delivery, agent });
                });
            });
        } else {
            // Render error view if no available delivery agents
            res.render('error', { title: 'Error', message: 'No available delivery agents. Please try again later.' });
        }
    });
});
app.get('/delivery/confirmation', function(req, res) {
    // Render the delivery confirmation page with the retrieved data
    res.render('delivery_confirmation', { title: 'Delivery Confirmation' });
});

app.get('/pickup', (req, res) => {
    res.render('pickup', { title: 'Pickup' });
});
var pg_id;
app.post('/pickup', (req, res) => {
    const {pickup_date, pickup_time, pickup_location } = req.body;
    const qry5="Select pg_id from orders1 where user_id=?";
    mysql.query(qry5,[id],(err,results)=> {
        if (err) throw err;
        pg_id=results.pg_id;
        console.log(pg_id);
    })
    // Insert pickup details into MySQL
    const query = `INSERT INTO pickups (pg_id, pickup_date, pickup_time, pickup_location) VALUES (?, ?, ?, ?)`;
    mysql.query(query, [pg_id, pickup_date, pickup_time, pickup_location], (err, results) => {
        if (err) throw err;
        console.log('Pickup details inserted into MySQL:', results);

        // Redirect to pickup confirmation page
        res.redirect('/pickup/confirmation');
    });
});

app.get('/pickup/confirmation', (req, res) => {
    // Fetch pickup details from the database
    const query = `SELECT * FROM pickups ORDER BY pickup_id DESC LIMIT 1`; // Assuming id is the primary key of the pickups table
    mysql.query(query, (err, results) => {
        if (err) throw err;
        const pickup = results[0];


        console.log(results);
        // Render pickup confirmation view with pickup details
        res.render('pickup_confirmation', { title: 'Pickup Confirmation', pickup });
    });
});

app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname + "/views/feedback.html"))
});
var review;
app.post('/submitReview', (req, res) => {
    const { name, pgname, hearts } = req.body;
    review=req.body.review;
    // Insert the data into the "reviews" table
    const query = 'INSERT INTO reviews (user_name, pg_name, review_descp, no_of_hearts) VALUES (?, ?, ?, ?)';
    mysql.query(query, [name, pgname, review, hearts], (err, result) => {
        if (err) throw err;
        console.log('Review data inserted into the table:', result);
       const qry6="Select * from reviews where pg_name = ?"
       mysql.query(qry6, [pgname], (err, result) => {
        if (err) throw err;
        res.render("profile",{name:name,review:review});
       
       });
        // Redirect to the homepage after successful submission
        
    });
});

/*PG Dashboard*/

app.get('/dashboard',function(req,res){
    if(req.session.pgid==undefined || req.session.pgid=="")
    {
        res.redirect(`/login`);
    }
    else{

    
    //res.sendFile(path.join(__dirname+ "/views/dashboard.html"))
    const qry1 = 'SELECT * FROM items where pg_id=? and item_category="Non-veg meal"';
    const qry2 = 'SELECT * FROM items where pg_id=? and item_category="Veg meal"';
    let qry3 = "SELECT pg_id, COUNT(*) AS count FROM orders1 where pg_id = ?"
    let qry4 = "SELECT pg_id, COUNT(*) AS count FROM orders1 where pg_id = ? and delivery_status = 'pending';"
        // console.log(id);
        mysql.query(qry1,[id],(error, results1) => {
            if (error) throw error;
            else{
                nonvegQ1 = results1[0].quantity_available;
            
            }
            // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
        });

        mysql.query(qry2,[id],(error, results2) => {
            if(error) throw error;
            else{
                vegQ1 = results2[0].quantity_available;
            }
                
            // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
        });

        mysql.query(qry3,[id],(error, results2) => {
            if(error) throw error;
            else{
                ordersQ1 = results2[0].count;
            }
                
            // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
        });

        mysql.query(qry4,[id],(error, results2) => {
            if(error) throw error;
            else{
                pending1 = results2[0].count;
            }
                
            // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
        });

        //console.log(vegQ1);
        res.render("dashboard",{nonvegQty:nonvegQ1,vegQty:vegQ1,orderQty:ordersQ1,pending:pending1});
    }
});

// app.get('/profile_pg', (req, res) => {

// });


app.get('/orders_pg',function(req,res){
    
    // res.sendFile(path.join(__dirname+ "/views/orders.html"))
 
     const qry1 = 'SELECT * FROM orders1 where pg_id = ?';
         // console.log(id);
         mysql.query(qry1,[id],(error, results) => {
             if (error) throw error;
             else{
                 //  console.log(results);
                 res.render("orders", { data: results});
             }
        
             // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
         });
 });
 
app.get('/profile_pg',function(req,res){

    // id = req.params.id;
        const qry1 = 'SELECT * FROM pg WHERE pg_id =?';
        
        // console.log(id);
        mysql.query(qry1, [id], (error, results) => {
            // const name = results[0].name;
            // const email = results[0].email;
            if (error) throw error;
            else{
                if(results.length>0)
                {
                //console.log(results);
                res.render("profile", {pg_name:results[0].pg_name,pg_address:results[0].pg_address,pg_email:results[0].pg_email});
            }
            else
            {
               console.log("PG not found");
            }
     }
})
});

app.get("/update", (req, res) => {
    
    const veg=req.query.veg;
    const vegQty=req.query.vegQty;
    const nonveg=req.query.nonveg;
    const nonvegQty=req.query.nonvegQty;
    const nonvegQ = parseInt(nonvegQty);

let qry1 = "update items set quantity_available = "+vegQty+",item_description = ? where item_category = 'Veg meal' and pg_id = ?;";
let qry2 = "update items set quantity_available = "+nonvegQty+",item_description = ? where item_category = 'Non-veg meal' and pg_id = ?;";
mysql.query(qry1, [veg,id], (error, results) => {
    if (error) throw error;
    // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
});
mysql.query(qry2, [nonveg,id], (error, results) => {
    if (error) throw error;
    else
    {
        console.log("Successfully updated");
    }
    // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
});
res.redirect('/dashboard');

})


app.get("/insert_items",function (req, res){
    const category=req.query.category;
    const item_description=req.query.item_description;
    const quantity_available=req.query.quantity_available;
    const quantity=parseInt(quantity_available);
    const qry1="insert into items (item_description, item_category,pg_id,pg_name,quantity_available) values(?,?,?,?,?)";
    mysql.query(qry1,[item_description,category,id,name,quantity],(err,results) =>{
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting data');
          }
          else {
            console.log(results);
            //console.alert("Data inserted successfully!");
        }
    })
});

app.get("/done", (req, res) => {
    
    const orderid = req.query.id;

let qry1 = "update orders1 set delivery_status = 'completed' where order_id = ?;";
mysql.query(qry1,[orderid], (error, results) => {
    if (error) throw error;
    // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
});
const qry2 = 'SELECT * FROM orders1';
        // console.log(id);
        mysql.query(qry2,(error, results) => {
            if (error) throw error;
            else{
                //  console.log(results);
                res.render("orders", { data: results});
            }
       
            // res.sendFile(path.join(__dirname + "/views/userprofile.html"))
        });
})

app.listen(port,(err)=>{
    if(err)
    throw err
    else
    console.log("Server running at %d port",port)
})