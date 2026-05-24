const pool = require('../../db');
const { emailExists, emailExistsAndPassword, createUser } = require('../../db/Queries/authQuery');
const { hashPassword } = require('../../utils/password');

// regex to check for a valid email address
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function signUp(req, res){
    try {
        // get the required parameters from the request body as provided in JSON format
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
    
        if(!email || !name || !password){
            return res.status(400).json({
                res: "Provide All Required Inputs"
            })
        }


        // check if the given email is a valid email 
        if(!emailRegex.test(email)){
            console.log("Not an email");
            return res.send("Provide a valid email");
        }
        
        // check if email already exists in the DB
        const result = await emailExists(email);

        // if email already exists
        if(result){
            return res.status(201).json({
                res: "User Already Exists"
            });
        }
        else{ // else if the email is new create a new user in the DB
            const hashedPassword = await hashPassword(password);
           
            const userCreated = createUser(name, email, hashedPassword);
            
            if(!userCreated){
                return res.status(500).json({
                    res: "Error Creating User",
                    location: "Sign-Up.js"
                });
            }

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