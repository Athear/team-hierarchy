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

    getManagers : async () =>{
        const queryStr = "select * from employee where manager_id is null";
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

    updateEmployee : (target,targetID,empID)=>{
        const queryStr = "UPDATE employee SET ? WHERE ?"
        const setObj={};
        if(target==='role')
        {
            setObj.role_id=targetID
        }else if(target==='manager')
        {
            setObj.manager_id=targetID
        }
        //else{setObj[target]=targetID}
        return updaterPromise(queryStr,[setObj,{id:empID}],`Employee ${target} updated`)
    },

    addEmployee : (firstName,lastName,role,manager)=>{
        employeeObj = {
            first_name:firstName,
            last_name:lastName,
            role_id:role
        };
        if(manager>=0){
            employeeObj.manager_id=manager;
        }
        const queryStr = "INSERT INTO employee SET ?";
        return updaterPromise(queryStr,employeeObj,`Hired ${firstName} ${lastName}`)        

    },

    addRole : (title,salary,department) =>{
        const queryStr = "INSERT INTO role SET ?";
        return updaterPromise(queryStr,{title:title, salary:salary,department_id:department},`Added ${title} role`)
    },

    addDepartment : (newName) =>{
        const queryStr = "INSERT INTO department SET ?";
        return updaterPromise(queryStr,{name:newName},`Added ${newName} department`)
    },


    removeEmployee : (id) =>{
        const queryStr = "DELETE FROM employee WHERE ?";
        return updaterPromise(queryStr,{id:id},'Removed employee');
    },

    removeRole : (id) =>{
        const queryStr = "DELETE FROM role WHERE ?";
        return updaterPromise(queryStr,{id:id},'Removed role');
    },

    removeDepartment : (id) =>{
        const queryStr = "DELETE FROM department WHERE ?";
        return updaterPromise(queryStr,{id:id},'Removed department');
    },

    prettyEmployees : () =>{
        const queryStr = `select e.first_name,e.last_name,r.title,d.name as department, r.salary,CONCAT(m.first_name," ",m.last_name) as manager
        from employee e
        left join employee m on e.manager_id = m.id
        inner join role r on e.role_id = r.id
        inner join department d on r.department_id = d.id`;
        return getterPromise(queryStr);
    },

    prettyRoles: () =>{
        const queryStr = `select r.title,r.salary,d.name as department from role r
        inner join department d on r.department_id = d.id`
        return getterPromise(queryStr);
    }

}