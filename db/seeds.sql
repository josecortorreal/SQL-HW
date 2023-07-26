-- Insert department records
INSERT INTO department (id, dept_name) VALUES
(1, 'Researcher'),
(2, 'Development'),
(3, 'Finance');

-- Insert role records
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Manager', 100000, 2),
(2, 'Senior', 190000, 1),
(3, 'Accountant', 50000, 1);

-- Insert employee records
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Kenny', 'Rivera', 1, NULL),
(2, 'Luis', 'Molinuevo', 3, 1),
(3, 'Max', 'Callahan', 2, NULL);
