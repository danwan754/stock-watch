--
--POSTGRESQL
--

-- create database
CREATE DATABASE stock_tracker;

-- -- create schema
-- CREATE SCHEMA stock_tracker;

-- create user table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
);


-- create stock table
CREATE TABLE Stocks (
    id SERIAL PRIMARY KEY,
    ticker VARCHAR(10) NOT NULL,
    company VARCHAR(200) NOT NULL
);

-- create list table; list of tickers
CREATE TABLE Lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users (id),
    list_name VARCHAR(20)
);


-- create table of all items in lists
CREATE TABLE List_items (
    list_id SERIAL,
    ticker VARCHAR(10) NOT NULL,
    FOREIGN KEY (list_id) REFERENCES Lists (id) ON DELETE CASCADE,
    PRIMARY KEY (list_id, ticker)
);