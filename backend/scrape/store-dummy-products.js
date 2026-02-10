const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const Product = require('../schema/Product.js'); // tumhara Product schema
// dotenv.config({path: '../config/.env'})
const products = require('./products.json');
// const mUri = process.env.mongoUri;
// mongoose.connect(mUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(
// 
async function insertDummyData()  {
//     console.log('Connected to DB');
    await Product.insertMany(products);
    console.log('All products inserted!');
    process.exit();
  }
  // .catch(err => console.error(err));
insertDummyData();