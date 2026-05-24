const pool = require("../index");


// function to check if an email address exists in the DB
async function emailExists(email){
    const result = await pool.query("SELECT id FROM users WHERE email = $1;", [email])

    if(result.rowCount > 0){
        return true;
    }else{
        return false;
    }
}


// function to create a user in the DB
async function createUser(name, email, hashedPassword){
    const result = await pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3)", [name, email, hashedPassword]);

    if(result.rowCount > 0){
        return true;
    }else{ 
        return false;
    }
    
}


// funtion to check if the userExists in the DB
// // It returns either the user or Null
async function emailExistsAndPassword(email){
    const result = await pool.query("SELECT * FROM users WHERE email = $1;", [email])
    
    if(result.rowCount > 0){
        return result.rows[0];
    }else{
        return null;
    }
}

module.exports = {
    emailExists,
    createUser,
    emailExistsAndPassword
}