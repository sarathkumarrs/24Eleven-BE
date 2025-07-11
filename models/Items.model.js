const mongoose=require('mongoose')

const ItemSchema = new mongoose.Schema({
    name:{type: String,required:true},
    price:Number,
    image:String,
    categoryId:{ type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},
    description:String,
    stock_quantity:Number,
    discount_limit:Number,
    cashback_percentage:Number,
    cashback_limit:Number,
  });
  
  module.exports = mongoose.model('Item', ItemSchema);