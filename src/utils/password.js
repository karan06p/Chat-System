const bcrypt = require('bcrypt');

async function hashPassword(password){
    try{
        const hash = await bcrypt.hash(password, 12);
        return hash;
    } catch(err){
        console.error("Error occured in hashing password");
        throw err;
    }
}

async function comparePassword(password, hashedPassword){
    try{
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch(err){
        console.error("Error occured in comparing password");
        throw err;
    }
}

module.exports = {
    hashPassword, 
    comparePassword
}