INSERT INTO department (name)
VALUES
    ('Sales'),
    ('R&D'),
    ('Quality'),
    ("HR"),
    ('Executive Leadership');

INSERT INTO employee_role (title, salary, department_id)
VALUES
    ('Engineer', '85000','2'),
    ('Engineer', '90000','3'),
    ('Boss Man', '250000','5'),
    ('HR Specialist', '60000','4'),
    ('Salesman', '50000','1'),
    ('Engineer', '100000','2'),
    ('Jr. Engineer', '50000','2');

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES
    ('Tony','Busch',3,NULL),
    ('John','Smith',1,1),
    ('Larry','Johnson',2,1),
    ('Ben','Someone',4,1),
    ('Sarah','Smith',5,1),
    ('Charles','Doe',6,1),
    ('Tim','Random',7,1);