const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// const fire = require('../api/firebase')

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

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to register'
                })
            }
            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate)
                return res.status(400).json('User with this email already exists.')

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()
            // console.log(user)

            res.status(201).json('User created.')
        } catch (e) {
            res.status(500).json({message: `Error in auth.routes`})
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

            // fire.auth().signInWithEmailAndPassword(email, password)
            //     .catch((e) => console.error('Incorrect username or password');

            const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '1h'})

            res.json({token, userId: user.id})
        } catch (e) {
            res.status(500).json({message: `Error in auth.routes`})
        }
    }
)

// /api/auth/getEmailById
router.post(
    '/getEmailById',
    [
        // check('id', 'Please, enter correct id').isDecimal()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to get email'
                })
            }
            const { userId } = req.body

            const user = await User.findOne({userId})
            if (!user)
                return res.status(400).json({message: 'User do not found'})

            res.json({userId: user.id, email: user.email})
        } catch (e) {
            res.status(500).json({message: `Error on getting email`})
        }
    }
)

module.exports = router