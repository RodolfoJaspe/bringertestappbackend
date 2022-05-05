const router = require('express').Router()
const Users = require("./users-model")
const bcrypt = require("bcryptjs");
const tokenBuilder = require("./token-builder")
const {ValidateLogin, ValidateUserNameUnique, ValidateRegistration} = require("./users-middleware")

router.get("/", (req, res, next ) => {
    Users.getAllUsers()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        }).catch(err => {
            next(err)
        })
})

router.get('/:id', async (req, res, next) => {
    try{
        const user = await Users.getUser(req.params.id)
        console.log("getuser router", user)
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
})

router.post('/register', ValidateUserNameUnique, /*ValidateRegistration,*/ async (req, res, next) => {

    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    try{
        const newUser = await Users.createUser(user)
        const token = tokenBuilder(newUser)
        console.log("register", newUser)
        res.status(201).json({newUser, token})
    }catch(err){
        next(err)
    }
})

router.post('/login', ValidateLogin, async (req, res, next) => {
    const { password } = req.body;
    const { user } = req; 
    const validUser = bcrypt.compareSync(password, user.password);
    if (validUser) {
        const token = tokenBuilder(user)
        res.status(200).json({ user , token });
    } else {
          next({ status: 401, message: 'Invalid Credentials. Please try again or register!'})
    }
})

router.delete('/:id', (req, res, next) => {
    Users.deleteUser(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router;