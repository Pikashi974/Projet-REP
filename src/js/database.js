const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: `electron_rep`,
    port: 5697
})

function getConnection() {
    return connection
}

module.exports = {
    getConnection
}