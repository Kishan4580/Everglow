const Product = require("./schema/Product")
const { Types } = require("mongoose")
const  fetchImagesUrl  =  require("./fetchImagesUrl")
let finalProducts;
let processingState = {
    cartDesc: null,
    isProcessing: false,
    lastProcessedIndex: -1,
    CartItems: []
};

const processCartItems = async (cartDesc, startIndex = 0) => {
  console.log(cartDesc, "At processingcart ",  startIndex);
//   const a  = [1, 3, 5].slice();
  if (startIndex == cartDesc?.length) {
    // console.log(processingState.CartItems);
        return  processingState.CartItems;
  }
    try {
        const pr = await Product.aggregate([
            {
                $match: {
                    _id: {
                        $in: cartDesc.slice(startIndex).map((item) => new Types.ObjectId(item))
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    productname: 1,
                    range: 1,
                    productimage: { $arrayElemAt: ["$productimage.bindata", 0] }
                }
            }
        ]);
        processingState.CartItems.push(...pr);
        // console.log(processingState.CartItems); 
        return await fetchImagesUrl(pr, "cart", true);
    } catch (error) {
        console.error("Error processing cart items:", error);
        throw error;
    }
};

module.exports = getCartDesc = async(stream, headers) => {
    console.log("On cart route request came.");
    let cartDesc;

    const handleStreamError = async (error) => {
        console.error("Stream error:", error);
        if (!stream.destroyed) {
            stream.destroy();
        }
    };

    stream.on('error', handleStreamError);

    stream.on('data', (data) => {
        try {
            cartDesc = JSON.parse(data.toString());
            processingState.cartDesc = cartDesc;
            // console.log(cartDesc);
        } catch (error) {
            handleStreamError(error);
        }
    });

    stream.on('end', async () => {
        if (!cartDesc) {
            console.log("No cart description received on the client side.");
            stream.respond({
                ':status': 400,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            stream.end(JSON.stringify({ error: "No cart description received." }));
            return;
        }

        try {
            processingState.isProcessing = true;
            
            // If we have a previous processing state, resume from there
            const startIndex = Math.max(0, processingState.lastProcessedIndex);
            // console.log(cartDesc, startIndex);
            finalProducts = await processCartItems(cartDesc, startIndex);
            
            // Processing completed successfully
            processingState.isProcessing = false;
            processingState.lastProcessedIndex = cartDesc.length;
            
            // console.log("Final product:", finalProducts);
            if (finalProducts.length > 0 ) {
                
            
            if (!stream.destroyed) {
                stream.respond({
                    ':status': 200,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
                stream.end(JSON.stringify(finalProducts));
            } else {
                // If stream was destroyed, store the state for recovery
                processingState.finalProducts = finalProducts;
            }
        }
        } catch (error) {
            console.error("Error in cart processing:", error);
            
            if (!stream.destroyed) {
                stream.respond({
                    ':status': 500,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
                stream.end(JSON.stringify({ error: "Internal server error" }));
            }
            
            // Reset processing state on error
            processingState.isProcessing = false;
        }
    });
  
}

