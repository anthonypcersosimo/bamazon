CREATE DATABASE bamazon_db;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'curb3436ale7770dog!';

CREATE TABLE products(
item_id int NOT NULL AUTO_INCREMENT,
product_name varchar(100) NOT NULL,
department_name varchar(100) NOT NULL,
price int NOT NULL,
stock_quantity int default 0 NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Amazon Alexa', 'Home & TV', 60, 50),
    ('Apple TV', 'Home & TV', 75, 30),
    ('Safety Glasses', 'Hardware', 8, 100),
    ('Logitech Gaming Mouse', 'Gaming', 80, 10),
    ('Hammer', 'Hardware', 12, 18),
    ('Razer Chroma', 'Gaming', 110, 8),
    ('Harmon Kardon Sound Bar', 'Home & TV', 220, 5),
    ('Hard Hat', 'Hardware', 30, 19),
    ('Turtle Beach Headphones', 'Gaming', 90, 22);

SELECT * FROM products;