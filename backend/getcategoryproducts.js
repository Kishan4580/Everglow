const { writeFileSync, mkdirSync } = require("fs")
const { join, dirname } = require("path");
const Product = require("./schema/Product");
// const { start } = require("repl");
let products = [];
const getProductInfo = async (stream, headers) => {
  const path = headers[':path'].split("product-category/");
  console.log("on product category info request came");
  // passing query conditions is permitted
  const categoryName = path[1]; // ← user input ya param se lo
  const reqPath = headers[':path'];
            const pageNum = reqPath.includes("?page=") ? parseInt(reqPath.split("?page=")[1]) : 1;

  if (products.length == 0) {
    products = await Product.aggregate([
      // 1️⃣ categories array ko unwind karo
      { $unwind: "$categories" },

      // 2️⃣ sirf wahi documents lo jisme category match ho 
      { $match: { categories: categoryName } },

      // 3️⃣ optional: agar duplicate product repeat ho sakte hain, group back by _id
      {
        $group: {
          _id: "$_id",
          productname: { $first: "$productname" },
          // productdesc: { $first: "$productdesc" },
          categories: { $addToSet: "$categories" },
          range: { $first: "$range" },
          
          maxRating: { $max: "$reviews.rating" },
          productimage: { $first: "$productimage" },
          instock: { $first: "$instock" } // Need to include instock in $group stage
        }
      },
      {
        $addFields: {
          minPrice: { $min: "$range.price" },
          maxPrice: { $max: "$range.price" }
        }
      },
      { $skip: ((pageNum - 1) * 16) },

      // 4️⃣ sort or limit if needed
      //   { $sort: { createdAt: -1 } },
      // optional
      { $limit: 16 },
      {
        $project: {
          _id: 1,
          productname: 1,
          minPrice: 1,
          maxPrice: 1,
          instock: 1,
          productimage: { $arrayElemAt: ["$productimage.bindata", 0] },
          rating: { 
            $cond: {
              if: { $ne: ["$maxRating", null] },
              then: "$maxRating",
              else: 0
            }
          },
          maxRating : 1
        }
      }
    ]);
  }

  if (stream.destroyed) {
    getProductInfo(stream, headers);
    return;
  }
  stream.respond({
    ':status': 200,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });
  console.log(products);

  // let productimage = product.productimage;
  // const productname = product.productname;
  async function fetchImagesUrl() {
    const imagesUrl = [];

    // assume products array aggregate se mil gaya
    products.map((element, i) => {
      // element.productimage.forEach((product, i) => {
        console.log(element);
        
      const binaryData = element.productimage; // Binary object from MongoDB
      // console.log(binaryData.buffer);
      // console.log(binaryData, "Direct binary data from mdb");

      if (!binaryData) return;
      console.log("binary data :",binaryData);
      
      const bi = binaryData?.buffer
      console.log(bi, "after .bindata property method data from mdb");


      // Binary → Buffer
      const buffer = Buffer.from(bi); // `.buffer` contains raw bytes

      // Save to public folder
      const fileName = `product-${i + 1}.jpg`;
      const pathOfImage = join(__dirname, 'public', categoryName.toLowerCase(), fileName);

      // Ensure the directory exists before writing the file to avoid ENOENT
      const dir = dirname(pathOfImage);
      try {
        mkdirSync(dir, { recursive: true });
      } catch (err) {
        // If directory creation fails for unexpected reasons, rethrow
        throw err;
      }

      writeFileSync(pathOfImage, buffer);

      // Frontend URL

      element.productimage = `https://localhost:8443/public/${categoryName.toLowerCase()}/${fileName}`;
    });
    // })
    console.log(products);


    // const productsWithUrl = products.map((product, index) => ({
    //   ...product, // agar Mongoose document hai to use _doc
    //   // productimage: imagesUrl[index] || null
    // }));

    // console.log(productsWithUrl);

    // const frontendProductData = JSON.stringify({});
    // stream.write(frontendProductData);
    // stream.end();
  }
  if (products.length > 1 && typeof products[0].productimage !== "string") {

    await fetchImagesUrl();
  }
  // productimage = images;
  console.log(products);
  stream.end(JSON.stringify(products))
  // await fetchImagesUrl().then((res) => {
  //     console.log("Images url fetched", res);
  //     stream.end(JSON.stringify(images));
  // })
  // console.log(product.productimage);

}

module.exports = getProductInfo;
