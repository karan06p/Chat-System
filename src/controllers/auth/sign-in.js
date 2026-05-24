const { emailExistsAndPassword } = require("../../db/Queries/authQuery");
const { comparePassword } = require("../../utils/password");

// regex to check for a valid email address
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


async function signIn(req, res){
    try {
        // get the required parameters from the request body as provided in JSON format
        const email = req.body.email;
        const password = req.body.password;
         
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
            return res.status(201).json({
                res: "User Does Not Exists"
            })
        }else{
            const passwordMatch = await comparePassword(password, result);
            if(passwordMatch){


                // todo -> ASSIGN LOGIN TOKEN

                
                return res.status(200).json({
                    res: "User Signed In Successfully",
                })
            }else{
                return res.status(401).json({
                    res: "Invalid Credentials",
                })
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