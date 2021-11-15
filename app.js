const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const {viewAllDepartments, addDepartment} = require('./utils/departments')
const viewAllEmployees = require('./utils/employees')
const {viewAllRoles, addRole} = require('./utils/roles')

const startApp = function(){
  db.connect(async(err) => {
  if (err) throw err;
  await console.log('Database connected.');
  startPrompt()
  })
}
const startPrompt = () => {
  inquirer.prompt([
    {
    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
  ])
  .then(({action}) => {
    switch(action){
      case 'View all departments':
        viewAllDepartments()
        .then(row => {
          console.table(row.row);
          startPrompt()
        })
        break
      case 'View all roles':
        viewAllRoles()
        .then(row => {
          console.table(row.row);
          startPrompt()
        })
        break
      case 'View all employees':
        viewAllEmployees()
        .then(row => {
          console.table(row.row);
          startPrompt()
        })
        break
      case 'Add a department':
        inquirer.prompt([
          {
          type: 'input',
          name: 'departmentName',
          message: 'What is the department name that you would like to add?'
          }
        ])
        .then(({departmentName}) => {
          addDepartment(departmentName)
          console.log('Added ' + departmentName + ' to department table')
          startPrompt()
        })
        break
      case 'Add a role':
      viewAllDepartments()
      .then(row => {
        let choicesArr = []
        row.row.forEach(element => choicesArr.push(element)) 
        inquirer.prompt([
          {
          type: 'input',
          name: 'roleName',
          message: 'What is the role that you would like to add?'
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for this role?'
          },
          {
            type: 'rawlist',
            name: 'roleDepartment',
            message: 'What department is this role in?',
            choices: choicesArr
          }
        ])
        .then(() => {
          addRole({roleName}, {roleSalary}, {roleDepartment})
          console.log('Added ' + {roleName} + ' to the role table')
          startPrompt()
        })
      })
    break    
    }
  })
}

startApp();

module.exports = startPrompt