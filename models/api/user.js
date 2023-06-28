const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const followingSchema = new Schema({
    id: {type: Schema.Type.ObjectId, ref: 'User'} //to check code later
})

const userSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, unique: true, trim: true, lowercase: true, required: true}, //
    password: {type: String, trim: true, minLength: 3, required: true},
    picture: {type:String},
    following: [followingSchema],
    moviesRecommended: {type: Schema.Type.ObjectId, ref: 'Movie'}, //make movieschmea in movie model
    watchHistory: {type: Schema.Type.ObjectId, ref:'Movie'},
    rentMovie: {type: Schema.Type.ObjectId, ref:'Movie'}
},{
    timestamps: true,
    toJSON: {
        transform: function(doc,ret) {
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
})

module.exports = model('User',userSchema)