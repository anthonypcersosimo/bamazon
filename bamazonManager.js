// Bring in MySQL from NPM and fs to require my password from a locked txt file
var mysql = require("mysql");
var fs = require("fs");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
        // console.log("You're connected!!\nConnected as id " + connection.threadId);
        inquireStart();
    });

    // KICKING IT ALL OFF
    function inquireStart() {
        console.log("\n~ Welcome to the Bamazon Inventory Management App! ~\n~ Press Ctrl + c at any time to exit ~\n");
        inquirer.prompt([
            {
                type: "list",
                name: "startorexit",
                message: "Please Make a Selection Below:",
                choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
                ]
            }
        // FIGURE OUT WHAT FUNCTION TO RUN
        ]).then(function(key) {
            console.log(key.startorexit);

            // THIS ANSWER MATCHES TO FUNCTION 1
            if (key.startorexit === '') {
               viewInventory();
            }

            // THIS ANSWER MATCHES TO FUNCTION 2
            else if (key.startorexit === '') {
                
            }
            // THIS ANSWER MATCHES TO FUNCTION 3
            else if (key.startorexit === '') {
                
            }
            // THIS ANSWER MATCHES TO FUNCTION 4
            else if (key.startorexit === '') {
                
            }

            // THIS ANSWER MATCHES TO FUNCTION 5
            else {
                console.log("Thank you for using the Bamazon Inventory Management App!");
                console.log("You connection will now be terminated.")
                connection.end();
            }
        });
    };

    // START FUNCTION 1
    function viewInventory() {
        var query = "SELECT * FROM products";
        connection.query(query, function(err, res) {
            if (err) throw err;
            // console.log(res);
            var table = new Table({
                head: ['item_id', 'product_name', 'deprtment_name', 'price', 'stock_quantity'],
                colWidths: [10, 34, 18, 10, 16]
            });
            
            for (var i = 0; i < res.length; i++) {
                // table is an Array, so you can `push`, `unshift`, `splice` and friends
                table.push(
                    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
                ); 
            };
            console.log(table.toString());
            inquireStart();
        });
    };
    // END FUNCTION 1

    // BEGIN FUNCTION 2
   
    // END FUNCTION 2

    // BEGIN FUNCTION 3
    
    // END FUNCTION 3

    // BEGIN FUNCTION 4
    
    // END FUNCTION 4

    // BEGIN FUNCTION 5
    
    // END FUNCTION 5
});