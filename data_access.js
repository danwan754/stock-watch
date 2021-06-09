import Dotenv from 'dotenv';
Dotenv.config();

import Mysql from 'mysql';

// connect to db
let con = Mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
            // console.log("Inserted new user: " + user.username + "; id: " + result.insertId);
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
                // console.log("Fetched user: ");
                // console.log(result);
                resolve(JSON.parse(JSON.stringify(result[0])));
            } else {
                resolve(null);
            }
        })
    );
}

// return list of stocklist objects or null if nothing found
export const getLists = user_id => {
    let sql = "SELECT list_name, list FROM Users INNER JOIN Lists ON Users.id = Lists.user_id WHERE Users.id = ?";
    return new Promise((resolve, reject) => {
        con.query(sql, [user_id], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                resolve(JSON.parse(JSON.stringify(result)));
            } else {
                resolve(null);
            }
        })
    });
}

// return id of inserted list
export const insertList = (user_id, list_name) => {
    let sql = "INSERT INTO Lists (user_id, list_name, list) VALUES (?, ?, JSON_ARRAY())";
    return new Promise((resolve, reject) => {
        con.query(sql, [user_id, list_name], (err, result) => {
            if (err) throw err;
            console.log("inserted new list; id=" + result.insertId);
            resolve(result.insertId);
        });
    });
}

// return list ID and ticker
export const addTicker = (list_id, user_id, ticker) => {
    let sql = "UPDATE Lists SET list = JSON_ARRAY_APPEND(list, '$', ?) WHERE id = ? AND user_id = ?";
    return new Promise((resolve, reject) => {
        con.query(sql, [ticker, list_id, user_id], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

// return list ID
export const deleteTicker = (list_id, user_id, ticker) => {
    let sql = "UPDATE Lists SET list = JSON_REMOVE(list, JSON_UNQUOTE(JSON_SEARCH(list, 'one', ?))) WHERE JSON_SEARCH(list, 'one', ?) IS NOT NULL AND id = ? AND user_id = ?";
    return new Promise((resolve) => {
        con.query(sql, [ticker, ticker, list_id, user_id], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

export const deleteList = (list_id, user_id) => {
    let sql = "DELETE FROM Lists WHERE id = ? AND user_id = ?";
    return new Promise((resolve) => {
        con.query(sql, [list_id, user_id], (err, result) => {
            if (err) throw err;
            console.log(result);
            resolve(result);
        });
    });
}