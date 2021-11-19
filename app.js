const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const {viewAllDepartments, addDepartment} = require('./utils/departments')
const {viewAllEmployees, addEmployee, editEmployeeRole} = require('./utils/employees')
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
          viewAllDepartments()
            startPrompt();
        break;

      case 'View all roles':
        viewAllRoles();
        startPrompt();
        break;

      case 'View all employees':
          viewAllEmployees()
          startPrompt();
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
          startPrompt();
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
              startPrompt();
            }) 
          })
        }
        rolePrompt()
        break;
      case 'Add an employee':
        async function addEmployeePrompt () {
          const roleInfo = await db.promise().query('SELECT * FROM employee_role')
          const managerInfo = await db.promise().query('SELECT * FROM employee')
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
            startPrompt()
          })   
        }
        addEmployeePrompt()
        break;
      case 'Update an employee role':
        async function updateEmployeePrompt(){
          const employeeInfo = await db.promise().query('SELECT * FROM employee')
          const roleInfo = await db.promise().query('SELECT * FROM employee_role')
          inquirer.prompt([
            {
              type: 'rawlist',
              name: 'editEmployee',
              message: "Whose role would you like to update",
              choices: (employeeInfo[0]).map((row) => ({ name: (row.first_name + ' ' + row.last_name), value: row.id }))
            },
            {
              type:'rawlist',
              name: 'editRole',
              message: 'What role do you want to assign to this employee?',
              choices: (roleInfo[0]).map((row) => ({ name: row.title, value: row.id }))
            }
          ])
          .then(({editEmployee,editRole}) => {
            editEmployeeRole(editEmployee,editRole)
          })
          .then(() => {
            startPrompt()
          })   
        }
        updateEmployeePrompt()
        break
    }
  }) 
}

startDb();

