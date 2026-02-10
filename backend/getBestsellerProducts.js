const Order = require("./schema/Order")
const Product = require("./schema/Product")
const fetchImagesUrl = require("./fetchImagesUrl")
async function getBessellerProducts(stream, headers){
    console.log("On bestseller products, request came on this route.");
    try {
    // 1️⃣ Get top 10 product IDs
    // Debug: Check total orders count
    const totalOrders = await Order.countDocuments();
    console.log("Total orders in database:", totalOrders);
    
    // Debug: Check recent orders
    const recentOrders = await Order.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } });
    console.log("Recent orders (last 30 days):", recentOrders);
    
    const topProductsIds = await Order.aggregate([
       { $match: { createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } } },
       { $group: { _id: "$productid", total_sold: { $sum: "$quantity" } } },
       { $sort: { total_sold: -1 } },
       { $limit: 10 }
     ]);
    console.log("Aggregation result:", topProductsIds);

if (topProductsIds.length > 0) {
// Extract just the IDs
const ids = topProductsIds.map(p => p._id);

console.log("Top 10 products IDs of bestseller products", ids );
  // 2️⃣ Fetch full product documents
   const topProducts = await Product.aggregate([
    { $match: { _id: { $in: ids } } },
    {
      $project: {
        productname: 1,
        range: 1,
        productimage: { $arrayElemAt: ["$productimage", 0] }
      }
    }
  ]);

     const bestsellerDataForFrontend = await fetchImagesUrl(topProducts, "bestseller", true);
     console.log(bestsellerDataForFrontend);
    // console.log("Top 10 products of bestseller products", bestsellerDataForFrontend );
  if(stream.destroyed) {
        console.log("Stream destroyed, aborting response.");
        return;
    }
    if (bestsellerDataForFrontend.length > 0) {
        stream.respond({
            ':status': 200,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        });
        stream.end(JSON.stringify(bestsellerDataForFrontend))
        return;
    }else{
        stream.respond({
            ':status': 404,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        });
        stream.end(JSON.stringify({status: 404, message: "No bestseller products found"}));
        return;
    }
  }else{
    // Fallback: Get last 10 orders and extract unique product IDs
    const recentOrders = await Order.aggregate([
       { $sort: { createdAt: -1 } },
       { $limit: 10 },
       { $group: { _id: "$productid" } }
     ]);
    console.log("Fallback - Recent orders product IDs:", recentOrders);
    
    if (recentOrders.length > 0) {
      const ids = recentOrders.map(p => p._id);
      const topProducts = await Product.aggregate([
        { $match: { _id: { $in: ids } } },
        {
          $project: {
            productname: 1,
            range: 1,
            productimage: { $arrayElemAt: ["$productimage", 0] }
          }
        }
      ]);
      
      const bestsellerDataForFrontend = await fetchImagesUrl(topProducts, "bestseller", true);
      
      if (bestsellerDataForFrontend.length > 0) {
        stream.respond({
            ':status': 200,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        });
        stream.end(JSON.stringify(bestsellerDataForFrontend));
        return;
      }
    }
    
    stream.respond({
        ':status': 404,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    });
    stream.end(JSON.stringify({status: 404, message: "No bestseller products found"}));
    return;
  }
    }
     catch (error) {
      console.log("Error in getBessellerProducts:", error);
      if(stream.destroyed) {
        console.log("Stream destroyed, aborting response.");
        return;
    }
    stream.respond({
        ':status': 500,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    });
    console.log("Response sent ", {status : 500, message: "Internal server error"});
    
    stream.end(JSON.stringify({status : 500, message: "Internal server error"}))
    return;
}
}

module.exports = getBessellerProducts;