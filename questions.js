const mainList = [
    "View all employees",
    "View employees by department",
    "View employees by manager",
    "View roles",
    "View departments",
    "Manage employees",
    "Manage organization",
    "exit"
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

const orgInput =[
    {
        type:"input",
        name:"org.newRole",
        message: "Enter new role name",
        when: answers=>{return answers.orgAct==="Add role"}
    },
    {
        type:"list",
        name:"org.removeRole",
        message: "Select the role to be deleted. Only roles with no associated employees may be deleted.",
        choices: ["cancel"], //TODO: add function to get list from database
        when: answers=>{return answers.orgAct==="Delete role"}
    },
    {
        type:"input",
        name:"org.newDepartment",
        message: "Enter new department name",
        when: answers=>{return answers.orgAct==="Add department"}
    },
    {
        type:"list",
        name:"org.removeDepartment",
        message: "Select the department to be deleted. Only departments with no associated roles may be deleted.",
        choices: async answers=>{return await answers.departments()},
        when: answers=>{return answers.orgAct==="Delete department"},
        loop: false
    }
]

const empInput = [
    {
        type:"list",
        name:"empl.id",
        message: answers=>{return `Which employee do you want to ${answers.empAct==='Delete employee' ? 'delete' : 'update'}?`},
        choices: ["cancel"], //TODO: add function to get list from database
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
        choices: mainList,
        pageSize: 4,
        loop: false
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
    empInput,
    orgInput
}