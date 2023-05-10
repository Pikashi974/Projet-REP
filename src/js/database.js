const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: `rep`,
    port: 5697
})

function getConnection() {
    return connection
}

module.exports = {
    getConnection
}