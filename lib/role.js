const mysql = require('mysql2');

class Role {
    constructor(db) {
      this.db = db;
    }
  
    viewAllRoles() {
      this.db.query('SELECT * FROM role', (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        console.table(results);
      });
    }
    
  
    addRole(title, salary, departmentId) {
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const params = [title, salary, departmentId];
      this.db.query(sql, params, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(`${result.affectedRows} role added!\n`);
      });
    }
  }
  
  module.exports = Role;
  
