const mongoose = require("mongoose")
const Product = require("./schema/Product")
let counts;
// let category;
const getProductsCount = async (stream, category) => {
    // stream.on('data', () => {
    //     category = stream.headers['data'];
    //     console.log("Category received in count endpoint: ", category);
    // });
    // stream.on('end', () => {
    // });
    
    // category = stream.headers['data'];
    // console.log(category);
    
try {
    if (counts === undefined) {
        if(category && category !== "shop") {
            console.log("all product category endpoint request came except shop");
            
            counts = await Product.countDocuments({ categories: category });
        }else{
            console.log("shop endpoint request came");

        counts = await Product.countDocuments();
    }
   if (stream.destroyed) {
    getProductsCount(stream, category);
    return;
   }
    stream.respond({
       ':status': 200,
       'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json'
   });
   console.log(counts);
   
   stream.end(JSON.stringify({ count: counts }));
}else {
    if (stream.destroyed) {
    getProductsCount(stream, category);
    return;
   }
stream.respond({
       ':status': 200,
       'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json'
   });
   console.log(counts);
   
   stream.end(JSON.stringify({ count: counts }));
}
} catch (error) {
   console.error("Error fetching product count: ", error);
   stream.respond({
       ':status': 500,
       'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json'
   });
   stream.end(JSON.stringify({ error: "Internal Server Error" }));
}
}

module.exports = getProductsCount;