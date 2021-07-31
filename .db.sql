-- create database
CREATE DATABASE stock_tracker;


-- create user table
CREATE TABLE Users (
    id SMALLINT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
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
/* old
CREATE TABLE Lists (
    id SMALLINT UNSIGNED AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    list_name VARCHAR(20),
    list JSON NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
*/

-- create table of all items in lists
CREATE TABLE List_items (
    list_id SMALLINT UNSIGNED NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    FOREIGN KEY (list_id) REFERENCES Lists(id),
    PRIMARY KEY (list_id, ticker)
);
/* old
CREATE TABLE List_items (
    user_id SMALLINT UNSIGNED NOT NULL,
    list_id SMALLINT UNSIGNED NOT NULL,
    stock_id SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (list_id) REFERENCES Lists(id),
    FOREIGN KEY (stock_id) REFERENCES Stocks(id),
    PRIMARY KEY (user_id, list_id, ticker)
);
*/


-- insert into Users
INSERT INTO USERS (username, password) VALUES (<username>, <password>);

-- insert into Lists
INSERT INTO LISTS (user_id, list_name, list) VALUES (<user_id>, <list_name>, <[list]>);

-- insert into Stocks
INSERT INTO Stocks (ticker, company) VALUES (<ticker>, <company>);