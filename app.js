
// const mysql = require('mysql'); //DEBUG. Might not need this here;
// require('dotenv').config();

const inquirer = require("inquirer");
const interface = require("./db_interface");
const questions = require("./questions");

async function launch(){

    let mainAnswers = await inquirer.prompt(questions.main);
    // console.log(mainAnswers); //DEBUG
    
    let data =''

    //TODO: pass mainAnsers to the next prompt. Remember you can add properties to the object before passing it along.
    switch (mainAnswers.main){
        case "Manage employees":
            data = await manageEmployees(mainAnswers);
            break;
        case "Manage organization":
            data = await manageOrganization(mainAnswers);
            break;
        case "View all employees":
            data = await interface.getEmployees();
            break;
        case "View employees by department":
            data = "This option is not yet available";
            break;
        case "View employees by manager":
            data = "This option is not yet available";
            break;
        case "View roles":
            data = await interface.getRoles();
            break;
        case "View departments":
            data = await interface.getDepartments();
            break;
        case "exit":
        default:
            interface.connection.end();
            return;
    }

    console.log();
    console.table(data);
    launch();
}


async function manageEmployees(answers){
    //TODO: get arrays for employees, roles and managers. add to answers object.
    //might be able to add the functions for these to the answers struct instead
    answers = await inquirer.prompt(questions.empInput,answers);
    let result = ''
    switch(answers.empAct){
        case "Add employee":
            result = answers;
            break;
        case "Delete employee":
            result = answers;
            break;
        case "Update employee role":
            result = answers;
            break;
        case "Update employee manager":
            result = answers;
            break;
    }
    return JSON.stringify(result);
}

async function manageOrganization(answers){
    //TODO: need arrays for roles and departments here. Add to answers object.
    //might be able to pass the functions to fetch these instead.
    answers.departments = async () => {
        let depts = await interface.getDepartments();
        depts = depts.map(dep => {return {value:dep.id, name:dep.name}});
        depts.unshift({value:-1,name:'cancel'});
        return depts;
    }
    answers = await inquirer.prompt(questions.orgInput,answers);
    let result = ''
    switch(answers.orgAct){
        case "Add role":
            result = answers;
            break;
        case "Delete role":
            result = answers;
            break;
        case "Add department":
            //TODO: get rid of callback here
            interface.addDepartment(answers.org.newDepartment, logAction); 
            result = answers;
            break;
        case "Delete department":
            //TODO: call interface here
            result = answers;
            break;
    }
    return JSON.stringify(result);
}

function  logAction(print){
    console.log();
    console.log(print);
    launch();
}

interface.connection.connect((err)=>{
    if(err) throw err;
    launch();
})