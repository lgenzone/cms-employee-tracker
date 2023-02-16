
INSERT INTO department (name)
VALUES 
('Marketing'),
('Finance'),
('Operations Management'),
('Human Resources (HR)'), 
('Information Technology (IT)');


INSERT INTO role (title, salary, department_id)
VALUES 
('Marketing Specialist', 75000, 1),
('Financial Analyst', 150000, 2),
('Operations Manager', 120000, 3),
('HR Coordinator', 80000, 4), 
('IT Technician', 65000, 5);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES 
("Smith", "Mary", 1, 2),
("Johnson", "Steve", 2, NULL),
("Miller", "Nick", 3, 4),
("Jones", "Sarah", 5, NULL),
("Clark", "Taylor", 7, NULL);