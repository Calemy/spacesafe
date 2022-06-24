const mysql = require('mysql-await')

module.exports = {
    connect : async function(){
        const { host, user, password, database } = require('../config.js').database
        con = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        })
    },
    request : async function(query){
        return await con.awaitQuery(query)
    },
    get : async function(query){
        return (await con.awaitQuery(query))[0]
    },
    getUser : async function(name){
        return (await con.awaitQuery(`SELECT * FROM users WHERE username_safe = '${name.toLowerCase().replaceAll(" ", "_")}'`))[0]
    },
    getUserKey : async function(key){
        return (await con.awaitQuery(`SELECT * FROM users WHERE apikey = '${key}'`))[0]
    },
    getFile : async function(file){
        return (await con.awaitQuery(`SELECT * FROM files WHERE name = '${file}'`))[0]
    }
}