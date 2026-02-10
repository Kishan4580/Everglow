const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const Blog = require('../../schema/Blog')();
const fs = require('fs');
const {connectDB} = require('../../connect.js');
const Admin = require('../../schema/Admin.js');
connectDB();
const blogsData = JSON.parse(fs.readFileSync('./blogs.json', 'utf-8'));
console.log(blogsData);

const importBlogs = async () => {
    try {
        await Blog.deleteMany(); // Clear existing blogs
        await Blog.insertMany(blogsData);
        console.log("Blogs imported successfully");
    } catch (error) {
        console.error("Error importing blogs:", error);
    }
};

importBlogs();
// you can delete because this is just for testing
const getOneBlog = async (slug) => {
    try {
        const blog = await Blog.findOne({ slug }).populate('createdBy', 'name email image');
        console.log(blog);
    } catch (error) {
        console.error("Error fetching blog:", error);
    }
};


const getBlogs = async () => {
    try {
        const blogs = await Blog.find().limit(10);
        console.log(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
};


// getOneBlog("unlock_the_secrets_of_healthy_skin")

