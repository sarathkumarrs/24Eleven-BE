const express=require('express')
const app=express()
let port=3001;
app.use(express.json());

const cors = require('cors');
app.use(cors());
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require('mongoose');
// app.use(express.json());
// const Category = require('./models/Category.model');
// const categoryController = require('./controllers/categoryController');
// const itemController=require('./controllers/itemController')
app.use(morgan("dev")); 
const AuthRouter = require('./routes/auth.route');
const FranchiseRouter = require('./routes/franchise.route');
// const itemRoutes = require('./routes/itemRoute');
const connectDB = require('./config/db');

connectDB();

app.listen(port,(req,res)=>{
    console.log('server is running !')
})


app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/user', AuthRouter);
app.use('/franchises',FranchiseRouter)
// app.use('/', itemRoutes);