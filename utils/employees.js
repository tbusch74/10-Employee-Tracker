const db = require('../db/connection')
const cTable = require('console.table');

const viewAllEmployees = function(){
    db.promise().query('SELECT * FROM employee')
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
module.exports = {viewAllEmployees, addEmployee}