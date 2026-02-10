const mongoose = require("mongoose");
const Product = require("./schema/Product");
const getRecentProduct = async () => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(8);
        return products;
    } catch (error) {
        console.error("Error fetching recent products:", error);
    }
};