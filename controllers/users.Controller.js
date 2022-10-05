const userModel = require ("./")

const bcrypt = required ('bcrypt')

const getAllUsers = async (req, res, next) =>{
    try{
        const authenticatedUser = req.authenticatedUser

        if (!authenticatedUser) {
            return res.status(401).send({message: "Unauthorised"})
        }

        const users = await userModel.find({}, {username: 1, user_type:1})

        return res.json({status: true, users})
    }catch (err){
        return res.status(500).json({status: false, data:err.message})
    }
      
}

// create a user