const User = require('../../models/api/user')
const Movie = require('../../models/api/movie')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')
const Account = require('../../models/api/account')

const create = async (req,res) => {
    try {
        await User.create(req.body)
        const user = await User.findOne({email: req.body.email})
        console.log(user)
        await Account.create({ user: user._id })
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

async function getAccount(req,res) {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        if (!user) throw new Error()
        const account = await Account.findOne({ user:user._id})
        .populate('user')
        .populate('following')
        .populate('rentedMovies')
        .populate('moviesRecommended')
        .populate('watchHistory')
        res.status(200).json(account)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updatePic(req,res) {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        if (!user) throw new Error()
        user.picture = req.body.url
        await user.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updatePass(req,res) {
    const userId = req.params.userId
    try {
        const user = await User.findOne({_id:userId})
        if (!user) throw new Error()
        const match = await bcrypt.compare(req.body.confirm,user.password)
        if (!match) throw new Error()
        user.password = req.body.password
        await user.save()
        console.log('saved')
        res.status(200).json(user)
    } catch (err) {
        console.log('not matching')
        res.status(400).json('Bad Credentials')
    }
}

module.exports = {
    create,
    login,
    checkToken,
    getAccount,
    updatePic,
    updatePass
}