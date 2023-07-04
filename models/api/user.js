const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, unique: true, trim: true, lowercase: true, required: true},
    password: {type: String, trim: true, minLength: 8, required: true},
    picture: {type:String, default:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"}
},{
    timestamps: true,
    toJSON: {
        transform: function(doc,ret) {
            delete ret.password
            delete ret.email
            return ret
        }
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,parseInt(process.env.SALT_ROUNDS))
    return next()
})

module.exports = model('User',userSchema)