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
        console.clear();
        console.log("\n~ Welcome to the Bamazon Inventory Management App! ~\n~ Press Ctrl + c at any time to exit ~\n");
        inquireStart();
    });

    // KICKING IT ALL OFF
    function inquireStart() {
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
        // CONVERT TO SWITCH CASE
        ]).then(function(key) {
            console.log(key.startorexit);

            // THIS ANSWER MATCHES TO FUNCTION 1
            if (key.startorexit === 'View Products for Sale') {
                console.clear();
                viewInventory();
            }

            // THIS ANSWER MATCHES TO FUNCTION 2
            else if (key.startorexit === 'View Low Inventory') {
                console.clear();
                viewLowInventory();
            }
            // THIS ANSWER MATCHES TO FUNCTION 3
            else if (key.startorexit === 'Add to Inventory') {
                console.clear();
                addToInventory();
            }
            // THIS ANSWER MATCHES TO FUNCTION 4
            else if (key.startorexit === 'Add New Product') {
                console.clear();
                addNewProduct();
            }

            // THIS ANSWER MATCHES TO FUNCTION 5
            else {
                console.clear();
                terminate();
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
    function viewInventory2() {
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
        });
    };
    // END FUNCTION 1

    // BEGIN FUNCTION 2
    function viewLowInventory() {
        var query = "SELECT * FROM products WHERE stock_quantity <= 5";
        connection.query(query, function(err, res) {
            if (err) throw err;

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
            console.log("Low products with five or less units!\n\nConsider restocking the following items:");
            console.log(table.toString());
            inquireStart();
        });
    };
    // END FUNCTION 2

    // BEGIN FUNCTION 3
    function addToInventory() {
        // viewInventory2();
        // I want to call the function to viewInventory2 so that way you can see the table
        // when you select the item you want to add... however it skips to the inquirer prompt first and then
        // displays the table. Could not find a workaround
        inquirer.prompt([
            {
                type: "input",
                name: "restockId",
                message: "Please input the ID of the item you would like to order more of:"
            },
            {
                type: "input",
                name: "restockAmt",
                message: "How many more units would you like to purchase?"
            }
        ]).then(function (answer) {
            var query = "SELECT * FROM products";
            connection.query(query, function(err, res) {
                if (err) throw err;

                var stockId = answer.restockId;
                stockId = stockId - 1;
                console.log(stockId);
                var addQuant = parseInt(answer.restockAmt);
                var currentQuant = res[stockId].stock_quantity;
                var newAmt = currentQuant + addQuant;
                query = "UPDATE products SET stock_quantity = " + (newAmt) + " WHERE item_id = " + answer.restockId;
                connection.query(query, function(err, res) {
                    if (err) throw err;
                    
                    console.clear();
                    viewInventory();
                });
            });
        });
    };
    // END FUNCTION 3

    // BEGIN FUNCTION 4
    function addNewProduct() {
        //prompt questions to get product name, department, cost, and quantity for the new product 
        inquirer.prompt([
            {
                type: "input",
                name: "newProductName",
                message: "What is the name of the product you would like to add?"
            },
            {
                type: "list",
                name: "department",
                message: "Which department does this product fall into?",
                choices: ["Electronics", "Beauty", "Shoes", "Sports", "Home", "Books"]
            },
            {
                type: "input",
                name: "cost",
                message: "How much does it cost?",
                validate: function(cost) {
                    if (!isNaN(cost)) {
                        return true;
                    }
                    console.log("Please enter a valid cost.");
                    return false;
                }
            },
            {
                type: "input",
                name: "iniQuantity",
                message: "How many do we have?",
                validate: function(iniQuantity) {
                    if (!isNaN(iniQuantity)) {
                        return true;
                    }
                    console.log("Please enter a valid quantity.");
                    return false;
                }
            }
        ]).then(function (answers){
    
            //grab the new product info from answer and add to (insert into) the database table
            var query = "INSERT INTO products SET ?";
            connection.query(query, {
                product_name: answers.newProductName,
                department_name: answers.department,
                price: answers.cost,
                stock_quantity: answers.iniQuantity,
            })
    
            //show message that the product has been added.
            console.log(answers.newProductName + " has been added to Bamazon.");
    
            viewInventory();        
        });     
    };
    // END FUNCTION 4

    // BEGIN FUNCTION 5
    function terminate() {
        console.log("Thank you for using the Bamazon Inventory Management App!");
        console.log("You connection will now be terminated.");
        connection.end();
    };
    // END FUNCTION 5
});