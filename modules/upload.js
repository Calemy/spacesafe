const md5 = require('md5')
const util = require('util')
const fs = require('fs')
const { pipeline } = require('stream')

const { code } = require('../helper/global')
const { getFile, getUserKey, request } = require('../helper/database')
const { url } = require('../config')

module.exports = async function(req, reply){
    const pump = util.promisify(pipeline)
    const file = await req.file()

    const user = await getUserKey(req.headers.key)

    if(!user) return { error: 'User not found' }
    if(!user.privileges & 1) return { error: 'Not enough privileges' }

    async function generateCode(){
        const c = await code(7)
        const filecheck = await getFile(c)
        if(filecheck) return generateCode()
        return c
    }

    const identifier = await generateCode()

    const hash = md5(`${identifier}-${file.filename}`)

    await pump(file.file, fs.createWriteStream(`./uploads/${hash}`)).then(async () => {
        request(`INSERT INTO files (user, name, original, type, submit) VALUES (${user.id}, '${identifier}', '${file.filename}', '${file.mimetype}', ${Math.floor(Date.now() / 1000)})`)
    })

    return {
        user: user.username,
        file: file.filename,
        url: `${url}/${identifier}`
    }
}