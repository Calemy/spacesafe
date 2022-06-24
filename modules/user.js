const { code, encryptPassword } = require('../helper/global')
const { private } = require('../config.js')
module.exports = {
    create : async function(req, reply){
        const { getUser, request, get } = require('../helper/database')
        console.log(req.body)

        const { username, password, invite } = req.body

        if(!username || !password || !invite) return { error: "Missing Parameters" }

        if(private){
            const inv = await get(`SELECT * FROM invites WHERE invite = '${invite}'`)
            if(!inv) return { error: "Invalid Invite" }
        }

        const username_safe = username.toLowerCase().replaceAll(' ', '_')

        const check = await getUser(username_safe)

        if(check) return { error: "This username is already in use"}

        if(password.length < 8) return { error : "Password must be at least 8 characters long" }

        const [ hash, key ] = await Promise.all([
            encryptPassword(password),
            code(16)
        ])

        request(`INSERT INTO users (username, username_safe, password, apikey) VALUES ('${username}', '${username_safe}', '${hash}', '${key}')`)
        if(private) request(`DELETE FROM invites WHERE invite = '${invite}'`)

        return {
            "status" : "success"
        }

    },
    auth : async function(req, reply){

    }
}