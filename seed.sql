USE empTracker;

INSERT INTO departments (name)

VALUES
    ('Human Resources'),
    ('Research'),
    ('Billing'),
    ('Sales');

INSERT INTO roles (title, salary, dept_id)
VALUES
    ('Manager', 200000, 1),
    ('Head Engineer', 150000, 1),
    ('Engineer', 120000, 4),
    ('Salesperson' 80000, 4),
    ('HR Rep' 75000, 3),
    
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Hermione', 'Granger', 1, NULL),
    ('Ronald', 'Weasley', 2, 1),
    ('Harry', 'Potter', 3, 1),
    ('')