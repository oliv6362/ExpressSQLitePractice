const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// creates the table
db.serialize(() => {
  db.run('CREATE TABLE user (userID INTEGER PRIMARY KEY AUTOINCREMENT, fName TEXT NOT NULL, lName TEXT NOT NULL, phone TEXT NOT NULL UNIQUE)');
});

// Add a user to the database table user
async function addUser(fName, lName, phone) {
  const sql = `INSERT INTO user (fName, lName, phone) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [fName, lName, phone], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });

        //just for testing purposes
        getUser(this.lastID)
          .then(row => {
            console.log(row);
          })
          .catch(error => {
            console.error('Error fetching user:', error);
          });
      }
    });
  });
}

// Get user from the database table user
async function getUser(userID) {
  const sql = `SELECT * FROM user WHERE userID = ?`;
  return new Promise((resolve, reject) => {
    db.get(sql, [userID], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Export the functions so they can be used elsewhere in the project
module.exports = { addUser, getUser };