const inquirer = require("inquirer");
const questions = require("./questions")

async function launch(){

    let mainAnswers = await inquirer.prompt(questions.main);
    // console.log(mainAnswers); //DEBUG
    
    switch (mainAnswers.main){
        case "Manage employees":
            console.log("employee do");
            break;
        case "Manage organization":
            console.log("org do");
            break;
        case "View all employees":
            console.log("view all");
            break;
        case "View employees by role":
            console.log("view by role");
            break;
        case "View employees by manager":
            console.log("view by man");
            break;
        case "View roles":
            console.log("view roles");
            break;
        case "View departments":
            console.log("view deps");
            break;
        default:
            console.log("unreachable?");
    }

}

launch();