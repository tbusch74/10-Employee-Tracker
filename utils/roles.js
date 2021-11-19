const db = require('../db/connection')
const cTable = require('console.table');

const addRole = function (roleName, roleSalary, roleDepartment){
    db.promise().query('INSERT INTO employee_role (title, salary, department_id) VALUES (?,?,?)', [roleName,roleSalary,roleDepartment])
    .then(() => {
        console.log(roleName + ' was added to the employee_role table');
        })
    .then(() => {
        viewAllRoles()
    })
}

const viewAllRoles = function(){
    db.promise().query('SELECT employee_role.id, employee_role.title, employee_role.salary, department.id FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id')
    .then(([rows]) => {
        console.log('')
        console.table(rows) 
    })
}

module.exports = {viewAllRoles, addRole}