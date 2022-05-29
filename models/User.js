const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username: {type: String, required: false, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    favoriteMovies: [{ movieId: Number, required: false}]
})

module.exports = model('User', schema)