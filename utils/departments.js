const db = require('../db/connection')

const viewAllDepartments = function(){
  return new Promise ((resolve, reject) => {
    db.query('SELECT * FROM department', (err, row) => {
        if (err) {
          reject(err)
        }
        resolve({
          row
        }) 
    })
  })
};

const addDepartment = function(departmentName){
  return new Promise ((resolve, reject) => {
    db.query('INSERT INTO department (name) VALUES (?)', departmentName, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(
        
      )
    })
  })
}

module.exports = {viewAllDepartments, addDepartment}