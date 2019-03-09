CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(50) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 stock_quantity INTEGER(10) NOT NULL

);