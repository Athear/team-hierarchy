const inquirer = require("inquirer");
const questions = require("./questions")

async function launch(){

    let mainAnswers = await inquirer.prompt(questions.main);
    // console.log(mainAnswers); //DEBUG
    

    //TODO: pass mainAnsers to the next prompt. Remember you can add properties to the object before passing it along.
    switch (mainAnswers.main){
        case "Manage employees":
            console.log("employee do");
            mainAnswers = await inquirer.prompt(questions.empInput,mainAnswers);
            break;
        case "Manage organization":
            console.log("org do");
            mainAnswers = await inquirer.prompt(questions.orgInput,mainAnswers);
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

    console.log(mainAnswers);

}

launch();