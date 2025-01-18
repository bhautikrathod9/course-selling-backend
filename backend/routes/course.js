const express = require('express')
const jwt = require('jsonwebtoken')
const { purchaseModel } = require('../models/db')
const { userMiddleware } = require('../middleware/user')

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

module.exports = router