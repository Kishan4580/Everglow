const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');
const { log } = require('console');


const productsDir = './html_products';
let productsArray = [];
const f2 = async () => {
  const files = fs.readdirSync(productsDir);
  
  for (const file of files) {
    const f1 = async () => {
      if (file.endsWith('.html')) {
        const html = fs.readFileSync(path.join(productsDir, file), 'utf-8');
        const $ = cheerio.load(html);

        // Template selectors
        const productname = $('h1.wp-block-post-title').text().trim();
        const productdesc = $('p.wp-block-post-excerpt__excerpt').text().trim();
        let categories = [];

        $('div.taxonomy-product_cat.wp-block-post-terms a').each((i, el) => {
          const category = $(el).text().trim();
          categories.push(category);
        });

        const sku = $("strong.sku").text()
        // Price convert to INR
        $('wc-block-components-product-price wc-block-grid__product-price').each((i, el) => {
          const value = el.firstChild.nodeValue;
          let price = parseFloat(value.replace(/[^0-9.]/g, ''));
          price = Math.round(price * 82); // example conversion rate

        })

        // Images

        // This array will store image buffers
        const productimage = [];
        const downloadImagesOfProduct = async () => {
          const imageElements = $('div.woocommerce-product-gallery__wrapper div').toArray();
          
          for (const el of imageElements) {
            const src = $(el).attr('data-thumb');

            if (src) {
              try {
                // download image from internet
                const response = await axios.get(src, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, 'binary');

                // optional: save locally (for backup)
                // const fileName = path.basename(process.cwd());
                // fs.writeFileSync(path.join('./downloaded_images', fileName), buffer);

                // push buffer into productimage array
                productimage.push({ bindata: buffer });
              } catch (err) {
                console.error(`❌ Failed to download image: ${src}`, err.message);
              }
            }
          }
        }
        await downloadImagesOfProduct()
        // // Sizes / Range task remaining
        const range = [];

        // $('select#pa_size').each((i, ek) => {
        //   const options = ek.childNodes;
        //   options.shift();
        //   const sizes = options.map((el) => {
        //     return el.text()
        //   })

        // })
        //     discount: parseInt($(cols[2]).text()),
        // price: parseInt($(cols[1]).text()),
        //     color: $(cols[3]).text(),
        //     sku: $(cols[4]).text(),

        // variations JSON attribute fetch karna
        const variationsData = $('form.variations_form').attr('data-product_variations');

 if (variationsData == undefined) {
  console.error("❌ No variations data found for product:", productname);

  // Extract price (convert to INR)
  const priceText = $('span.woocommerce-Price-amount').first().text().trim();
  const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) * 83 || 0;

  // Temporary storage for attributes
  let quantity = null, quantityUnit = null;
  let dimension = { l: null, b: null, h: null, unit: null };
  let isBiodegradable = false;

  // 🧩 Loop through all attribute rows
  $('table.woocommerce-product-attributes.shop_attributes tr').each((i, el) => {
    const label = $(el).find('th').text().trim().toLowerCase();
    const value = $(el).find('td').text().trim();

    // 🧪 Quantity extraction (e.g. "125ml" → 125 + "ml")
    if (label.includes('quantity')) {
      const match = value.match(/^([\d.]+)\s*([a-zA-Z]*)$/);
      if (match) {
        quantity = parseFloat(match[1]);
        quantityUnit = match[2] || null;
      }
    }

    // 📏 Dimension extraction (e.g. "20 × 20 × 60 cm")
    if (label.includes('dimension')) {
      const cleanValue = value.replace(/\s+/g, '').replace(/[×xX]/g, 'x');
      const parts = cleanValue.match(/([\d.]+)x([\d.]+)x([\d.]+)([a-zA-Z]*)/);

      if (parts) {
        dimension.l = parseFloat(parts[1]);
        dimension.b = parseFloat(parts[2]);
        dimension.h = parseFloat(parts[3]);
        dimension.unit = parts[4] || null;
      }
    }

    // 🌿 Biodegradable field
    if (label.includes('biodegradable')) {
      isBiodegradable = value.toLowerCase().includes('yes');
    }
  });

  // ✅ Push a single range object for this product
  range.push({
    quantity,
    quantityUnit,
    price: Math.round(price),
    discount: 0,
    color: null,
    sku: null,
    dimension,
    image: null,
    isbiodegradable: isBiodegradable
  });
}else if (variationsData) {
          try {
            const variations = JSON.parse(variationsData);

            sizes = variations.map(v => {
              // convert dollar price to INR (example rate)
              const priceINR = Math.round(parseFloat(v.display_price) * 83);

              range.push({
                quantity: v.attributes?.attribute_pa_size || null, // e.g. "120ml"
                price: priceINR,                                   // converted price
                discount: 0,                                       // optional
                sku: v.sku || null,
                dimension: {
                  l: null,
                  b: null,
                  h: null
                },
                color: null,
                isbiodegradable: false,
                image: v.image?.src || null                        // product image URL per size
              });
            });
          } catch (err) {
            console.error("❌ Error parsing variations JSON:", err.message);
          }
        }
        

        //  reviews

        const reviews = async () => {
          const reviewElements = $('ol.commentlist > li.review').toArray();
          return await Promise.all(
            reviewElements.map(async (el) => {
            const container = $(el);

            // Reviewer name
            const reviewname = container.find('.woocommerce-review__author').text().trim();

            // Review text
            const review = container.find('.description p').text().trim();

            // Rating number (like 5 or 4)
            const rating = parseInt(container.find('.star-rating .rating').text().trim()) || 0;

            // Review date
            const dateStr = container.find('.woocommerce-review__published-date').attr('datetime');
            const reviewdate = dateStr ? new Date(dateStr) : null;

            // Reviewer image URL
            const imgSrc = container.find('img.avatar').attr('src');
            let reviewerimage = null;

            if (imgSrc) {
              try {
                const response = await axios.get(imgSrc, { responseType: 'arraybuffer' });
                reviewerimage = { bindata: Buffer.from(response.data, 'binary') };
              } catch (err) {
                console.error(`❌ Failed to fetch reviewer image: ${imgSrc}`, err.message);
              }
            }

            // Email (optional - agar HTML me available nahi hai to null)
            const email = null;

            return {
              reviewname,
              reviewerimage,
              review,
              email,
              rating,
              reviewdate,
            };
          })
          );
        };


        // Wait for all async operations to complete
        const reviewsData = await reviews();

        const productObj = { productname, productdesc, productimage, categories, sku, range, reviews: reviewsData };
        productsArray.push(productObj);
      }
    };
    
    await f1(); // Wait for each file to be processed
  }
  
  // Write to JSON only after ALL files are processed
  fs.writeFileSync('products.json', JSON.stringify(productsArray, null, 2));
  console.log('All products stored in products.json');
};

// Don't forget to call the function
f2().catch(console.error);