DROP DATABASE IF EXISTS bamazon;
create database bamazon;

use bamazon;

create table products (
id int auto_increment not null,
name varchar(20) not null,
price int(6.2) not null,
department varchar(20) null,
PRIMARY KEY (id)
);

INSERT INTO products (name, price, department)
VALUES 
("towel", 12, "bath products"),
("potato chips", 2, "snacks"),
("bean bag", 15, "furniture"),
("bidet", 87, "bath products"),
("microphone", 45, "electronics"),
("dried seaweed", 4, "snacks"),
("television", 130, "electronics"),
("pear phone", 89, "electronics"),
("chocolate crepes", 8, "snacks"),
("the meaning of life", 42, null);

SELECT * FROM products;