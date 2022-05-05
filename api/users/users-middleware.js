const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../secrets")
const Users = require("./users-model")

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    console.log("token " + token)
    if(!token){
        res.status(401).json({message:"Token required"})
        console.log("no token")
    }
        jwt.verify(token,JWT_SECRET,(err,decoded) => {
            if(err){
                console.log("error in the verify")
                res.status(401).json({message:"Token invalid" + err.message})
            }else {
                console.log("good token")
                req.decodedToken = decoded   
                next()
            }
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
  const { username, password } = req.body
  const existingUser = await Users.findBy({ username })
  if(!existingUser){
    res.status(404).json({message: 'User does not exist!'})
  } else if(username === undefined || username.trim() === '') {
    next({ status: 400, message: 'Please enter a username!'})
  } else if(password === undefined || password.trim() === '') {
    next({ status: 400, message: 'Please enter a password'})
  } else {
    req.user = existingUser
    next()
  }
}

    const ValidateRegistration = (req, res, next) => {
        const { username, password } = req.body
        if(username === undefined || username.trim() === '') {
            next({ status: 400, message: 'Please enter a username!'})
        } else if(password === undefined || password.trim() === '') {
            next({ status: 400, message: 'Please enter a password'})
        } else {
            next()
        }
    }

module.exports = { restricted, ValidateLogin, ValidateUserNameUnique,ValidateRegistration}