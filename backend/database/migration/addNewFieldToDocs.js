const mongoose = require("mongoose");
const { connectDB } = require("../../connect.js")
const Product = require("../../schema/Product.js");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
connectDB()

const addDefaultInstockInProductDoc = async () => {
  const products = await Product.find();

  // for (const p of products) {
  //   if (!p.instock) {
  //     p.instock = Number(p.instock);
  //     await p.save();
  //   }
  // }

  await Product.updateMany({}, { $set: { instock: 20 } });
};

addDefaultInstockInProductDoc().then(() => {
  mongoose.connection.close();
  console.log('Migration complete!');
});
