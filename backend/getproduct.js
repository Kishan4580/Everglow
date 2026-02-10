// const { logging } = require("googleapis/build/src/apis/logging");
const { writeFileSync } = require("fs")
const { join } = require("path");
const Product = require("./schema/Product");
const getProductInfo = async (stream, headers) => {
    const path = headers[':path'].split(":");
    const id = (path[1]);
    console.log("on product info request came");

    const product = await Product.findById(id);
    stream.respond({
        ':status': 200,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });
    let productimage = product.productimage;
    const productname = product.productname;
    let images = []
    async function fetchImagesUrl() {
       productimage.forEach((productimg, i) => {
            
            const binaryData = productimg; // Binary object from MongoDB
            // console.log(binaryData, "Binarydata");
            
            if (!binaryData) return;
            
            console.log("Buffering start");
            // Binary → Buffer
            const buffer = Buffer.from(binaryData.bindata); // `.buffer` contains raw bytes
            
            // Save to public folder
            const fileName = `${productname.trim().replace(/ /g, '-')}-${i + 1}.jpg`;
            const pathOfImage = join(__dirname, 'public', fileName);
            
            images.push(`https://localhost:8443/public/${fileName}`);
          const suc = writeFileSync(pathOfImage, buffer);
              console.log("Buffering end", suc);``
            })
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            // Frontend URL
            
            
        })
        // console.log(images, "Images url is right or not");
        

        
    }
    // productimage = images;


    await fetchImagesUrl().then((res) => {
        console.log("Images url fetched", res);
        stream.end(JSON.stringify(images));
    })
    // console.log(product.productimage);

}

module.exports = getProductInfo;
