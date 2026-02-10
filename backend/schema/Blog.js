// const blogSchema = new mongoose.Schema({
//     blogwritername : String,
//     blogwriteimageurl : String,
//     email : String,
//     blogdate : {type : Date, default : Date},
//     blogimageurl : String,
//     heading : String,
//     sections: [{subsection : String, text : String }]

// })

const mongoose = require('mongoose');
const Admin = require('./Admin.js');
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['heading', 'paragraph', 'list', 'image', 'quote', 'code'],
    required: true
  },
  data: mongoose.Schema.Types.Mixed, // dynamic data (object)
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [String],
  tags: [String],
  coverImage: { type: String }, // optional
  content: [contentBlockSchema], // dynamic blocks
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // ← sirf limited admins ke liye
  createdAt: { type: Date, default: Date.now },
});

module.exports = () => {
  const Blog = mongoose.model("Blog", blogSchema);
  return Blog;
};


