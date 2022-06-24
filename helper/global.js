const bcrypt = require('bcrypt')
const md5 = require('md5')
module.exports = {
    code : async function(length){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    checkPassword : async function(password, hash){
        return await bcrypt.compare(md5(password), hash)
    },
    encryptPassword : async function(password){
        return await bcrypt.hash(md5(password), 10)
    }
}