const mysql = require('mysql2');

class Role {
    constructor (db) {
        this.db = db;
    }

    viewAllRoles() {
        //console.log('working') //TO DO: add db.query
        this.db.query('SELECT * FROM role', (error, results) => {
            if (error) {
              console.error(error);
              return;
            }
            //console.log('working')
            console.log(results);
          });
    }
}

module.exports = Role;
