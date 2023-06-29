const mongoose = require('mongoose')
const { Schema, model } = mongoose

const accountSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
    moviesRecommended: [{type: Schema.Types.ObjectId, ref: 'Movie'}], 
    watchHistory: [{type: Schema.Types.ObjectId, ref:'Movie'}],
    rentedMovies: [{type: Schema.Types.ObjectId, ref:'Movie'}]
},{
    timestamps: true,
})

module.exports = model('Account',accountSchema)