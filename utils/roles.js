const db = require('../db/connection')

const viewAllRoles = function(){
    return new Promise ((resolve, reject) => {
    db.query('SELECT * FROM employee_role',async (err, row) => {
        if (err) {
            reject(err)
        }
        resolve({
            row
        }) 
    })
})
};

const addRole = function(roleName, roleSalary, roleDepartment){
    return new Promise ((resolve, reject) => {
        db.query('INSERT INTO employee_role (title, salary, department_id) VALUES (?,?,?)', [roleName,roleSalary,roleDepartment], (err, result) => {
            if (err) {
              reject(err)
            }
            resolve(
              
            )
          })
        })
      }


module.exports = {viewAllRoles, addRole}