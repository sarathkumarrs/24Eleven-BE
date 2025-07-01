const express=require('express')
const app=express()
let port=3001;
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const Category = require('./models/Category.model');
const categoryController = require('./controllers/categoryController');
const itemController=require('./controllers/itemController')
const categoryRoutes = require('./routes/categoryRoute');
const itemRoutes = require('./routes/itemRoute');
const connectDB = require('./config/db');

connectDB();

app.listen(port,(req,res)=>{
    console.log('server is running !')
})


app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/', categoryRoutes);
app.use('/', itemRoutes);