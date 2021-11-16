const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const {viewAllDepartments, addDepartment} = require('./utils/departments')
const {viewAllEmployees, addEmployee} = require('./utils/employees')
const {viewAllRoles, addRole} = require('./utils/roles')

const startDb = function(){
  db.connect(async(err) => {
  if (err) throw err;
  await console.log('Database connected.');
  startPrompt()
  })
}

const startPrompt = function() {
  inquirer.prompt([
    {
    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
  ])
  .then (({action}) => {
    switch(action){
      case 'View all departments':
          viewAllDepartments();
          nextPrompt();
        break;

      case 'View all roles':
        viewAllRoles();
        nextPrompt();
        break;

      case 'View all employees':
        viewAllEmployees();
        nextPrompt();
        break;

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
        })
        .then(() => {
          nextPrompt();
        })
        break;
      case 'Add a role':
        async function rolePrompt () {
          await db.promise().query('SELECT * FROM department')
          .then(([data]) => {
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
                choices: data.map((row) => ({ name: row.name, value: row.id })),
              }
            ])   
            .then(({roleName, roleSalary, roleDepartment}) => {
              addRole(roleName, roleSalary, roleDepartment)
            })
            .then(() => {
              nextPrompt();
            }) 
          })
        }
        rolePrompt()
        break;
      case 'Add an employee':
        async function employeePrompt () {
          const roleInfo = await db.promise().query('SELECT * FROM employee_role')
          console.log(roleInfo[0])
          const managerInfo = await db.promise().query('SELECT * FROM employee')
          console.log(managerInfo[0])
          inquirer.prompt([
            {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the first name of the employeee you would like to add?'
            },
            {
              type: 'input',
              name: 'employeeLastName',
              message: 'What is the last name of the employeee you would like to add?'
            },
            {
              type: 'rawlist',
              name: 'role',
              message: 'What role is this employee in?',
              choices: (roleInfo[0]).map((row) => ({ name: row.title, value: row.id }))
            },
            {
              type: 'rawlist',
              name: 'manager',
              message: "Who is this employees's manager?",
              choices: (managerInfo[0]).map((row) => ({ name: (row.first_name + ' ' + row.last_name), value: row.id })),
            }
          ])
          .then(({employeeFirstName, employeeLastName, role, manager}) => {
            addEmployee(employeeFirstName, employeeLastName, role, manager)
          })
          .then(() => {
            nextPrompt()
          })   
        }
      employeePrompt()
      break
    }
  })
}
const nextPrompt = function() {
  startPrompt()
}
startDb();

module.exports = nextPrompt