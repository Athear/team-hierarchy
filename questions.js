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
        choices: employeeList,
        when: function(answers){return answers.main==="Manage organization"}
    }
]

module.exports = {main}