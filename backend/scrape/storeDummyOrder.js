const mongoose = require("mongoose");
const Product = require("../schema/Product.js");
const Order = require("../schema/Order.js");

async function createAutoDummyOrders() {
  try {
    // 🔹 Step 1: Product collection se kuch random products fetch karo
    const products = await Product.aggregate([{ $sample: { size: 12 } }]); // Random 5 products

    if (!products.length) {
      console.log("⚠️ No products found to create dummy orders.");
      return;
    }

    // 🔹 Step 2: Dummy orders array banao
    const dummyOrders = products.map((product) => {
      // random quantity between 1 and 5
      const quantity = Math.floor(Math.random() * 5) + 1;
      const productPrice =
        product.range?.[0]?.price || product.price || 499; // product schema ke hisaab se adjust

      return {
        productid: product._id,
        quantity,
        productprice: productPrice,
        totalprice: quantity * productPrice,
        orderstatus: "fulfilled",
        paymentstatus: "paid",
        guestInfo: {
          name: "Guest User",
          email: "guest@example.com",
          phone: "9999999999",
          address: "Default Guest Address",
        },
      };
    });

    // 🔹 Step 3: Orders insert karo
    await Order.insertMany(dummyOrders);
    console.log(`✅ ${dummyOrders.length} dummy bestseller orders inserted successfully!`);

  } catch (err) {
    console.error("❌ Error creating dummy orders:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Function ko call karo jab test karna ho
createAutoDummyOrders();
