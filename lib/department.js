const mysql = require('mysql2');

class Department {
    constructor (db) {
        this.db = db;
    }

    viewAllDepartments() {
      const query = 'SELECT * FROM department';
      this.db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    }
  

    addDepartment(name, callback) {
      const sql = 'INSERT INTO department (name) VALUES (?)';
      const params = [name];
      this.db.query(sql, params, callback);
    }
    
}

module.exports = Department;