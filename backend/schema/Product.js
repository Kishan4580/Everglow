const fs =require('fs');
const path =require('path');
const mongoose = require("mongoose");
const {connectDB} =require("../connect.js")

connectDB()

const reviewSchema = new mongoose.Schema({
  reviewname: String,
  reviewerimage: { bindata: Buffer },
  review: String,
  email: String,
  rating: { type: Number, min: 1, max: 5 },
  reviewdate: { type: Date, default: Date.now }
});

const rangeSchema = new mongoose.Schema({
  quantity: String,
  unit: String,
  price: Number,
  discount: Number,
  dimension: {
    l: Number,
    b: Number,
    h: Number,
    unit : String
  },
  color: String,
  sku: Number,
  image : [{type : String}],
  isbiodegradable: Boolean,
});

const productSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  productimage: [{ bindata: Buffer }],
  productdesc: String,
  skuno: Number,
  categories: [{type : String}],
  
  // ye field sirf client bhar sakta hai
  range: [rangeSchema],
  instock : {type : Number, min : 0, default : 20},
  // ye field sirf user bhar sakta hai
  reviews: [reviewSchema],
  // optional: kis client ne ye product banaya
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // product kab add hua
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);

