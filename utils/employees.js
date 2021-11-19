const db = require('../db/connection')
const cTable = require('console.table');

const viewAllEmployees = function(){
    db.promise().query('SELECT employee.id,employee.first_name,employee.last_name,employee_role.title as role,CONCAT(t1.first_name, " ",t1.last_name) as manager FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN employee t1 ON t1.id = employee.manager_id')
    .then(([rows]) => {
      console.log('')
      console.table(rows)
    })
}

const addEmployee = function (firstName, lastName, roleId, managerId){
    db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [firstName, lastName, roleId, managerId])
    .then(() => {
        console.log(firstName + ' ' + lastName + ' was added to the employee table');
        })
    .then(() => {
        viewAllEmployees()
    })
}

const editEmployeeRole = async function (employeeName,newRole){
    sql = 'UPDATE employee SET role_id = ' + newRole + ' WHERE ' + employeeName + '= id'
    await db.promise().query(sql)
    .then(async function() {
        sql = 'SELECT * FROM employee WHERE ' + employeeName + ' = id'
        await db.promise().query(sql)
        .then(function([rows]) {
            console.log(rows[0].first_name + ' ' + rows[0].last_name + ' had their role updated.')
            viewAllEmployees() 
        })
    })
    
}
module.exports = {viewAllEmployees, addEmployee, editEmployeeRole}