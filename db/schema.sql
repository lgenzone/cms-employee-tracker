-- if this database already exists, delete it --
DROP DATABASE IF EXISTS business_db; 
-- create new database titled 'business'
CREATE DATABASE business_db;
-- select created tab;e --
USE business_db;

-- create new table for 'department'
CREATE TABLE department (
    -- give unique id and set primary key --
    id INT PRIMARY KEY,
    -- hold department name (max 30 characters) --
    name VARCHAR (30)
);
 
 -- create new table for 'role'
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL
);

-- create new table for 'employee'
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    -- null if the employee has no manager --
    manager_id: INT
);