const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../secrets")
const Users = require("./users-model")

const restricted = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(401).json({message:"Token required"})
    }
        jwt.verify(token,JWT_SECRET,(err,decoded) => {
            if(err){
                res.status(401).json({message:"Token invalid" + err.message})
            }else {
                req.decodedToken = decoded    
            }
            next()
        })
  
}

const ValidateUserNameUnique = async (req, res, next) => {
    const { username } = req.body
    try {
        const existing = await Users.findBy({ username })
        if(existing) {

            res.status(400).json({message: "Username already exists!"})
        } else {
            next()
        }
    } catch(error) {
        next(error)
    }
} 


const ValidateLogin = async (req, res, next) => {
  const { username } = req.body
  const existingUser = await Users.findBy({ username })
//   if(username === undefined || username.length < 3) {
//       next({ status: 400, message: 'Username must exist and be more than 3 characters!'})
//   } else if(typeof username !== 'string'){
//           res.status(400).json({message: 'username must not be a number!'})
//   } else    /// ALREADY VALIDATED IN THE FRONTEND ///
  if(!existingUser){
          res.status(404).json({message: 'User does not exist!'})
  } else {
    req.user = existingUser
    next()
  }
}

    const ValidateRegistration = (req, res, next) => {
        const { username, password } = req.body
        if(username === undefined || username.trim() === '') {
            next({ status: 400, message: 'Please enter a username!'})
        } else if(username.trim().length < 3) {
            next({ status: 400, message: 'Username must be at least 3 characters!'})
        } else if(password === undefined || password.trim() === '') {
            next({ status: 400, message: 'Please enter a password'})
        } else if(password.length < 6) {
            next({ status: 400, message: 'Password must be at least 6 characters!'})
        } else {
            next()
        }
    }

module.exports = { restricted, ValidateLogin, ValidateUserNameUnique,ValidateRegistration}