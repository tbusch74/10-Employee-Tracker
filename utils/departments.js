const db = require('../db/connection');
const cTable = require('console.table');


const addDepartment = function (departmentName){
  db.promise().query('INSERT INTO department (name) VALUES (?)', departmentName)
  .then(() => {
    console.log(departmentName + ' was added to the department table');
    })
  .then(() => {
    viewAllDepartments()
  })
}

const viewAllDepartments = function(){
  db.promise().query('SELECT * FROM department')
  .then(([rows]) => {
    console.log('')
    console.table(rows) 
  })
}



module.exports = {viewAllDepartments, addDepartment}