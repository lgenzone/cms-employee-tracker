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
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add employee', 'update employee role', 'exit'],
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

    if (menuChoice === 'add a department') {
      inquirer
    .prompt([
      {
        type: 'input',
        message: "what is the name of the department?",
        name: 'name',
      },
    ])
    .then((data) => {
      const { name, id } = data;
      department.addDepartment(name, id);
      init();
    });
    }

    if (menuChoice === 'add a role') {
      inquirer
    .prompt([
      {
        type: 'input',
        message: "what is the name of the role?",
        name: 'title',
      },
      {
        type: 'number',
        message: 'what is the salary of the role?',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'which department does the role belong to?',
        choices: ['Marketing', 'Finance', 'Operations Management', 'Human Resources (HR)', 'Information Technology (IT)'],
        name: 'department',
      },
    ])
    .then((data) => {
      const { title, salary, department_id } = data;
      role.addRole(title, salary, department_id);
      init();
    });
    }

    if (menuChoice === 'add employee') {
      inquirer
      .prompt([
        {
          type: 'input',
          message: `What is the employee's first name?`,
          name: 'first_name',
        },
        {
          type: 'input',
          message: `what is the employee's last name?`,
          name: 'last_name',
        }, 
        {
          type: 'list',
          message: `what is the employee's role?`,
          name: 'role_id',
          choices: () => {
            return new Promise((resolve, reject) => {
              db.query('SELECT id, title FROM role', (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results.map(row => ({ name: row.title, value: row.id })));
                }
              });
            });
          }

        },
        {
          type: 'list',
          message: `who is this employee's manager?`,
          name: 'manager_id',
          choices: () => {
            return new Promise((resolve, reject) => {
              const query = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee WHERE manager_id IS NULL';
              db.query(query, (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  const choices = results.map(row => ({ name: row.name, value: row.id }));
                  choices.unshift({ name: 'None', value: null }); // add 'none' option at the beginning
                  resolve(choices);
                }
              });
            });
          }
        },
      ])
      .then((data) => {
        const { first_name, last_name, role_id, manager_id } = data;
        employee.addEmployee(first_name, last_name, role_id, manager_id);
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

