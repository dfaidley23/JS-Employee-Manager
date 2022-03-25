const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

// Connecting to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// Inquirer questions
const questions = {
    allEmployees: "View All Employees",
    allDepartments: "View All Employees By Department",
    allManagers: "View All Employees By Manager",
    allRoles: "View All Employess By Roles",
    viewManagers: "View All Managers",
    viewDepartments: "View All Departments",
    viewRoles: "View All Roles",
    addEmployee: "Add An Employee",
    updateRole: "Update an Employee Role",
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
            questions.viewManagers,
            questions.viewDepartments,
            questions.viewRoles,
            questions.addEmployee,
            questions.updateRole,
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

            case questions.viewManagers:
                viewManagers();
                break;

            case questions.viewDepartments:
                viewDepartments();
                break;

            case questions.viewRoles:
                viewRoles();
                break;

            case questions.addEmployee:
                addEmployee();
                break;

            case questions.updateRole:
                updateRole();
                break;

            case questions.exit:
                db.end();
                console.log('Bye');
                break;
        }
    });
};

function allEmployees() {
    const query = `SELECT * FROM employees`;
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
    // const query = `SELECT * FROM employees ORDER BY department_id;`;
    const query = `SELECT * FROM employees ;`;
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
    const query = `SELECT * FROM employees ORDER BY managers_id;`;
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
    const query = `SELECT * FROM employees ORDER BY role_id;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY ROLE');
        console.log('\n');
        console.table(res);
        choices();
    });

};

function viewManagers() {
    const query = `SELECT * FROM managers ORDER BY managers.id;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL MANAGERS');
        console.log('\n');
        console.table(res);
        choices();
    });
};

function viewDepartments() {
    const query = `SELECT * FROM department ORDER BY department.id;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.log('\n');
        console.table(res);
        choices();
    });
};

function viewRoles() {
    const query = `SELECT * FROM role ORDER BY role.id;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL ROLES');
        console.log('\n');
        console.table(res);
        choices();
    });
};

async function addEmployee() {
    const addname = await inquirer.prompt(askName());
    db.query('SELECT * FROM role ORDER BY role.id;', async (err, res) => {
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
            let choice = res.map(res => `${res.first_name} ${res.last_name}`);
            choice.push('none');
            let { manager } = await inquirer.prompt([
                {
                    name: 'manager',
                    type: 'list',
                    choices: choice,
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
                        continue;
                    }
                }
            }
            db.query(
                'INSERT INTO employees SET ?',
                {
                    first_name: addname.first,
                    last_name: addname.last,
                    role_id: roleId,
                    managers_id: parseInt(managersID)
                },
                (err, res) => {
                    if (err) throw err;
                    choices();
                }
            );
        })
    });
};

function updateRole() {
    db.query(
        `SELECT employee.first_name, employee.last_name, employee.role_id FROM employee;`,
        (err, res) => {
          if (err) {
            console.log(err);
          }
          let employees = res;
          db.query(`SELECT title FROM role;`, (err, res) => {
            if (err) {
              console.log(err);
            }
            let currentRoles = res;
    
            inquirer
              .prompt([
                {
                  type: "list",
                  message: "Please choose an employee to update:",
                  name: "employee",
                  choices: () => {
                    let employee = [];
                    for (let i = 0; i < employees.length; i++) {
                      let curID = i + 1;
                      let first = employees[i].first_name;
                      let last = employees[i].last_name;
                      let currentRoleID = employees[i].role_id;
                      employee.push(
                        `${curID}: ${first} ${last} - current role is #${currentRoleID}`
                      );
                    }
                    return employee;
                  },
                },
                {
                  type: "list",
                  message: "Please choose their new role",
                  name: "newRole",
                  choices: () => {
                    let role = [];
                    for (let i = 0; i < currentRoles.length; i++) {
                      const curID = i + 1;
                      let curTitle = currentRoles[i].title;
                      role.push(`${curID}: ${curTitle}`);
                    }
                    return role;
                  },
                },
              ])
              .then(function (res) {
                let id = parseInt(res.employee.split(":")[0]);
                let newRole = parseInt(res.newRole.split(":")[0]);
                const sql = `UPDATE employee SET role_id = ${newRole} WHERE id = ${id}`;
                db.query(sql, (err, result) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  allEmployees();
                });
              });
          });
        }
    );
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
};

choices();