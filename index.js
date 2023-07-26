const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require("./config")


const mainMenu = [
  {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Exit',
    ],
  },
];

const main = () => {
  inquirer.prompt(mainMenu).then((answer) => {
    console.clear();
    switch (answer.menu) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Exit':
        console.log('Goodbye!');
        connection.end();
        break;
      default:
        console.log('Invalid choice.');
        main();
    }
  });
};

const viewDepartments = () => {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    main();
  });
};

const viewRoles = () => {
  const query =
    'SELECT role.id, role.title, role.salary, department.dept_name ' +
    'FROM role ' +
    'INNER JOIN department ON role.department_id = department.id ' +
    'ORDER BY role.id ASC';

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    main();
  });
};

const viewEmployees = () => {
  const query =
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name ' +
    'FROM employee ' +
    'INNER JOIN role ON employee.role_id = role.id ' +
    'INNER JOIN department ON role.department_id = department.id';

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    main();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the Department name:',
      },
    ])
    .then((answer) => {
      const name = answer.departmentName;
      connection.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [name],
        (err, _results) => {
          if (err) throw err;
          console.log('Department Added');
          main();
        }
      );
    });
};

const addRole = () => {
  const departmentQuery = 'SELECT id, dept_name FROM department';
  connection.query(departmentQuery, (err, results) => {
    if (err) throw err;

    const departmentChoices = results.map((department) => {
      return {
        name: department.dept_name,
        value: department.id,
      };
    });

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter role name:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter role salary:',
        },
        {
          type: 'list',
          name: 'department',
          message: 'Select department:',
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        const { name, salary, department } = answers;
        connection.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [name, salary, department],
          (err, _results) => {
            if (err) throw err;
            console.log('Role Added');
            main();
          }
        );
      });
  });
};

const addEmployee = () => {
  const roleQuery = 'SELECT id, title FROM role';
  connection.query(roleQuery, (err, results) => {
    if (err) throw err;

    const roleChoices = results.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Employee's first name:",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Employee's last name:",
        },
        {
          type: 'input',
          name: 'manager',
          message: "Employee's manager (if any):",
        },
        {
          type: 'list',
          name: 'role',
          message: "Employee's role:",
          choices: roleChoices,
        },
      ])
      .then((answers) => {
        const { firstName, lastName, manager, role } = answers;
        const managerId = manager || null;
        connection.query(
          'INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)',
          [firstName, lastName, managerId, role],
          (err, _results) => {
            if (err) throw err;
            console.log('Employee Added');
            main();
          }
        );
      });
  });
};

main();
