const express=require('express')
const app=express()
let port=3000;
app.use(express.json());

const mongoose = require('mongoose');
const Category = require('./models/Category.model');
const categoryController = require('./controllers/categoryController');
const itemController=require('./controllers/itemController')

mongoose.connect('mongodb://127.0.0.1:27017/24ElevenTest')
  .then(() => console.log('Connected to DB!'))
  .catch((err) => console.log(err));

app.listen(port,(req,res)=>{
    console.log('server is running !')
})


app.get('/',(req,res)=>{
    res.send('hello')
})

app.get('/Categories', categoryController.getAllCategories);
app.get('/items/:categoryId', itemController.getItemsByCategory);