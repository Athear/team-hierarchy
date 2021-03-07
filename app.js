const inquirer = require("inquirer");
const questions = require("./questions")

async function launch(){

    let mainAnswers = await inquirer.prompt(questions.main);
    console.log(mainAnswers);
}

launch();