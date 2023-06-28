const mongoose = require('mongoose')
const { Schema, model } = mongoose

const actorSchema = new Schema({
    actorName: {type: String}
})

const commentSchema = new Schema({
    userId: {type: String},
    comment: {type: String} 
},{timestamps: true})

const movieSchema = new Schema({
    title: {type: String},
    actor: [actorSchema],
    details: {type: String},
    poster: {type: String},
    director: {type: String},
    nowShowing: {type: Boolean},
    comments: [commentSchema]
})