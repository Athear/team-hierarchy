const inquirer = require("inquirer");
const interface = require("./db_interface");
const questions = require("./questions");

async function launch(){

    let mainAnswers = {
        departments : interface.getDepartments,
        roles : interface.getRoles,
        managers : interface.getManagers,
        employees : interface.getEmployees
    }

    mainAnswers = await inquirer.prompt(questions.main,mainAnswers);

    let data =''

    switch (mainAnswers.main){
        case "Manage employees":
            data = await manageEmployees(mainAnswers);
            break;
        case "Manage organization":
            data = await manageOrganization(mainAnswers);
            break;
        case "View all employees":
            data = await interface.prettyEmployees();
            break;
        case "View employees by manager":
            data = await interface.prettyEmployees(mainAnswers.manView);
            break;
        case "View roles":
            data = await interface.prettyRoles();
            break;
        case "View departments":
            data = await interface.getDepartments();
            break;
        case "Show budget by department":
            data = await interface.getBudget();
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
    answers = await inquirer.prompt(questions.empInput,answers);
    let result = ''
    switch(answers.empAct){
        case "Add employee":
            result = await interface.addEmployee(answers.empl.firstName,answers.empl.lastName,answers.empl.role,answers.empl.manager);
            break;
        case "Delete employee":
            if(answers.empl.id>=0){
                result = await interface.removeEmployee(answers.empl.id);
            }else{
                result = 'cancelled';
            }
            break;
        case "Update employee role":
            result = await interface.updateEmployee('role',answers.empl.role,answers.empl.id);
            break;
        case "Update employee manager":
            const managerId = answers.empl.manager>=0 ? answers.empl.manager : null
            result = await interface.updateEmployee('manager',managerId,answers.empl.id);
            break;
    }
    return JSON.stringify(result);
}

async function manageOrganization(answers){
    answers = await inquirer.prompt(questions.orgInput,answers);
    let result = ''
    switch(answers.orgAct){
        case "Add role":
            result = await interface.addRole(answers.org.newRole,answers.org.newRoleMoney,answers.org.newRoleDepartment)
            break;
        case "Delete role":
            if(answers.org.removeRole>=0){
                result = await interface.removeRole(answers.org.removeRole);
            }else{
                result = 'cancelled';
            }
            break;
        case "Add department":
            result = await interface.addDepartment(answers.org.newDepartment); 
            break;
        case "Delete department":
            if(answers.org.removeDepartment>=0){
                result = await interface.removeDepartment(answers.org.removeDepartment);
            }else{
                result = 'cancelled';
            }
            break;
    }
    return JSON.stringify(result);
}

interface.connection.connect((err)=>{
    if(err) throw err;
    launch();
})