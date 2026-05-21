const { getAllUsers } = require("../db/Queries/userQuery");

async function fetchUsers(req, res){
    try {
     const users = await getAllUsers();
     
     res.json(users);
    } catch (error) {
        console.error(err);
        
        res.status(500).json({
            error: "Internal Server Error",
            location: "userController.js"
        })
    }
}

module.exports = {
    fetchUsers,
}