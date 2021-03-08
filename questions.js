const mainList = [
    "View all employees",
    "View employees by role",
    "View employees by manager",
    "View roles",
    "View departments",
    "Manage employees",
    "Manage organization"
]

const employeeList = [
    "Add employee",
    "Delete employee",
    "Update employee role",
    "Update employee manager"
]

const orgList = [
    "Add role",
    "Delete role",
    "Add department",
    "Delete department"
]


//TODO: reuse questions ffrom adding employee for the delete and update
const empInput = [
    {
        type:"number",
        name:"empl.id",
        message: answers=>{return `Which employee do you want to ${answers.empAct==='Delete employee' ? 'delete' : 'update'}?`},
        when: answers=>{return answers.empAct!=="Add employee"}
    },
    {
        type:"input",
        name:"empl.firstName",
        message: "Enter employee's first name:",
        when: answers=>{return answers.empAct==="Add employee"}
    },
    {
        type:"input",
        name:"empl.lastName",
        message: "Enter employee's last name:",
        when: answers=>{return answers.empAct==="Add employee"}
    },
    {
        type:"list",
        name:"empl.role",
        message: "Select employee's role:",
        choices: ["none"], //TODO: add function to get list from database
        when: answers=>{return answers.empAct==="Add employee" || answers.empAct==="Update employee role"}
    },
    {
        type:"list",
        name:"empl.manager",
        message: "Enter employee's manager:",
        choices: ["none"], //TODO: add function to get list from database
        when: answers=>{return answers.empAct==="Add employee" || answers.empAct==="Update employee manager"}
    }
]


const main =[
    {
        type:"list",
        name:"main",
        message: "What would you like to do?",
        choices: mainList
    },
    {
        type:"list",
        name:"empAct",
        message: "Select employee action",
        choices: employeeList,
        when: function(answers){return answers.main==="Manage employees"}
    },
    {
        type:"list",
        name:"orgAct",
        message: "Select organization action",
        choices: orgList,
        when: function(answers){return answers.main==="Manage organization"}
    }
]

module.exports = {
    main,
    empInput
}