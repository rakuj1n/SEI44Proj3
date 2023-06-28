const User = require('../../models/api/user')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')
const user = require('../../models/api/user')

const SALT_ROUNDS = 6

const create = async (req,res) => {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.status(201).json(token)
    } catch (err) {
        res.status(400).json(err)
    }
}

function createJWT(user) {
    return jwt.sign({user},process.env.SECRET,{expiresIn:'24h'})
}

async function login(req,res) {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) throw new Error()
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error()
        res.status(200).json(createJWT(user))        
    } catch (err) {
        res.status(400).json('Bad Credentials')
    }
}

function checkToken(req,res) {
    console.log('req.user',req.user)
    res.json(req.exp)
}

module.exports = {
    create,
    login,
    checkToken
}