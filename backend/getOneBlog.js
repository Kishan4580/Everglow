const Blog = require("./schema/Blog.js")();
const getOneBlog = async (stream, slug) => {
    try {
        const blog = await Blog.findOne({ slug }).populate('createdBy', 'name email image');
        stream.respond({
            ':status': 200,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        console.log(blog);
        
        stream.end(JSON.stringify(blog));
    } catch (error) {
        stream.respond({
            ':status': 500,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        stream.end(JSON.stringify({ error: "Error fetching blog" }));
        console.error("Error fetching blog:", error);
    }
};

module.exports = getOneBlog;