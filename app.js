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
                case "Remove Department":
                    deleteDepartment();
                    break;
                case "Remove Role":
                    deleteRole();
                    break;
                case "Remove Employee":
                    deleteEmployee();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM depts', function (err, res) {
        if (err) throw err;
        console.table(res);
        work();
    })
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res);
        work();
    })
}

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res);
        work();
    })
}

