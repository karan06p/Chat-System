require('dotenv').config();
const jwt = require("jsonwebtoken");


const { emailExistsAndPassword } = require("../../db/Queries/authQuery");
const { comparePassword } = require("../../utils/password");

// regex to check for a valid email address
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET not defined in .env");
}

async function signIn(req, res){
    try {
        // get the required parameters from the request body as provided in JSON format
        const email = req.body.email;
        const password = req.body.password;

        // if any parameter is not received, return
        if(!email || !password){
            return res.status(400).json({
                res: "Provide All Required Inputs"
            })
        }


        // test for a valid email address
        if(!emailRegex.test(email)){
            return res.send("Provide a valid email");
        }
        
        // check if the user is applicable for login by checking if email already exists
        const result = await emailExistsAndPassword(email);

        if(result === null){
            return res.status(401).json({
                res: "Invalid Credentials"
            });
        }
        else{ 
            const passwordMatch = await comparePassword(password, result.password);

            if(passwordMatch){
                // Generate jwt token to store in cookies for auth
                const token = jwt.sign(
                    {
                        uid: result.id
                    },
                    jwtSecret,
                    {
                        expiresIn: "1d" // this token expires in 1 day(24hrs)
                    }
                    
            )
                
                    

                return res.cookie("auth", token).status(200).json({
                    res: "User Signed In Successfully",
                })
            }
            else{ // If password is incorrect

                return res.status(401).json({
                    res: "Invalid Credentials",
                });

            }
        }

        
    } catch (error) {
        console.error("Internal Server Error");
        res.status(500).json({
            res: "Internal Server Error",
            location: "Sign-In.js"
        })
    }
}

module.exports = {
    signIn,
}