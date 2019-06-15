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
        // inquireStart();
    });

    // KICKING IT ALL OFF
    function inquireStart() {
        console.log("\n****************!\n");
        inquirer.prompt([
            {
                type: "list",
                name: "",
                message: "?",
                choices: ["choice 1",
                "choice 2",
                "choice 3",
                "choice 4"
                ]
            }
        // FIGURE OUT WHAT FUNCTION TO RUN
        ]).then(function(key) {
            console.log(key.name);

            // QUERY 1 MATCHES TO FUNCTION 1 BELOW ON LINE 79
            if (key.name === 'choice *') {
               function1();
            }

            // QUERY 2 MATCHES TO FUNCTION 2 BELOW ON LINE ##
            else if (key.name === 'choice *') {
                function2();
            }

            // QUERY 3 MATCHES TO FUNCTION 3 BELOW ON LINE ##
            else if (key.name === 'choice *') {
                function3();
            }

            // QUERY 4 MATCHES TO FUNCTION 4 BELOW ON LINE ##
            else if (key.name === 'choice *') {
            function4();
            }

            else {
            console.log("Thanks for stopping by!!")
            connection.end();
            }
          });
    };

    // START FUNCTION 1
    function function1(artistName) {

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