const { getUser } = require('../helper/database')
const { checkPassword } = require('../helper/global')
const fs = require('fs')
module.exports = async function(req, reply){
    const { u, p } = req.query

    const username = u
    const password = p

    if(!username || !password) return { error: 'Missing parameters' }

    const user = await getUser(username)
    if(!user) return { error: 'User not found' }

    if(!await checkPassword(password, user.password)) return { error: 'Incorrect password'}
    reply.header('Content-Disposition', `attachment; filename="catboy.best.sxcu"`)

    if(fs.existsSync(`./profiles/${user.id}.sxcu`)) reply.send(fs.readFileSync(`./profiles/${user.id}.sxcu`))

    let sharex = require('../helper/sharex')

    sharex.Headers.key = user.apikey

    fs.writeFileSync(`./profiles/${user.id}.sxcu`, JSON.stringify(sharex, null, 4))

    reply.send(fs.readFileSync(`./profiles/${user.id}.sxcu`))
}