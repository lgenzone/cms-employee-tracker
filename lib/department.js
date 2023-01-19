const mysql = require('mysql2');

class Department {
    constructor (db) {
        this.db = db;
    }

    viewAllDepartments() {
        console.log('display all departments') //db.query act 22 (SQL)
    }
}

module.exports = Department;