const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-errors');
const User = require('../models/user');

const router = express.Router();

const getUsers = async(req, res, next) => {
    let users;

    try {
        users = await User.find({}, "-password");
    } catch(error) {
        return next(new HttpError('Fetching users failed', 500));
    }

    res.json({ users: users.map(user => user.toObject({getters: true}))})
}

const signup = async(req, res, next) => {
    const validationErrors = validationResult(req);
    if(! validationErrors.isEmpty) {
        return next(new HttpError('Invalid inputs passed, please check data.', 422))
    }

    const { username, password } = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({username: username});
    } catch(error) {
        return next(new HttpError("Something went wrong, signup failed.", 500));
    }

    if(existingUser) {
        return next(new HttpError('This user already exists.', 422));
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
         return next(new HttpError('Could not create user', 500));
    }

    const createdUser = new User({
        username,
        password: hashedPassword
    });

    try {
        await createdUser.save();
    } catch(err) {
        return next(new HttpError('Signup failed', 500));
    }

    let token;

    try {
        token = jwt.sign(
            {userId: createdUser.id, username: createdUser.username},
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch(err) {
        return next(new HttpError('Signup failed', 500));
    }

    res.status(201).json({ userId: createdUser.id, username: createdUser.username, token: token })
}

const login = async(req, res, next) => {
    const { username, password } = req.body;

    console.log(username + "" + password);

    let existingUser;

    try {
        existingUser = await User.findOne({ username: username })
    } catch(error) {
        return next(new HttpError('Signin failed', 403));
    }

    if(!existingUser) {
        return next(new HttpError('Invalid credentials', 403))
    }

    let isValidPassword = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    }catch(error) {
        return next(new HttpError('Invalid credentials', 403));
    }

    let token;

    try {
        token = jwt.sign(
            { userId: existingUser.id, username: existingUser.username},
            process.env.JWT_KEY,
            {expiresIn: '1h'}
        );
    } catch(err) {
        return next(new HttpError('Login failed', 500));
    } 

    res.json({
        userId: existingUser.id,
        username: existingUser.username,
        token: token
    })
}

const patchUser = async(req, res, next) => {
    const {
        username,
        password,
    } = req.body;


    const userId = req.params.id;

    let user;

    try {
        user = await User.findById(userId);
    } catch (err){}

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
         return next(new HttpError('Could not create user', 500));
    }

    user.password = hashedPassword;
    user.username = username;

    try {
        await user.save();
    } catch(err) {}

    res.status(200).json({user: user.toObject({ getters: true })});
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.patchUser = patchUser;