const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: String,
    imageUrl: String,
    creatorId: objectId
})

const purchaseSchema = new Schema({
    userId: objectId,
    courseId: objectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}