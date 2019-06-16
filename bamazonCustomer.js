// Bring in MySQL from NPM and fs to require my password from a locked txt file
var mysql = require("mysql");
var fs = require("fs");
var inquirer = require("inquirer");

fs.readFile("./password.txt", 'utf8', function(err, data) {
    // throw error if txt file has no password otherwise, store data from txt as variable
    if (err) throw err;
    var pword = data;

    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: pword,
        database: 'bamazon_DB'
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("You're connected!!\nConnected as id " + connection.threadId);
        inquireStart();
    });

    // KICKING IT ALL OFF
    function inquireStart() {
        console.log("\n****************!\n");
        inquirer.prompt([
            {
                type: "list",
                name: "startorexit",
                message: "?",
                choices: ["View Inventory",
                "Exit",
                "Read me a Bedtime Story?"
                ]
            }
        // FIGURE OUT WHAT FUNCTION TO RUN
        ]).then(function(key) {
            console.log(key.startorexit);

            // THIS ANSWER MATCHES TO FUNCTION 1 BELOW ON LINE 59
            if (key.startorexit === 'View Inventory') {
               function1();
            }

            // THIS ANSWER EXITS THE PROGRAM
            else if (key.startorexit === 'Exit') {
                connection.end();
            }

            // THIS ANSWER MATCHES TO FUNCTION 2 BELOW ON LINE ##
            else {
                function3();
            }
          });
    };

    // START FUNCTION 1
    function function1() {
        
    };
    // END FUNCTION 1

    // BEGIN FUNCTION 2
    function function2() {
   
    }
    // END FUNCTION 2

    // BEGIN FUNCTION 3
    function function3() {
  
    };
    // END FUNCTION 3

    // BEGIN FUNCTION 4
    function function4() {

    };
    // END FUNCTION 4
});