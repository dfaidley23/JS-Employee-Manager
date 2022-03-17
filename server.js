const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

const questions = {
    viewAllEmployees: "View All Employees",
    viewByDepartment: "View All Employees By Department",
    viewByManager: "View All Employees By Manager",
    addEmployee: "Add An Employee",
    removeEmployee: "Remove An Employee",
    updateRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    viewAllRoles: "View All Roles",
    exit: "Exit"
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

inquirer.prompt(questions);

db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
});

db.query('SELECT * FROM managers', function (err, results) {
    console.table(results);
});

db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
});

db.query('SELECT * FROM employees', function (err, results) {
    console.table(results);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});