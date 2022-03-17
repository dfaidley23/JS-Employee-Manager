INSERT INTO department (id, name)
VALUES
    (001, "Accounting"),
    (002, "I.T."),
    (003, "Sales"),
    (004, "Engineering");

SELECT * FROM department;

INSERT INTO managers (id, managers_department, name, department_id)
VALUES
    (001, "Accounting Manager", 'Marge Simpson',001),
    (002, "I.T. Manager", 'Jimmy Jam', 002),
    (003, "Sales Manager", 'Sue Sa', 003),
    (004, "Engineering Manager", 'Dan Ins', 004);

SELECT * FROM managers;

INSERT INTO role (id, title, salary, department_id)
VALUES
    (001, 'Accountant', '30.00', 001),
    (002, 'Sys Admin', '35.00', 002),
    (003, 'Software Engineer', '70.00', 004),
    (004, 'Sales Rep', '20.00', 003),
    (005, 'Service Desk', '20.00', 002);


SELECT * FROM role;

INSERT INTO employees (id, first_name, last_name, role_id, managers_id)
VALUES
    (001, 'David', 'Faidley', 004, 004),
    (002, 'Dan', 'Ins', 004, 004),
    (003, 'Sue', 'Sa', 003, 003),
    (004, 'Mike', 'Jay', 003, 003),
    (005, 'John', 'Doe', 003, 003),
    (006, 'Joe', 'Doe', 002, 002),
    (007, 'Jimmy', 'Jam', 002, 002),
    (008, 'Sally', 'Silly', 002, 002),
    (009, 'Tina', 'Rina', 002, 002),
    (010, 'Lou', 'Do', 004, 004),
    (011, 'Homer', 'Simpson', 001, 001),
    (012, 'Marge', 'Simpson', 001, 001),
    (013, 'Bart', 'Simpson', 001, 001),
    (014, 'Lisa', 'Simpson', 004, 004),
    (015, 'Maggie', 'Simpson', 004, 004),
    (016, 'Ashley', 'Sampson', 002, 002),
    (017, 'Jake', 'Snake', 003, 003),
    (018, 'Al', 'Capone', 004, 004),
    (019, 'Phill', 'Still', 001, 001),
    (020, 'Vroon', 'Flowers', 004, 004);

SELECT * FROM employees;