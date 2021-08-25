import * as pg from 'pg';

const { Pool } = pg.default;
// console.log(pg.default.Pool);

// // local db
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// if production mode
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

// query wrapper; potentially used for logging
const query = (SQLText, paramsArr, callback) => {
    // console.log(SQLText);
    return pool.query(SQLText, paramsArr, callback);
}

// return list of schemas
export const getSchemas = () => {
    let sql = 'SELECT schema_name FROM information_schema.schemata';
    return new Promise((resolve, reject) => 
        query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            resolve(result);
        })
    );
}

// returns user id of inserted user
export const insertUser = user => {
    // console.log(user);
    let sql = `INSERT INTO Users (username, password) 
                VALUES ($1, $2)
                RETURNING id`;
    return new Promise((resolve, reject) => 
        query(sql, [user.username, user.password], (err, result) => {
            if (err) throw err;
            // console.log(result);
            if (result.rows[0].id) {
                console.log("Inserted new user: " + user.username);
                resolve(result.rows[0].id);
            } else {
                reject("Failed to insert user.");
            }
        })
    );
}

// returns a non-empty user object or null if user does not exist
export const getUser = username => {
    let sql = 'SELECT * FROM Users WHERE username= $1;';
    return new Promise((resolve, reject) =>
        query(sql, [username], (err, result) => {
            // console.log(result);
            if (err) throw err;
            if (result.rows.length > 0) {
                // console.log("Fetched user: ");
                // console.log(result.rows[0]);
                resolve(result.rows[0]);
            } else {
                console.log('User does not exist.');
                resolve(null);
            }
        })
    );
}

// return list of stocklist objects or null if nothing found
export const getLists = user_id => {
    let sql = `SELECT Lists.id AS id, Lists.list_name AS list_name, ARRAY_AGG(ticker) AS list 
                FROM Users
                    INNER JOIN Lists
                    ON Lists.user_id = Users.id 
                    LEFT JOIN List_items
                    ON List_items.list_id = Lists.id
                WHERE Lists.user_id = $1 
                GROUP BY Lists.id 
                ORDER BY Lists.id;`;
    return new Promise((resolve, reject) => {
        query(sql, [user_id], (err, result) => {
            if (err) throw err;
            if (result.rows.length > 0) {
                resolve(result.rows);
            } else {
                resolve([]);
            }
        })
    });
}

// return id of inserted list
export const insertList = (user_id, list_name) => {
    let sql = `INSERT INTO Lists (user_id, list_name) 
                VALUES ($1, $2)
                RETURNING id`;
    return new Promise((resolve, reject) => {
        query(sql, [user_id, list_name], (err, result) => {
            if (err) throw err;
            // console.log(result);
            if (result.rows[0].id) {
                console.log("inserted new list; id=" + result.rows[0].id);
                resolve(result.rows[0].id);
            } else {
                reject(false);
            }
        });
    });
}

export const deleteList = (user_id, list_id) => {
    let sql = `DELETE FROM Lists
                WHERE user_id = $1 AND id = $2`;
    return new Promise((resolve) => {
        query(sql, [user_id, list_id], (err, result) => {
            if (err) throw err;
            // console.log(result);
            resolve(true);
        });
    });
}

// return id of updated list
export const updateListName = (user_id, list_id, title) => {
    let sql = `UPDATE Lists
                SET list_name = $1
                WHERE id = $2
                    AND user_id = $3`;
    return new Promise((resolve, reject) => {
        query(sql, [title, list_id, user_id], (err, result) => {
            if (err) throw err;
            // console.log(result);
            if (result.rowCount > 0) {
                resolve(true);
            } else {
                reject(false)
            }
        });
    });
}

// return list ID and ticker
export const addTicker = (user_id, list_id, ticker) => {
    let sql = `INSERT INTO List_items (list_id, ticker) 
                VALUES ($1, $2)
                RETURNING (list_id, ticker)`;
    return new Promise((resolve, reject) => {
        query(sql, [list_id, ticker], (err, result) => {
            if (err) {
                return reject(err);
            }
            if (result.rows.length > 0) {
                return resolve(true);
            } else {
                return reject("Failed to insert list item.");
            }
        });
    });
}

// delete stock from list return list ID
export const deleteTicker = (user_id, list_id, tickers) => {
    console.log(tickers.join(','));
    let sql = ` DELETE 
                FROM List_items 
                WHERE list_id = $1 
                    AND ticker IN ($2)`;
    return new Promise((resolve, reject) => {
        query(sql, [list_id, tickers.join(',')], (err, result) => {
            if (err) {
                return reject(err);
            }
            console.log(result);
            if (result.rowCount > 0) {
                return resolve(true);
            } else {
                return reject("Failed to delete list item.");
            }
        });
    });
}

export const insertCompany = (ticker, company) => {
    let sql = `INSERT INTO Stocks (ticker, company) 
                VALUES ($1, $2)`;
    return new Promise((resolve) => {
        query(sql, [ticker, company], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

export const getCompanies = () => {
    let sql = "SELECT ticker, company FROM Stocks";
    return new Promise((resolve) => {
        query(sql, [], (err, result) => {
            if (err) throw err;
            resolve(result.rows);
        });
    });
}