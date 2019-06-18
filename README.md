# Amzon-like Node App: Bamazon! How original, right?

## Overview

This node app is an Amazon-like storefront which ustilizes the power of NPM and mySQL. The first app 'bamazonCustomer.js' will take in orders from customers and deplete stock from the store's inventory. Additionally there is a second node file 'bamazonManager.js' which has a different set of functionality. This app will let you browse the current inventory and view items that are depleted in stock (less than 5 units), replenish units that are low in inventory and add new items.

### Steps for creating bamazonCustomer.js

1. Created a MySQL Database called `bamazon`.

2. Then created a Table inside of that database called `products`.

3. The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populated this database with around 10 different products. (i.e. Inserted "mock" data rows into this database and table).

5. Then created a Node application called `bamazonCustomer.js`. Running this application first displays all of the items available for sale. Includes the ids, names, and prices of products for sale.

6. The app then prompts users with two messages.
  
   * The first asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

7. Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.

   * If not, the app logs a phrase like `Insufficient quantity!`, and then prevents the order from going through.

8. However, if the store _does_ have enough of the product, it fulfills the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, the customer will see the total cost of their purchase.

- - -


### Steps for creating bamazonManager.js (Next Level)

* Created a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store.

- - -

