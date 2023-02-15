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
const Role = require('./lib/role');
const Employee = require('./lib/employee');
const { Certificate } = require('crypto');

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
    const role = new Role(db);
    const employee = new Employee(db);
    inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menuChoice',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'exit'],
    },
  ])
  .then((data) => {
    const {menuChoice} = data;
    if (menuChoice === 'view all departments') {
        department.viewAllDepartments(db);
        init();
    }

    if (menuChoice === 'view all roles') {
      role.viewAllRoles(db);
      init();
    }

    if (menuChoice === 'view all employees') {
      employee.viewAllEmployees(db);
      init();
    }

    if (menuChoice === 'add a role') {
      inquirer
    .prompt([
      {
        type: 'input',
        message: "what is the role's title?",
        name: 'title',
      },
      {
        type: 'number',
        message: 'enter the salary for this role',
        name: 'salary',
      },
      {
        type: 'number',
        message: 'enter the department ID for this role',
        name: 'department_id',
      },
    ])
    .then((data) => {
      const { title, salary, department_id } = data;
      role.addRole(title, salary, department_id);
      init();
    });
    }

    if (menuChoice === 'exit') {
      exitApp();
    }
  });
}

const exitApp = () => {
  process.exit();
}

