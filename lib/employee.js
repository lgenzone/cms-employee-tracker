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

    addEmployee(firstName, lastName, roleId, managerId) {
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const params = [firstName, lastName, roleId, managerId];
      this.db.query(sql, params, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(`${result.affectedRows} employee added!\n`);
      });
    }
}

module.exports = Employee;
