const fs = require('fs')
const md5 = require('md5')
const { getFile } = require('../helper/database')
module.exports = async function(req, reply){
    const file = await getFile(req.params.file)
    if(!file) return { error: 'File not found' }

    const hash = md5(`${file.name}-${file.original}`)

    reply.type(file.type);
    reply.send(fs.readFileSync(`./uploads/${hash}`))
}