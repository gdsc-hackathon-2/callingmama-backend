const mysql = require("sync-mysql");

let connection = new mysql({
    host: '13.124.114.216',
    user: 'mmsg',
    password: 'msg123!@#',
    database: 'mmsgdb'
});

let res = connection.query("SELECT password FROM users;");
console.log(res)