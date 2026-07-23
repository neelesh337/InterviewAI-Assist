const { default: mongoose } = require('mongoose');
const usermodel = require('../models/user.model');
const tokenBlacklistModel = require('../models/blacklist.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @name registerUserController
 * @description register new user and expect username,email,password
 * @access Public
 */

async function registerUserController(req, res) {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide details"
        })
    }

    const isUserAlreadyRegistered = await usermodel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyRegistered) {
        return res.status(400).json({
            message: "User already registered"
        })
    }

    // hash password first with bcrypt => then create token => send to browser with res.cookie => make user json 
    const hash = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description login by authentication user with username,email,password
 * @access Public
 */

async function loginUserController(req, res) {
    const { username, email, password } = req.body;

    const user = await usermodel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
        message: "user login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description logout user and clear token and blacklist it
 * @access Public
 */

async function logoutUserController(req,res) {
    console.log(req.body);
    
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token}); 
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "user logged out successfully"
    })
}

/**
 * @name getMeUserController
 * @description used to get user details
 * @access Public
 */

async function getMeUserController(req,res) {
    const user = await usermodel.findById(req.user.id);

    return res.status(200).json({
        user : {
            id: user.id,
            username : user.username,
            email : user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeUserController
}