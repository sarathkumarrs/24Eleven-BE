const Category = require('../models/Category.model');
const Item = require('../models/Items.model');
const mongoose = require('mongoose');

main().then(() => {
  console.log("Connected to DB!");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/24ElevenTest');
  await Category.deleteMany({});
  await Item.deleteMany({});

  const categories = await Category.insertMany([
    { name: 'Fruits & Vegetables', description: 'Fresh fruits and vegetables' },
    { name: 'Cold Drinks & Juices', description: 'Refreshing beverages and juices' },
    { name: 'Snacks & Munchies', description: 'Tasty and quick snacks' },
    { name: 'Bakery & Biscuits', description: 'Breads, cakes, and cookies' },
    { name: 'Atta,Dal & Rice', description: 'Staple grains and pulses' }
  ]);

  console.log('Categories inserted:', categories);

  const items = await Item.insertMany([
    {
      name: 'Apple',
      price: 20,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/d5326074-97e2-46d0-af38-59041016468f.jpg?ts=1711473682',
      categoryId: categories[0]._id,
      description: 'Fresh red apples rich in nutrients.',
      stock_quantity: 100,
      discount_limit: 10,
      cashback_percentage: 5,
      cashback_limit: 20
    },
    {
      name: 'Tomato',
      price: 38,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/667ea47a-84c8-4a73-86fc-a0c8c8281170.jpg?ts=1748187119',
      categoryId: categories[0]._id,
      description: 'Juicy tomatoes for cooking and salads.',
      stock_quantity: 80,
      discount_limit: 5,
      cashback_percentage: 3,
      cashback_limit: 10
    },
    {
      name: 'B Natural Orange Juice',
      price: 50,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/e3a87d62-3fb6-45bf-9956-c0bb89cbfd78.jpg?ts=1749646368',
      categoryId: categories[1]._id,
      description: 'Refreshing orange juice with real pulp.',
      stock_quantity: 60,
      discount_limit: 15,
      cashback_percentage: 4,
      cashback_limit: 10
    },
    {
      name: 'Coca-Cola Zero sugar',
      price: 50,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/products/sliding_image/484783a.jpg?ts=1688628436',
      categoryId: categories[1]._id,
      description: 'Zero sugar fizzy drink.',
      stock_quantity: 90,
      discount_limit: 10,
      cashback_percentage: 2,
      cashback_limit: 8
    },
    {
      name: 'Lays Classic salted Potato Chips',
      price: 20,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/products/sliding_image/57435a.jpg?ts=1688627217',
      categoryId: categories[2]._id,
      description: 'Crispy and salty potato chips.',
      stock_quantity: 200,
      discount_limit: 20,
      cashback_percentage: 5,
      cashback_limit: 15
    },
    {
      name: 'Act II Caramal Bliss Popcorn',
      price: 45,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/products/sliding_image/432831a.jpg?ts=1687523480',
      categoryId: categories[2]._id,
      description: 'Sweet caramel coated popcorn.',
      stock_quantity: 150,
      discount_limit: 10,
      cashback_percentage: 6,
      cashback_limit: 12
    },
    {
      name: 'American Garden plain Bread',
      price: 70,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1a254aad-29ca-43a1-9738-be6368bc06b0.jpg?ts=1708588996',
      categoryId: categories[3]._id,
      description: 'Soft white bread loaf.',
      stock_quantity: 50,
      discount_limit: 5,
      cashback_percentage: 3,
      cashback_limit: 5
    },
    {
      name: 'Unibic Cashew Badam Cookies',
      price: 40,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/b492f203-2450-448d-a2a5-975f3d7f59d3.jpg?ts=1746602213',
      categoryId: categories[3]._id,
      description: 'Nutty cookies with cashew and almond.',
      stock_quantity: 120,
      discount_limit: 12,
      cashback_percentage: 7,
      cashback_limit: 10
    },
    {
      name: 'Daawat Basmati Rice',
      price: 40,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/59e863fe-8ee3-44a1-903a-fd46d8081555.jpg?ts=1749193757',
      categoryId: categories[4]._id,
      description: 'Long grain premium basmati rice.',
      stock_quantity: 300,
      discount_limit: 20,
      cashback_percentage: 10,
      cashback_limit: 25
    },
    {
      name: 'Whole Farm Premium Mansoor Dal',
      price: 60,
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/0c8c13ea-30a1-482c-8891-8e4ea1b4ac3e.jpg?ts=1712825440',
      categoryId: categories[4]._id,
      description: 'Protein-rich premium dal.',
      stock_quantity: 250,
      discount_limit: 15,
      cashback_percentage: 5,
      cashback_limit: 18
    }
  ]);

  console.log('Items inserted:', items);
}
