--
--MYSQL
--

-- create database
CREATE DATABASE stock_tracker;


-- create user table
CREATE TABLE Users (
    id SMALLINT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);


-- create stock table
CREATE TABLE Stocks (
    id SMALLINT UNSIGNED AUTO_INCREMENT,
    ticker VARCHAR(10) NOT NULL,
    company VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

-- create list table; list of tickers
CREATE TABLE Lists (
    id SMALLINT UNSIGNED AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    list_name VARCHAR(20),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);


-- create table of all items in lists
CREATE TABLE List_items (
    list_id SMALLINT UNSIGNED NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    FOREIGN KEY (list_id) REFERENCES Lists(id) ON DELETE CASCADE,
    PRIMARY KEY (list_id, ticker)
);