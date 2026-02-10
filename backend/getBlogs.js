const Blog = require('./schema/Blog.js')();

const getBlogs = async (stream, blogCount = 10) => {
    try {
        const blogs = await Blog.find().limit(blogCount);
        if (stream.destroyed) {
            console.log("Stream destroyed and auto-restarted...");
            getBlogs(stream, blogCount);
            return;
        }
        stream.respond({
            ':status': 200,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        stream.end(JSON.stringify(blogs));
    } catch (error) {
        console.error("Error fetching blogs:", error);
        if (stream.destroyed) {
            console.log("Stream destroyed and restarting...");
            getBlogs(stream, blogCount);
            return;
        }
        stream.respond({
            ':status': 500,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        stream.end(JSON.stringify({ status : 500, message: "Internal server error" }));
    }
};

module.exports = getBlogs;