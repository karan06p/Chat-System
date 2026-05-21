const pool = require("../index");

async function getAllUsers(){
    const result = await pool.query("SELECT * from users");

    return result.rows;
}

module.exports = {
    getAllUsers,
}