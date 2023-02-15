const mysql = require('mysql2');

class Department {
    constructor (db) {
        this.db = db;
    }

    viewAllDepartments() {
        //console.log('working') //TO DO: add db.query
        this.db.query('SELECT name FROM department', (error, results) => {
            if (error) {
              console.error(error);
              return;
            }
            //console.log('working')
            console.log(results);
          });
    }
}

module.exports = Department;