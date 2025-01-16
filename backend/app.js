const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
connectDB();

app.use('/auth', authRoutes)
// app.use('', authRoutes)

app.listen(PORT, () => {
    console.log("server is live on port :", PORT);
})