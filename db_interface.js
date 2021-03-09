const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});


module.exports={
    connection,
    getEmployees : (callback) =>{
        const queryStr = "select * from employee";
        connection.query(queryStr,(err,res)=>{
            if(err) throw err;
            callback(res);
        })
    },

    getRoles : (callback) =>{
        const queryStr = "select * from role";
        connection.query(queryStr,(err,res)=>{
            if(err) throw err;
            callback(res);
        })
    }

}