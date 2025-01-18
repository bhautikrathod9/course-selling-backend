const mongoose = require('mongoose');

const connectDB = async () => {
   try {
        const url = process.env.mongoDb_url;
        await mongoose.connect(url);
        console.log('mongodb connected')
   } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
   }
}

module.exports = connectDB;