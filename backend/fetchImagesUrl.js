const { join } = require("path")
const { writeFileSync } = require("fs")

module.exports = fetchImagesUrl = async function (products, folder, isOneImage) {
  const finalProducts = [];
  // console.log("fetch image url function received product or s ", products);
  
  if (isOneImage) {
    products.forEach((element, i) => {
      const binaryData = element.productimage.bindata || element.productimage;
      if (!binaryData) return;
      
      // Handle Buffer or BinData case
      const buffer = Buffer.isBuffer(binaryData)
        ? binaryData
        : Buffer.from(binaryData?.buffer || []);

      const fileName = `product-${i + 1}.jpg`;
      const filePath = join(__dirname, "public", folder, fileName);
      writeFileSync(filePath, buffer);

      const frontendUrl = `https://localhost:8443/public/${folder}/${fileName}`;

      // Convert to plain object before editing
      const plain = element.toObject ? element.toObject() : element;
      plain.productimage = frontendUrl;
      // console.log(plain);
      
      finalProducts.push(plain);
    });
  }else {
    products.forEach((element, i) => {
      const images = [];
       element.productimage.forEach((element1, j) => {
        const binaryData = element1.bindata;
        
        if (!binaryData) return;
        
        // console.log(binaryData);
        // Handle Buffer or BinData case
        const buffer = Buffer.isBuffer(binaryData.binary)
          ? binaryData
          : Buffer.from(binaryData?.buffer || []);
// console.log(buffer);

        const fileName = `product-${j + 1}.jpg`;
        const filePath = join(__dirname, "public", folder, fileName);
        writeFileSync(filePath, buffer);

        const frontendUrl = `https://localhost:8443/public/${folder}/${fileName}`;

        // Convert to plain object before editing
        // const plain = element1.toObject ? element1.toObject() : element1;
        // plain.productimage.push(frontendUrl);
        images.push(frontendUrl)
      });
        const plain = element.toObject ? element.toObject() : element;
      finalProducts.push({...plain, "plain.productimage" : images});
     
    });
  
  }

  // console.log("✅ Final bestseller products:", finalProducts);
  return finalProducts;
}