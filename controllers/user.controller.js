const UserModel = require('../models/user.model')
const generateToken = require('../utils/jwt')
const ValidateUser = require('../validator/user.validator')

const register = async (req, res) => {
    const { username, password, email } = req.body
    const { errors, isValid } = ValidateUser(req.body)
    try {
        if (!isValid) {
            res.status(404).json({ msg: errors });
        } else {
            const user = await UserModel.findOne({ email })
            if (user) {res.status(400).json({ msg: 'Email already Exists' })}else{
                 const newUser = await UserModel.create({
                username, password, email
            })
            if (newUser) {
                // status 201 means sth was CREATED
                res.status(201).json({
                    msg: "Register Successful",
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                })
            }
            }
           
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(400).json({ msg: "User does not exist." })
        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })
        if (user) return res.json({
            msg: "Login Successful",
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    login,
    register
}