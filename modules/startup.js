const fs = require('fs')
module.exports = async function(){
    if(!fs.existsSync('./config.js')){
        console.log("No Version file found, creating config file")
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
        process.exit(0)
    }
}