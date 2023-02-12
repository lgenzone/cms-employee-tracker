// import the mysql client using mysql2
const mysql = require('mysql2');
// import inquirer 
const inquirer = require('inquirer');
// import console.table
require('console.table');
// require dotenv to secure password 
require('dotenv').config();
const fs = require('fs');
const db = require('./config/connection');
const Department = require('./lib/department');

/* query database 
db.query('SELECT', function (err, results) {
    console.log(results);
});
*/

db.connect(function(err) {
    if(err) {
      throw err
    }
    console.log('connected to db')
    init();
  })

function init () {
    console.log(`Connected to the business_db database.`)
    const department = new Department(db);
    inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menuChoice',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role' ],
    },
  ])
  .then((data) => {
    const {menuChoice} = data;
    if (menuChoice === 'view all departments') {
        
        department.viewAllDepartments(db);
    }
    
  });
  


};



