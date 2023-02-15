const mysql = require('mysql2');

class Employee {
    constructor (db) {
        this.db = db;
    }

    viewAllEmployees() {
        this.db.query('SELECT last_name, first_name, role_id, manager_id FROM employee', (error, results) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(results);
          });
    }
}

module.exports = Employee;
