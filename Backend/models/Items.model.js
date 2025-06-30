const mongoose=require('mongoose')

const ItemSchema = new mongoose.Schema({
    name:{type: String,required:true},
    price:Number,
    image:String,
    categoryId:{ type:Schema.Types.ObjectId,ref:'Category',required:true},
  });
  
  module.exports = mongoose.model('Item', ItemSchema);