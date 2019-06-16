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
        console.log("\nWelcome to the Bamazon Inventory Management App!\n");
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
    function function2() {
   
    }
    // END FUNCTION 2

    // BEGIN FUNCTION 3
    function function3() {
        console.log("Goodnight Moon by Margaret Wise Brown…\n In the great green room\n There was a telephone\n And a red balloon\n And a picture ofThe cow jumping over the moon\n And there were three little bears sitting on chairs\n And two little kittens and a pair of mittens\n And a little toy house\n And a young mouse\n And a comb and a brush and a bowl full of mush\n And a quiet old lady who was whispering “hush”\n Goodnight room\n Goodnight moon\n Goodnight cow jumping over the moon\n Goodnight light And the red balloon\n Goodnight bears\n Goodnight chairs\n Goodnight kittens And goodnight mittens\n Goodnight clocks And goodnight socks\n Goodnight little house And goodnight mouse\n Goodnight comb And goodnight brush\n Goodnight nobody\n Goodnight mush\n And goodnight to the old lady whispering “hush”\n Goodnight stars\n Goodnight air\n Good night noises everywhere");
    };
    // END FUNCTION 3

    // BEGIN FUNCTION 4
    function function4() {

    };
    // END FUNCTION 4
});