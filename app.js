const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');



// app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


//DB
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@orhasson-z3mq0.mongodb.net/${process.env.DB_MONGO_DATABASE}?retryWrites=true&w=majority`,{ useNewUrlParser: true ,useCreateIndex: true,useUnifiedTopology:true })
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log("DB Connected")
    })
    .catch(err => {
        console.log(err);
    });




