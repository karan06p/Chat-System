async function signIn(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;
    
        if(!emailRegex.test(email)){
            console.log("Not an email");
            res.send("Provide a valid email");
        }
        
        const result = await emailExits(email);

        if(!result){
            res.status(201).json({
                res: "User Does Not Exists"
            })
        }else{
            // CONTINUE
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
    signIn,
}