const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const router = Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')
// const Movie = require('../models/Movie')

const mongoose = require('mongoose')
const getJSON = mongooseCode => JSON.parse(JSON.stringify(mongooseCode))

const firebase = require('firebase/app')
const {getAuth, GoogleAuthProvider, signInWithPopup} = require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyB0Pg43yGladZhKFaS4_PqnDi-emi3FGP8",
    authDomain: "sandwich-941b8.firebaseapp.com",
    projectId: "sandwich-941b8",
    storageBucket: "sandwich-941b8.appspot.com",
    messagingSenderId: "735368375619",
    appId: "1:735368375619:web:63bede89a51ad2098113f6"
}

firebase.initializeApp(firebaseConfig)
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length should be 6').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to register'
                })
            }
            const {username, email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate)
                return res.status(400).json('User with this email already exists.')

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({username, email, password: hashedPassword})

            await user.save()

            res.status(201).json('User created.')
        } catch (e) {
            return res.status(500).json({message: `Error in auth.routes`})
        }
    }
)

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please, enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to login'
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user)
                return res.status(400).json({message: 'User do not found'})

            const isMatch = await bcrypt.compare(password, user.password).then(res => res)
            if (!isMatch)
                return res.status(400).json({message: 'Incorrect password. Try again.'})

            const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '2h'})
            res.json({token, userId: user.id})
        } catch (e) {
            return res.status(500).json({message: `Error in auth.routes`})
        }
    }
)

// /api/auth/loginWithGoogle
router.get(
    '/loginWithGoogle',
    [],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to login'
                })
            }

            signInWithPopup(auth, googleProvider)
                .then((userCredential) => {
                    const user = userCredential.user
                    if (!user)
                        return res.status(400).json({message: 'User do not found'})

                    const token = jwt.sign({userId: user.uid}, config.get('jwtSecret'), {expiresIn: '1h'})
                    res.json({token, userId: user.id})
                })
                .catch(e => {
                    console.error(e)
                })
        } catch (e) {
            return res.status(500).json({message: `Error in auth.routes`})
        }
    }
)

// /api/auth/getUsers
router.get(
    '/getUsers',
    [],
    async (req, res) => res.json(await User.find())
)


// /api/auth/getUserById
router.post(
    '/getUserById',
    [],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to get email'
                })
            }
            const {userId} = req.body

            const user = await User.findById(mongoose.Types.ObjectId(`${userId}`))
            if (!user)
                return res.status(400).json({message: 'User do not found'})
            return res.json({userId: user.id, username: user.username, email: user.email, favoriteMovies: user.favoriteMovies})
        } catch (e) {
            return res.status(500).json({message: `Error on getting email`})
        }
    }
)

// /api/auth/getFavorites?userId=0
router.get(
    '/getFavorites',
    [],
    async (req, res) => {
        try {
            const userId = req.query.userId
            const user = await User.findById(userId)

            if (!user)
                return res.status(400).json({message: 'User do not found'})
            const favMovies = getJSON(await User.findOne({_id: mongoose.Types.ObjectId(userId)}, {favoriteMovies: 1})).favoriteMovies

            return res.status(201).json(favMovies)
        } catch (e) {
            console.log(e)
        }
    }
)

// /api/auth/isFavoriteMovie?userId=0&movieId=0
router.get(
    '/isFavoriteMovie',
    [],
    async (req, res) => {
        try {
            const userId = req.query.userId
            const movieId = req.query.movieId

            const favMovies = getJSON(await User.findOne({_id: mongoose.Types.ObjectId(userId)}, {favoriteMovies: 1})).favoriteMovies
            const isFavoriteMovie = favMovies.some(movieObj => `${movieObj.movieId}` === `${movieId}`)

            return res.status(200).json(isFavoriteMovie)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e.message})
        }
    }
)

// /api/auth/addToFavoriteMovies
router.post(
    '/addToFavoriteMovies',
    [],
    async (req, res) => {
        try {
            const {userId, movieId} = req.body
            const user = await User.findById(mongoose.Types.ObjectId(userId))
            if (!user)
                return res.status(400).json({message: 'User do not found'})

            const favMovies = getJSON(user).favoriteMovies.filter(movie => movie.hasOwnProperty('movieId'))
            user.favoriteMovies = [
                ...getJSON(favMovies),
                {movieId}
            ]
            await user.save()

            return res.json({ok: true})
        } catch (e) {
            return res.status(500).json({ok: false, message: `Error on adding to favorites`})
        }
    }
)

// /api/auth/removeFromFavoriteMovies
router.post(
    '/removeFromFavoriteMovies',
    [],
    async (req, res) => {
        try {
            const {userId, movieId} = req.body
            const user = await User.findById(mongoose.Types.ObjectId(userId))
            if (!user)
                return res.status(400).json({message: 'User do not found'})

            user.favoriteMovies = user.favoriteMovies.filter(el => `${el.movieId}` !== `${movieId}`)
            await user.save()

            return res.json({ok: true})
        } catch (e) {
            return res.status(500).json({ok: false, message: `Error on adding to favorites`})
        }
    }
)

module.exports = router