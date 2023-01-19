DROP DATABASE IF EXISTS business_db; 

CREATE DATABASE business_db;
USE business_db;

CREATE TABLE department (
    id INT NOT NULL, 
    name VARCHAR(30),
    PRIMARY KEY (id)
);
 
 -- create new table for 'role' --
CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- create new table for 'employee' -- 
