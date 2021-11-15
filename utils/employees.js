const db = require('../db/connection')

const viewAllEmployees = function(){
    return new Promise ((resolve, reject) => {
        db.query('SELECT * FROM employee', (err, row) => {
            if (err) {
                reject(err)
            }
            resolve({
                row
            }) 
        })
    })
};

module.exports = viewAllEmployees