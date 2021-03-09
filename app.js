
// const mysql = require('mysql'); //DEBUG. Might not need this here;
// require('dotenv').config();

const inquirer = require("inquirer");
const questions = require("./questions");
const interface = require("./db_interface");

async function launch(){

    let mainAnswers = await inquirer.prompt(questions.main);
    // console.log(mainAnswers); //DEBUG
    

    //TODO: pass mainAnsers to the next prompt. Remember you can add properties to the object before passing it along.
    switch (mainAnswers.main){
        case "Manage employees":
            mainAnswers = await inquirer.prompt(questions.empInput,mainAnswers);
            break;
        case "Manage organization":
            mainAnswers = await inquirer.prompt(questions.orgInput,mainAnswers);
            break;
        case "View all employees":
            interface.getEmployees(showTable);
            break;
        case "View employees by role":
            console.log("This option is not yet available");
            break;
        case "View employees by manager":
            console.log("This option is not yet available");
            break;
        case "View roles":
            interface.getRoles(showTable);
            break;
        case "View departments":
            console.log("This option is not yet available");
            break;
        case "exit":
        default:
            console.log("Exit application is not available");
    }

    console.log(mainAnswers);
    //TODO: add additional inquierer response for exiting application
    launch();
}

function showTable(res){
    console.log();
    console.table(res);
    launch();
}

interface.connection.connect((err)=>{
    if(err) throw err;
    launch();
})