
// const mysql = require('mysql'); //DEBUG. Might not need this here;
// require('dotenv').config();

const inquirer = require("inquirer");
const interface = require("./db_interface");
const questions = require("./questions");

async function launch(){

    let mainAnswers = await inquirer.prompt(questions.main);
    // console.log(mainAnswers); //DEBUG
    

    //TODO: pass mainAnsers to the next prompt. Remember you can add properties to the object before passing it along.
    switch (mainAnswers.main){
        case "Manage employees":
            await manageEmployees(mainAnswers);
            break;
        case "Manage organization":
            await manageOrganization(mainAnswers);
            break;
        case "View all employees":
            showTable(await interface.getEmployees());
            break;
        case "View employees by department":
            logAction("This option is not yet available");
            break;
        case "View employees by manager":
            logAction("This option is not yet available");
            break;
        case "View roles":
            interface.getRoles(showTable);
            break;
        case "View departments":
            interface.getDepartments(showTable);
            break;
        case "exit":
        default:
            interface.connection.end();
            break;
    }

}


async function manageEmployees(answers){
    //TODO: get arrays for employees, roles and managers. add to answers object.
    //might be able to add the functions for these to the answers struct instead
    answers = await inquirer.prompt(questions.empInput,answers);
    switch(answers.empAct){
        case "Add employee":
            logAction(answers);
            break;
        case "Delete employee":
            logAction(answers);
            break;
        case "Update employee role":
            logAction(answers);
            break;
        case "Update employee manager":
            logAction(answers);
            break;
    }
}

async function manageOrganization(answers){
    //TODO: need arrays for roles and departments here. Add to answers object.
    //might be able to pass the functions to fetch these instead.
    answers = await inquirer.prompt(questions.orgInput,answers);
    switch(answers.orgAct){
        case "Add role":
            logAction(answers);
            break;
        case "Delete role":
            logAction(answers);
            break;
        case "Add department":
            interface.addDepartment(answers.org.newDepartment, logAction);
            logAction(answers);
            break;
        case "Delete department":
            logAction(answers);
            break;
    }
}

function showTable(res){
    console.log();
    console.table(res);
    launch();
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