const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db')
const authRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const purchaseRoute = require('./routes/course')


dotenv.config()

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
connectDB();

app.use('/auth', authRoutes)
app.use('', adminRoutes)
app.use('/user', purchaseRoute)
app.use('/auth', adminRoutes)

app.listen(PORT, () => {
    console.log("server is live on port :", PORT);
})