const { writeFileSync } = require("fs")
const { join } = require("path");
const Product = require("./schema/Product");
const { start } = require("repl");
const { log } = require("console");
const fetchImagesUrl = require("./fetchImagesUrl");
let product, finalProducts;
const getOneProductInfo = async (stream, headers) => {

  try {
    
  
  const path = headers[':path'].split(":");
  
  console.log("on one product info request came at route : ", path);
  // passing query conditions is permitted
  const productId = path[1]; // ← user input ya param se lo
    if(product && product._id == productId){
      stream.respond({
    ':status': 200,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });
  if (finalProducts == undefined) {
   finalProducts = await fetchImagesUrl([product], folder = "product", isOneImage = false);
     
  }
  if (stream.destroyed) {
    getOneProductInfo(stream, headers);
    return;
  }
      stream.end(JSON.stringify(finalProducts[0]));
      return;
    }
   product = await Product.findById(productId)
    console.log(product);

// aggregate([
//     // 1️⃣ categories array ko unwind karo
//     { $unwind: "$categories" },

//     // 2️⃣ sirf wahi documents lo jisme category match ho
//     { $match: { categories: categoryName } },

//     // 3️⃣ optional: agar duplicate product repeat ho sakte hain, group back by _id
//     {
//       $group: {
//         _id: "$_id",
//         productname: { $first: "$productname" },
//         productdesc: { $first: "$productdesc" },
//         categories: { $addToSet: "$categories" },
//         range: { $first: "$range" },
//         reviews: { $first: "$reviews" },
//         productimage: { $first: "$productimage" }
//       }
//     },

//     // 4️⃣ sort or limit if needed
//     //   { $sort: { createdAt: -1 } },
//     { $limit: 16 } // optional
//   ]);
  if (stream.destroyed) {
    getOneProductInfo(stream, headers);
    return;
  }
  stream.respond({
    ':status': 200,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });
  // let productimage = product.productimage;
  // const productname = product.productname;
  // async function fetchImagesUrl() {
  //   const imagesUrl = [];
    
    // assume product array aggregate se mil gaya
    // product.map((element, i)=>{
    //   // element.productimage.forEach((product, i) => {
    //     const binaryData = element.productimage[0]; // Binary object from MongoDB
    //       // console.log(binaryData.buffer);
    //     // console.log(binaryData, "Direct binary data from mdb");
        
    //     if (!binaryData) return;
    //     const bi = binaryData?.bindata.buffer
    //     console.log(bi, "after .bindata property method data from mdb");

        
    //     // Binary → Buffer
    //     const buffer = Buffer.from(bi); // `.buffer` contains raw bytes
        
    //     // Save to public folder
    //     const fileName = `product-${i + 1}.jpg`;
    //     const pathOfImage = join(__dirname, 'public', categoryName.toLowerCase(), fileName);
        
    //     writeFileSync(pathOfImage, buffer);
        
    //     // Frontend URL
        
    //     element.productimage = `https://localhost:8443/public/${categoryName.toLowerCase()}/${fileName}`;
    //   });
    // })


    // const productWithUrl = product.map((product, index) => ({
    //   ...product, // agar Mongoose document hai to use _doc
    //   // productimage: imagesUrl[index] || null
    // }));

    // console.log(productWithUrl);

    // const frontendProductData = JSON.stringify({});
    // stream.write(frontendProductData);
    // stream.end();
  // }

   finalProducts = await fetchImagesUrl([product], folder = "product", isOneImage = false);
  // productimage = images;
  console.log(product, finalProducts[0]);
  
  stream.end(JSON.stringify(finalProducts[0]))
  } catch (error) {
    console.error("Error in getOneProductInfo:", error);
    stream.respond({
      ':status': 500,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
    stream.end(JSON.stringify({ error: "Internal Server Error" }));
  }

  // await fetchImagesUrl().then((res) => {
  //     console.log("Images url fetched", res);
  //     stream.end(JSON.stringify(images));
  // })
  // console.log(product.productimage);

}

module.exports = getOneProductInfo;
