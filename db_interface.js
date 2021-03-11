const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

const getterPromise = (query) =>{
    return new Promise((resolve,reject)=>{
        connection.query(query,(err,res)=>{
            if(err){
                reject(new Error(err));
            }else{
                resolve(res);
            }
        })
    });
}


module.exports={
    connection,
    getEmployees : async () =>{
        const queryStr = "select * from employee";
        return getterPromise(queryStr);
    },

    getRoles : (callback) =>{
        const queryStr = "select * from role";
        connection.query(queryStr,(err,res)=>{
            if(err) throw err;
            callback(res);
        })
    },

    getDepartments : async (callback) =>{
        const queryStr = "select * from department";
        connection.query(queryStr,(err,res)=>{
            if(err) throw err;
            return callback(res);
        })
    },

    addDepartment : (newName,callback) =>{
        const queryStr = "INSERT INTO department SET ?";
        connection.query(queryStr,
            {name:newName},
            (err,res)=>{
                if(err) throw err;
                let retStr = `Added ${newName} department`;
                callback(retStr);
            }
        );
    },

    removeDepartment : (newName,callback) =>{
        const queryStr = "DELETE FROM department SET ?";
        connection.query(queryStr,
            {name:newName},
            (err,res)=>{
                if(err) throw err;
                let retStr = `Removed ${newName} department`;
                callback(retStr);
            }
        );
    }

}