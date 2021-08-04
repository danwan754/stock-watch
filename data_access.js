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
    let sql = `SELECT Lists.id AS id, Lists.list_name AS list_name, JSON_ARRAYAGG(ticker) AS list 
                FROM Users
                    INNER JOIN Lists
                    ON Lists.user_id = Users.id 
                    LEFT JOIN List_items
                    ON List_items.list_id = Lists.id
                WHERE Lists.user_id = ? 
                GROUP BY Lists.id 
                ORDER BY Lists.id;`;
    return new Promise((resolve, reject) => {
        con.query(sql, [user_id], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                result.forEach(row => {
                    row.list = JSON.parse(row.list);
                });
                resolve(JSON.parse(JSON.stringify(result)));
            } else {
                resolve([]);
            }
        })
    });
}

// return id of inserted list
export const insertList = (user_id, list_name) => {
    let sql = "INSERT INTO Lists (user_id, list_name) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
        con.query(sql, [user_id, list_name], (err, result) => {
            if (err) throw err;
            // console.log("inserted new list; id=" + result.insertId);
            resolve(result.insertId);
        });
    });
}

export const deleteList = (user_id, list_id) => {
    let sql = `DELETE FROM Lists
                WHERE user_id = ? AND id = ?`;
    return new Promise((resolve) => {
        con.query(sql, [user_id, list_id], (err, result) => {
            if (err) throw err;
            // console.log(result);
            resolve(result);
        });
    });
}

// return id of updated list
export const updateListName = (user_id, list_id, title) => {
    let sql = `UPDATE Lists
                SET list_name = ?
                WHERE id = ?
                    AND user_id = ?`;
    return new Promise((resolve, reject) => {
        con.query(sql, [title, list_id, user_id], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

// return list ID and ticker
export const addTicker = (user_id, list_id, ticker) => {
    let sql = `INSERT INTO List_items (list_id, ticker) 
                VALUES (?,?)`;
    return new Promise((resolve, reject) => {
        con.query(sql, [list_id, ticker], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}
// export const addTicker = (list_id, user_id, ticker) => {
//     let sql = "UPDATE Lists SET list = JSON_ARRAY_APPEND(list, '$', ?) WHERE id = ? AND user_id = ?";
//     return new Promise((resolve, reject) => {
//         con.query(sql, [ticker, list_id, user_id], (err, result) => {
//             if (err) throw err;
//             resolve(result);
//         });
//     });
// }

// delete stock from list return list ID
export const deleteTicker = (user_id, list_id, tickers) => {
    let sql = ` DELETE 
                FROM List_items 
                WHERE list_id = ? 
                    AND ticker 
                        IN (?)`;
    return new Promise((resolve) => {
        con.query(sql, [list_id, tickers], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

export const insertCompany = (ticker, company) => {
    let sql = `INSERT INTO Stocks (ticker, company) 
                VALUES (?,?)`;
    return new Promise((resolve) => {
        con.query(sql, [ticker, company], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

export const getCompanies = () => {
    let sql = "SELECT ticker, company FROM Stocks";
    return new Promise((resolve) => {
        con.query(sql, [], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}