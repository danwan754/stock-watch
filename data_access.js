import Dotenv from 'dotenv';
Dotenv.config();

import Mysql from 'mysql';

import { db } from './config.js';

// connect to db
let con = Mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
  });
  
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// returns user id of inserted user
export const insertUser = user => {
    let sql = 'INSERT INTO Users (username, password) VALUES (?, ?);';
    return new Promise((resolve, reject) => 
        con.query(sql, [user.username, user.password], (err, result) => {
            if (err) throw err;
            console.log("Inserted new user: " + user.username + "; id: " + result.insertId);
            resolve(result.insertId);
        })
    );
}

// returns a non-empty user object or null if user does not exist
export const getUser = username => {
    let sql = 'SELECT * FROM Users WHERE username=?;';
    return new Promise((resolve, reject) =>
        con.query(sql, [username], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                console.log("Fetched user: ");
                console.log(result);
                resolve(JSON.parse(JSON.stringify(result[0])));
            } else {
                resolve(null);
            }
        })
    );
}
