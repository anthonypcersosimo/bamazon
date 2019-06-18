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
                choices: ["View Inventory",
                "Exit",
                "Read me a Bedtime Story?"
                ]
            }
        // FIGURE OUT WHAT FUNCTION TO RUN
        ]).then(function(key) {
            console.log(key.startorexit);

            // THIS ANSWER MATCHES TO FUNCTION 1 BELOW ON LINE 60
            if (key.startorexit === 'View Inventory') {
                console.clear();
                viewInventory();
            }

            // THIS ANSWER EXITS THE PROGRAM - FUNCTION 2
            else if (key.startorexit === 'Exit') {
                connection.end();
            }

            // THIS ANSWER MATCHES TO FUNCTION 3 BELOW ON LINE 135
            else {
                function3();
            }
        });
    };

    function continueShopping() {
        inquirer.prompt([
            {
                type: "list",
                name: "continue",
                message: "Please Make a Selection Below:",
                choices: ["Continue Shopping",
                "Exit",
                ]
            }
        // FIGURE OUT WHAT FUNCTION TO RUN
        ]).then(function(key) {
            if (key.continue === 'Continue Shopping') {
                console.clear();
                viewInventory();
            }
            else {
                console.clear();
                console.log("Thank you for using the Bamazon Customer App!");
                console.log("You connection will now be terminated.");
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
            purchaseProduct();
        });
    };
    // END FUNCTION 1

    // BEGIN FUNCTION 2
    function purchaseProduct() {
        var chosenItem;
        var chosenUnits;
        inquirer.prompt([
            {
                type: "input",
                name: "itemid",
                message: "\nPlease indicate the ID of the product you would like to buy:",
            },
            {
                type: "input",
                name: "itemunits",
                message: "\nPlease indicate the # of units you would like to buy:",
            }
        // FIGURE OUT WHAT FUNCTION TO RUN
        ]).then(function(key) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {item_id: key.itemid}, function(err, res) {
                var chosenProduct = res[0].product_name;
                var currentUnits = res[0].stock_quantity;
                var currentPrice = res[0].price;
                chosenItem = key.itemid;
                chosenUnits = key.itemunits;

                if (err) throw err;

                if (currentUnits < chosenUnits) {
                    console.log('Sorry! Not Enough Inventory!');
                    purchaseProduct();
                }
                else {
                    var newUnits = currentUnits - chosenUnits;
                    var query = "UPDATE products SET stock_quantity = " + newUnits + "  WHERE item_id = " + chosenItem;
                    connection.query(query, function(err, res) {
                    if (err) throw err;
                    console.log("\nPurchase Processed!");
                    console.log("=====================");
                    console.log("Your Order Details:\n");
                    console.log("You Purchased: " + chosenUnits + "x " + chosenProduct + "!" + "\n");
                    console.log("Your total cost was: $" + (currentPrice * chosenUnits) + " dollars.");
                    console.log("=====================\n");
                    continueShopping();
                    });
                };
            });
        });
    };
    // END FUNCTION 2

    // BEGIN FUNCTION 3
    function function3() {
        console.log("\n\nGoodnight Moon by Margaret Wise Brown…\n In the great green room\n There was a telephone\n And a red balloon\n And a picture ofThe cow jumping over the moon\n And there were three little bears sitting on chairs\n And two little kittens and a pair of mittens\n And a little toy house\n And a young mouse\n And a comb and a brush and a bowl full of mush\n And a quiet old lady who was whispering “hush”\n Goodnight room\n Goodnight moon\n Goodnight cow jumping over the moon\n Goodnight light And the red balloon\n Goodnight bears\n Goodnight chairs\n Goodnight kittens And goodnight mittens\n Goodnight clocks And goodnight socks\n Goodnight little house And goodnight mouse\n Goodnight comb And goodnight brush\n Goodnight nobody\n Goodnight mush\n And goodnight to the old lady whispering “hush”\n Goodnight stars\n Goodnight air\n Good night noises everywhere");
    };
    // END FUNCTION 3
});