const mysql = require('mysql');
require('dotenv').config();

module.exports={

    connection : mysql.createConnection({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,

        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }),

    viewEmployees : (connection,callback) =>{
        const queryStr = "select * from employee";
        connection.query(queryStr,(err,res)=>{
            if(err) throw err;
            console.log();
            console.table(res);
            callback();
        })
    }

}