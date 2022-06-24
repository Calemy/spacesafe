const fs = require('fs')
module.exports = async function(){
    if(!fs.existsSync('./config.js')){
        console.log("No config file found, creating config file")
        fs.writeFileSync('./config.js', `module.exports = {
    port: 2445,
    name: "Spacesafe",
    url: "https://share.catboy.best",
    database : {
        user : "",
        password: "",
        host: "localhost",
        database: "spacesafe"
    },
    private: false
}`)
 
        console.log("Creating folders")
        fs.mkdirSync('./profiles')
        fs.mkdirSync('./uploads')

        process.exit(0)
    }
}