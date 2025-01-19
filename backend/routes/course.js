const express = require('express')
const jwt = require('jsonwebtoken')
const { purchaseModel, courseModel } = require('../models/db')
const { userMiddleware } = require('../middleware/user')
const { adminMiddleware } = require('../middleware/admin')

const router = express.Router();

router.post('/purchases',userMiddleware, async (req, res) => {
    const userId = req.userid;
    const { courseId } = req.body

    const purchases = new purchaseModel({
        userId,
        courseId
    })

    await purchases.save();

    res.json({
        message: "You succesfully make a purchase",
        purchaseId: purchases._id
    })
})

router.get('/preview', adminMiddleware, async (req, res) => {
    try {
        const courses = await courseModel.find({}); // Corrected: removed 'new'

        res.json({
            courses
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
});

module.exports = router