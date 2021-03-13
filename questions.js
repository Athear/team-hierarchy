const mainList = [
    "View all employees",
    "View employees by department",
    "View employees by manager",
    "View roles",
    "View departments",
    "Show budget by department",
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
        type:"number",
        name:"org.newRoleMoney",
        message: "Enter base salary",
        when: answers=>{return answers.orgAct==="Add role"}
    },
    {
        type:"list",
        name:"org.newRoleDepartment",
        message: "Which department does this role belong to?",
        choices: async answers=>{
            let depts = await answers.departments();
            depts = depts.map(dep => {return {value:dep.id, name:dep.name}});
            return depts;
        },
        when: answers=>{return answers.orgAct==="Add role"},
        loop: false
    },
    {
        type:"list",
        name:"org.removeRole",
        message: "Select the role to be deleted.",
        choices: async answers=>{
            let roles = await answers.roles();
            roles = roles.map(role => {return {value:role.id, name:role.title}});
            roles.unshift({value:-1,name:'cancel'});
            return roles;
        },
        when: answers=>{return answers.orgAct==="Delete role"},
        loop: false
    },
    {
        type:"input",
        name:"org.newDepartment",
        message: "Enter new department name.",
        when: answers=>{return answers.orgAct==="Add department"}
    },
    {
        type:"list",
        name:"org.removeDepartment",
        message: "Select the department to be deleted.",
        choices: async answers=>{
            let depts = await answers.departments();
            depts = depts.map(dep => {return {value:dep.id, name:dep.name}});
            depts.unshift({value:-1,name:'cancel'});
            return depts;
        },
        when: answers=>{return answers.orgAct==="Delete department"},
        loop: false
    }
]

const empInput = [
    {
        type:"list",
        name:"empl.id",
        message: answers=>{return `Which employee do you want to ${answers.empAct==='Delete employee' ? 'delete' : 'update'}?`},
        choices: async answers=>{
            let employees = await answers.employees();
            employees = employees.map(worker => {return {value:worker.id, name:worker.first_name+' '+worker.last_name}});
            employees.unshift({value:-1,name:'cancel'});
            return employees;
        },
        when: answers=>{return answers.empAct!=="Add employee"},
        loop:false
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
        choices: async answers=>{
            let roles = await answers.roles();
            roles = roles.map(role => {return {value:role.id, name:role.title}});
            return roles;
        },
        when: answers=>{return answers.empAct==="Add employee" || answers.empAct==="Update employee role"},
        loop:false
    },
    {
        type:"list",
        name:"empl.manager",
        message: "Enter employee's manager:",
        choices: async answers=>{
            let mans = await answers.managers();
            mans = mans.map(manager => {return {value:manager.id, name:manager.first_name+' '+manager.last_name}});
            mans.unshift({value:-1,name:'none'});
            return mans;
        },
        when: answers=>{return answers.empAct==="Add employee" || answers.empAct==="Update employee manager"},
        loop:false
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
    },
    {
        type:"list",
        name:"manView",
        message: "Select organization action",
        choices: async answers=>{
            let mans = await answers.managers();
            return mans.map(manager => {return {value:manager.id, name:manager.first_name+' '+manager.last_name}});
        },
        when: function(answers){return answers.main==="View employees by manager"}
    }
]

module.exports = {
    main,
    empInput,
    orgInput
}