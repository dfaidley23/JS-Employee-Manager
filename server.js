const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connecting to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'CasaNova123!@#',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// Inquirer questions
const questions = {
    allEmployees: "View All Employees",
    allDepartments: "View All Employees By Department",
    allManagers: "View All Employees By Manager",
    allRoles: "View All Roles",
    addEmployee: "Add An Employee",
    exit: "Exit"
};

function choices() {
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            questions.allEmployees,
            questions.allDepartments,
            questions.allManagers,
            questions.allRoles,
            questions.addEmployee,
            questions.exit
        ]
    })
    .then(selection => {
        console.log('Selection', selection);
        switch (selection.choice) {
            case questions.allEmployees:
                allEmployees();
                break;

            case questions.allDepartments:
                allDepartments();
                break;

            case questions.allManagers:
                allManagers();
                break;

            case questions.allRoles:
                allRoles();
                break;

            case questions.addEmployee:
                addEmployee();
                break;

            case questions.exit:
                db.end();
                break;
        }
    });
};

function allEmployees() {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, FROM employees`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        choices();
    });
};

function allDepartments() {
    const query = `SELECT department.id role.id, employees.id, employees.first_name, employees.last_name FROM employees;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('\n');
        console.table(res);
        choices();
    });
};


function allManagers() {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, role.id FROM employees;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY MANAGER');
        console.log('\n');
        console.table(res);
        choices();
    });
};

function allRoles() {
    const query = `SELECT role.id, employees.id, employees.first_name, employees.last_name, department.id FROM employees;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY ROLE');
        console.log('\n');
        console.table(res);
        choices();
    });

};

async function addEmployee() {
    const addname = await inquirer.prompt(askName());
    db.query('SELECT role.id FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the employees role?: '
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        db.query('SELECT * FROM employees', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.first_name} ${res.last_name}`);
            choices.push('none');
            let { manager } = await inquirer.prompt([
                {
                    name: 'manager',
                    type: 'list',
                    choices: choices,
                    message: 'Choose the employees Manager: '
                }
            ]);
            let managersID;
            let managerName;
            if (manager === 'none') {
                managersID = null;
            } else {
                for (const data of res) {
                    data.fullName = `${data.first_name} ${data.last_name}`;
                    if (data.fullName === manager) {
                        managersID = data.id;
                        managerName = data.fullName;
                        console.log(managersID);
                        console.log(managerName);
                        continue;
                    }
                }
            }
            console.log('Employee has been added. Please view all employees to verify...');
            db.query(
                'INSERT INTO employees SET ?',
                {
                    first_name: addname.first,
                    last_name: addname.last,
                    role_id: roleId,
                    manager_id: parseInt(managersID)
                },
                (err, res) => {
                    if (err) throw err;
                    choices();

                }
            );
        });
    });

};

function askName() {
    return ([
        {
            name: "first",
            type: "input",
            message: "Enter the first name: "
        },
        {
            name: "last",
            type: "input",
            message: "Enter the last name: "
        }
    ]);
}

// db.query('SELECT * FROM department', function (err, results) {
//     console.table(results);
// });

// db.query('SELECT * FROM managers', function (err, results) {
//     console.table(results);
// });

// db.query('SELECT * FROM role', function (err, results) {
//     console.table(results);
// });

// db.query('SELECT * FROM employeess', function (err, results) {
//     console.table(results);
// });

choices();