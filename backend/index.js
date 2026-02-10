
// nodejs core modules
require('dotenv').config({ path: join(__dirname, 'config', '.env') }); // Load environment variables from .env file

const http2 = require('http2');
const fs = require('fs').promises;
const { join } = require('path');
const mongoose = require("mongoose");
const { readFileSync, writeFileSync } = require("fs")
const path = require("path");

// mongoose model
const Product = require("./schema/Product")
// own's function
const getBlogs = require("./getBlogs");
const getProductInfo = require("./getproduct");
const getOneBlog = require("./getOneBlog.js");
const getOneProductInfo = require("./getOneProductInfo");
const getBestsellerProducts = require("./getBestsellerProducts");
const getCartDesc = require("./getCartDesc")
const getCategoryProducts = require("./getcategoryproducts");
const { sentEmailToUser } = require("./sentEmail");
const getProductsCount = require("./getProductsCount");
const { log } = require('console');

const server = http2.createSecureServer({
    key: readFileSync('localhost-privkey.pem'),
    cert: readFileSync('localhost-cert.pem')
});
server.on('stream', (stream, headers) => {
    stream.on('error', (error) => console.error("Error on stream : ", error));
    const reqPath = headers[':path'];
    const headerObject = headers;
    const method = headerObject[':method']
    console.log("Path of client request : ", reqPath);
    console.log("Client's request method : ", method);

    if (reqPath === "/") {
        stream.respond({
            ':status': 200,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/html; charset=utf-8'
        });
        stream.end('<html><body><h1>Welcome to the Everglow Backend API</h1></body></html>');
    }
    if (method === 'OPTIONS') {
        stream.respond({
            ':status': 200,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, Origin, data'
        });
        stream.end();
        return;
    }

    if (reqPath.startsWith("/public")) {
        console.log("For static files/assets request came.");
        const parts = reqPath.split("/public");
        const subreqPath = parts[1];
        stream.respond({
            ':status': 200,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'image/jpeg; charset=utf-8'
        });

        // /public/haircare/...
        if (subreqPath.startsWith("/haircare")) {
            const imageName = subreqPath.split("/haircare/")[1];
            const filereqPath = join(__dirname, "public", "haircare", imageName);
            stream.end(readFileSync(filereqPath));
            return;
        }

        // /public/bestseller/...
        if (subreqPath.startsWith("/bestseller")) {
            const imageName = subreqPath.split("/bestseller/")[1];
            const filereqPath = join(__dirname, "public", "bestseller", imageName);
            stream.end(readFileSync(filereqPath));
            return;
        }

        // fallback
        const filereqPath = join(__dirname, "public", subreqPath);
        stream.end(readFileSync(filereqPath));
    }
    if (reqPath.startsWith("/register")) {
        console.log("On register route request came.");
        if (method == "POST") {
            let body = '';
            stream.on('data', (chunk) => {
                body += chunk.toString();
            });
            stream.on('end', () => {
                const jsonData = JSON.parse(body)
                const userEmail = jsonData.email;
                sentEmailToUser(stream, userEmail)
            });
            return;
        } else {
            stream.respond({ 'content-type': 'text/plain; charset=utf-8', ':status': 405 });
            stream.end('Method Not Allowed');
            return;
        }
    }

    else if (reqPath.startsWith("/login")) {
        if (method == "POST") {

            let body = '';
            stream.on('data', (chunk) => {

                body += chunk.toString();
            });
            stream.on('end', () => {

                const jsonData = JSON.parse(body)
                console.log(jsonData);
                stream.respond({
                    ':status': 200,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
                stream.end(JSON.stringify({ message: 'Registered successfully' }));


            });
            return;
        } else {
            stream.respond({ 'content-type': 'text/plain; charset=utf-8', ':status': 405 });
            stream.end('Method Not Allowed');
            return;
        }

    }

    else if (reqPath.startsWith("/shop")) {
        if (method == "GET") {
            stream.respond({
                ':status': 200,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            })
            let counts, products;
            console.log("start the fetching from mdb");
            const pageNum = reqPath.includes("?page=") ? parseInt(reqPath.split("?page=")[1]) : 1;

            const categoriesFilter = async () => {
                try {
                    if (pageNum < 1) throw new Error("Invalid page number");
                    counts = await Product.aggregate([
                        { $unwind: "$categories" },   // array ko flatten karta hai
                        { $group: { _id: "$categories", count: { $sum: 1 } } },  // group by category
                        { $project: { _id: 0, category: "$_id", count: 1 } }     // result format clean
                    ]);

                    console.log(pageNum);
                    products = await Product.aggregate([
                        // 1️⃣ price range calculate
                        {
                            $addFields: {
                                minPrice: { $min: "$range.price" },
                                maxPrice: { $max: "$range.price" }
                            }
                        },
                        // 2️⃣ pagination - skip first
                        { $skip: ((pageNum - 1) * 16) },
                        // 3️⃣ then limit
                        { $limit: 16 },
                        // 4️⃣ fields select karo
                        {
                            $project: {
                                _id: 1,
                                productname: 1,
                                minPrice: 1,
                                maxPrice: 1,
                                instock: 1,
                                productimage: { $arrayElemAt: ["$productimage.bindata", 0] },
                                rating: { $ifNull: ["$reviews.rating", 0] }
                            }
                        }
                    ]);
                    console.log(products);

                    console.log("Data fetched from mdb, we can said");
                    let imagesUrl = []
                    async function fetchImagesUrl() {
                        const imagesUrl = [];

                        // assume products array aggregate se mil gaya
                        products.forEach((product, i) => {
                            const binaryData = product.productimage; // Binary object from MongoDB
                            //   console.log(binaryData.buffer);

                            if (!binaryData) return;

                            // Binary → Buffer
                            const buffer = Buffer.from(binaryData.buffer); // `.buffer` contains raw bytes

                            // Save to public folder
                            const fileName = `product-${i + 1}.jpg`;
                            const reqPathOfImage = join(__dirname, 'public', fileName);

                            writeFileSync(reqPathOfImage, buffer);

                            // Frontend URL
                            product.productimage = `https://localhost:8443/public/${fileName}`;
                        });

                        const productsWithUrl = products.map((product, index) => ({
                            ...product, // agar Mongoose document hai to use _doc
                            // productimage: imagesUrl[index] || null
                        }));

                        console.log(productsWithUrl);

                        const frontendProductData = JSON.stringify({ categorieswisecount: counts, products: productsWithUrl });
                        stream.write(frontendProductData);
                        stream.end();
                    }

                    fetchImagesUrl();
                } catch (err) {
                    console.log("Error to fetch data : ", err.message);
                    stream.end(JSON.stringify({ status: 501, message: "Internal server error" }))
                }
            }
            categoriesFilter();
        } else stream.end({ status: 501, message: "Internal server error" })
    }
    //  if (reqPath.startsWith("/product")) {
    //     getCategoryProducts(stream, headers);
    // }
    else if (reqPath.startsWith("/product-category/")) {
        getCategoryProducts(stream, headers);
    }
    else if (reqPath.startsWith("/product:")) {
        getOneProductInfo(stream, headers);
    } else if (reqPath.startsWith("/product-count")) {
        console.log("Fetching product count...");
        const category = headers['data'];
        console.log(category);

        getProductsCount(stream, category)
    }
    else if (reqPath.startsWith("/bestseller")) {
        getBestsellerProducts(stream, headers);
    }
    else if (reqPath.startsWith("/cart")) {
        getCartDesc(stream, headers);
    } else if (reqPath.startsWith("/blogs")) {
        if (reqPath.includes("?")) {
            const uri = reqPath.split("?count=")
            const blogCount = uri[1];
            // console.log(blogCount);
            return getBlogs(stream, blogCount);
        }
        getBlogs(stream)
    } else if (reqPath.startsWith("/blog/")) {
        getOneBlog(stream, reqPath.split("/")[2]);
    } else if (reqPath.startsWith("/search-product")) {
        const handleSearch = async () => {
            let body = '';
            stream.on('data', (chunk) => {
                body += chunk.toString();
            });

            stream.on('end', async () => {
                try {
                    const parsed = body ? JSON.parse(body) : null;
                    // support sending a raw string or an object { searchName: '...' }
                    const searchName = parsed && typeof parsed === 'object'
                        ? (parsed.searchName || parsed.name || parsed.query)
                        : parsed;

                    console.log('searchName (from end):', searchName);

                    if (!searchName) {
                        stream.respond({ ':status': 400, 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                        stream.end(JSON.stringify({ status: 400, message: 'Missing searchName' }));
                        return;
                    }
                    function escapeRegex(str) {
                        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    }

                    // const searchProducts = await Product.find({ productname: searchName });
                    const re = new RegExp(escapeRegex(searchName), 'i');
                    const searchProducts = await Product.find({
                        $or: [
                            { productname: { $regex: re } },
                            { productdesc: { $regex: re } },
                            { categories: { $elemMatch: { $regex: re } } }
                        ]
                    });
                    console.log('Search products : ', searchProducts);

                    if (stream.destroyed) return;

                    stream.respond({ ':status': 200, 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    stream.end(JSON.stringify(searchProducts));
                } catch (err) {
                    console.error('Error handling search:', err);
                    if (!stream.destroyed) {
                        stream.respond({ ':status': 500, 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                        stream.end(JSON.stringify({ status: 500, message: 'Internal server error' }));
                    }
                }
            });
        };
        handleSearch();
    }
    stream.on('end', () => {
        console.log('Stream has ended.');
    });
    stream.on('close', () => {
        console.log('Stream has been closed.');
    });
});

server.listen(8443, "localhost", () => {
    console.log("Server is running at : https://localhost:8443");

});

server.on('error', (err) => console.error("Error on server instance : ", err));

server.on("close", () => {
    console.log("Server closed.");
})
