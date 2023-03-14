const mysql = require("mysql") //module import
const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "admin",
    database: "mealmate",
    port: 3306
});//function to connect with database


con.connect((err) => {
    if (err) throw err;
    else
    console.log("Connection created..!!");
});

module.exports.con = con;