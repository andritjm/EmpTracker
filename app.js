const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./connection.js');

//create connection n throw error if error
connection.connect(function (err) {
    if (err) throw err;
    console.log("id used" + connection.threadId);
    list();
})

const list = () => {
    inquirer.prompt([{
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View departments",
                "View roles",
                "View employees",
                "Add new department",
                "Add new role",
                "Add new employee",
                "Update employee role",
                "Exit"
            ]
        }])

        .then(function (answer) {
            switch (answer.choice) {
                case "View departments":
                    viewAllDepartments();
                    break;
                case "View roles":
                    viewAllRoles();
                    break;
                case "View employees":
                    viewAllEmployees();
                    break;
                case "Add new department":
                    addDepartment();
                    break;
                case "Add new role":
                    addRole();
                    break;
                case "Add new employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        console.table(res);
        list();
    })
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res);
        list();
    })
}

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res);
        list();
    })
}

const addDepartment = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            },

        ]).then (function (answer) {
            connection.query('INSERT INTO departments SET ?', {
                name: answer.department
            }, function (err) {
                if (err) throw err;
                console.log("Department added!");
                list();
            })
        })
    })
}

const addRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary?"
            },
            {
                name: "dept_id",
                type: "input",
                message: "Input department Id number."
            }
        ]).then (function (answer) {
            connection.query('INSERT INTO roles SET ?', {
                title: answer.title,
                salary: answer.salary,
                dept_id: answer.dept_id
            }, function (err) {
                if (err) throw err;
                console.log("Role added!");
                list()
            })
        })
    })
}

const updateEmployeeRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
                answer: res.map(employee => employee.first_name)
            },
            {
                name: "role_id",
                type: "list",
                message: "What is the employee's new role?",
                choices: res.map(role => role.title)
            }
        ]).then(function (answer) {
            const roleId = res.find(role => role.title === answer.role_id).id;

            connection.query('UPDATE employees SET ? WHERE ?', [{
                    role_id: roleId
                },
                {
                    first_name: answer.firstName
                }
            ], function (err) {
                if (err) throw err;
                console.log("Role updated!");
                list();
            })
        })
    })
}
