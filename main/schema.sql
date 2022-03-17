DROP DATABASE IF EXISTS employee_db;
DROP TABLES IF EXISTS  department;
DROP TABLES IF EXISTS  managers;
DROP TABLES IF EXISTS  role;
DROP TABLES IF EXISTS  employees;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE managers (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  managers_department VARCHAR(30) NOT NULL,
  name VARCHAR(30) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary decimal(10,2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  managers_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  FOREIGN KEY (managers_id)
  REFERENCES managers(id)
  ON DELETE SET NULL
);