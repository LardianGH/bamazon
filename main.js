inquirer = require("inquirer")
mysql = require("mysql")

const chosenItem = [];
const itemAmount = [];

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

const check = function(leaving, results, answer, buy){
  console.log(leaving)
  if (leaving === true) {
    checkout(chosenItem, itemAmount, results)
  } else {
  for (i = 0; i < results.length; i++) {
    if (results[i].name === answer.choice) {
      chosenItem.push(results[i]);
      itemAmount.push(buy.amount)
    }
  }
  importItems();
}
}

const checkout = function(items, amount, results) {
//delete the items from the database
console.log("You have purchased:")
if (items.length < 1) {
console.log("Nothing")
start()
} else {
  for (j=0; j < items.length; j++) {
    console.log(items[j].name + " x " + amount[j])
    }
start()
}
}

const importItems = function() { //code from greatBay
   
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              if(results[i].quantity >= 102) {
              choiceArray.push(results[i].name);
              }
            }
            choiceArray.push("[CHECKOUT]")
            return choiceArray;
          },
          message: "What would you like to purchase?"
        }
      ])
      .then(function(answer) {
        if (answer.choice === "[CHECKOUT]") {
          check(true, results)
        } else {
          inquirer
      .prompt([
        {
          name: "amount",
          type: "number",
          message: "How many?"
        }
      ]).then(function(buy) {
        check(false, results, answer, buy)
        })}
        // get the information of the chosen item
      })
    })
    }

var start = function() {
    inquirer
      .prompt({
        name: "choice",
        type: "list",
        message: "Would you like to select a department or search for a specific item?",
        choices: ["Departments", "Search", "Checkout"]
      })
      .then(function(menu) {
        // based on their answer, either call the bid or the post functions
        if (menu.choice === "Departments") {
          console.log("departments wooo");
          start()
        }
        else if(menu.choice === "Search") {
          console.log("search wooo");
         chosenItem.length = 0; //resets basket
         itemAmount.length = 0; //resets basket
          importItems()
        } else{
          connection.end();
        }
      });
  }