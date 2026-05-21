const pool = require('../../db');
const { emailExits } = require('../../db/Queries/authQuery');
const { hashPassword } = require('../../utils/password');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function signUp(req, res){
    try {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
    
        if(!emailRegex.test(email)){
            console.log("Not an email");
            return res.send("Provide a valid email");
        }
        
        const result = await emailExits(email);
    
        if(result){
            res.status(201).json({
                res: "User Already Exists"
            })
        }else{
            const hashedPassword = await hashPassword(password);
            const result = await pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3)", [name, email, hashedPassword]);

            res.status(200).json({
                res: "User Created Successfully"
            })
        }

        
    } catch (error) {
        console.error("Internal Server Error");
        res.status(500).json({
            res: "Internal Server Error",
            location: "Sign-Up.js"
        })
    }
}

module.exports = {
    signUp,
}