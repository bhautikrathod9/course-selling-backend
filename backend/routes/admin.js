const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { adminModel, courseModel } = require("../models/db")
const { adminMiddleware } = require('../middleware/admin')

const router = express.Router();
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET || "5114"

router.post('/admin/signup', async (req, res) => {
    const { email, password, firstname, lastname } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new adminModel({email, password: hashedPassword, firstname, lastname});
        await user.save();

        return res.status(201).json({ success: true, message: 'ADMIN registered successfully', userId: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });   
    }
})

router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await adminModel.findOne({email})
        if(!user){
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const token = jwt.sign({ userId : user._id}, JWT_ADMIN_SECRET, { expiresIn : '1hr' })

        return res.status(200).json({ success: true, token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

router.post('/admin/course', adminMiddleware, async (req, res) => {
    const adminId = req.userid;

    const { title, description, imageUrl, price } = req.body;

    const course = new courseModel({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })
    await course.save();

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

module.exports = router;