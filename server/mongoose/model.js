const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: String,
    dept: String,
    desc: String,
    isApplied : Boolean,
    isRated: Boolean,
    rating: Number
})

module.exports = mongoose.model("Course", courseSchema)