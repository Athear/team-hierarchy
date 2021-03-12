const mysql = require('mysql');
require('dotenv').config();

//TODO: this would be better split into classes. That would take a fair bit of refactoring though.

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

const updaterPromise = (query,params,retStr)=>{
    return new Promise((resolve,reject)=>{
        connection.query(query,params,(err,res)=>{
            if(err){
                reject(new Error(err));
            }else{
                resolve(retStr);
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

    getRoles : async () =>{
        const queryStr = "select * from role";
        return getterPromise(queryStr);
    },

    getDepartments : async () =>{
        const queryStr = "select * from department";
        return getterPromise(queryStr);
    },

    addDepartment : (newName) =>{
        const queryStr = "INSERT INTO department SET ?";
        return updaterPromise(queryStr,{name:newName},`Added ${newName} department`)
    },

    removeDepartment : (id) =>{
        const queryStr = "DELETE FROM department WHERE ?";
        return updaterPromise(queryStr,{id:id},'Removed department');
    }

}