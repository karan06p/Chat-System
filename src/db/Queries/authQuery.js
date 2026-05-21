const pool = require("../index");

async function emailExits(email){
    const result = await pool.query("SELECT id FROM users WHERE email = $1;", [email])

    if(result.rowCount > 0){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    emailExits,
}