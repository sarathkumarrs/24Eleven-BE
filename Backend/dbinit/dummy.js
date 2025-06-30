const Category=require('../models/Category.model');
const ItemsModel = require('../models/Items.model');
const Item=require('../models/Items.model')
const mongoose = require('mongoose');

main().then(()=>{
    console.log("Connected to DB!")
}).catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/24ElevenTest');
  await Category.deleteMany({})
  await Item.deleteMany({})
  const categories=await Category.insertMany([
    {name:'Fruits & Vegetables'},
    {name:'Cold Drinks & Juices'},
    {name:'Snacks & Munchies'},
    {name:'Bakery & Biscuits'},
    {name:'Atta,Dal & Rice'}
  ])
  console.log('Categories inserted:',categories)

  const items=await Item.insertMany([
    {
        name: 'Apple',
        price: 20,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/d5326074-97e2-46d0-af38-59041016468f.jpg?ts=1711473682',
        categoryId: categories[0]._id
      },
      {
        name: 'Tomato',
        price: 38,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/667ea47a-84c8-4a73-86fc-a0c8c8281170.jpg?ts=1748187119',
        categoryId: categories[0]._id
      },

      {
        name: 'B Natural Orange Juice',
        price: 50,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/e3a87d62-3fb6-45bf-9956-c0bb89cbfd78.jpg?ts=1749646368',
        categoryId: categories[1]._id
      },
      {
        name: 'Coca-Cola Zero sugar',
        price: 50,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/products/sliding_image/484783a.jpg?ts=1688628436',
        categoryId: categories[1]._id
      },


      {
        name: 'Lays Classic salted Potato Chips',
        price: 20,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/products/sliding_image/57435a.jpg?ts=1688627217',
        categoryId: categories[2]._id
      },
      {
        name: 'Act II Caramal Bliss Popcorn',
        price: 45,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/products/sliding_image/432831a.jpg?ts=1687523480',
        categoryId: categories[2]._id
      },

      {
        name: 'American Garden plain Bread',
        price: 70,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1a254aad-29ca-43a1-9738-be6368bc06b0.jpg?ts=1708588996',
        categoryId: categories[3]._id
      },
      {
        name: 'Unibic Cashew Badam Cookies',
        price: 40,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/b492f203-2450-448d-a2a5-975f3d7f59d3.jpg?ts=1746602213',
        categoryId: categories[3]._id
      },
      {
        name: 'Daawat Basmati Rice',
        price: 40,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/59e863fe-8ee3-44a1-903a-fd46d8081555.jpg?ts=1749193757',
        categoryId: categories[4]._id
      },
      {
        name: 'Whole Farm Premium Mansoor Dal',
        price: 60,
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/0c8c13ea-30a1-482c-8891-8e4ea1b4ac3e.jpg?ts=1712825440',
        categoryId: categories[4]._id
      }
  ])
  console.log('items inserted:',items)
}