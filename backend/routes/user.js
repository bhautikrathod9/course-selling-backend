const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require("../models/db")

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "5114"

router.post('/user/signup', async (req, res) => {
    const { email, password, firstname, lastname } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({email, password: hashedPassword, firstname, lastname});
        await user.save();

        return res.status(201).json({ success: true, message: 'User registered successfully', userId: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });   
    }
})

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const token = jwt.sign({ userId : user._id}, JWT_SECRET, { expiresIn : '1hr' })

        return res.status(200).json({ success: true, token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

module.exports = router;