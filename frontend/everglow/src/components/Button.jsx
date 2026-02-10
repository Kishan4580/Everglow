import { useContext, useState } from "react";
import { flushSync, createPortal } from "react-dom";
import { CartContext } from "../cart";
import CartSystem from "../CartSystem"
export default function Button({ children, style1, bgColor, bgTran, quantity, product, onclicksignal  }) {
   const [loading, setLoading] = useState(false)
   const [cartShow, setShowCart] = useState(false)
   const [isCart, setCart] = useState(false)
   const { cart, updateCart } = useContext(CartContext);
        // const products = new Map();
        // products.add({ "pr": "2df", q: 20 })
        // products.add({ "pr": "2df", q: 20 })
        // console.log(products);
        // setCartProducts(product, quantity)
const addToCart = async (proId, quantity = 1)=> {
   const isSu = await updateCart(proId, quantity);   
   if (isSu) {
       setLoading(false);
       setShowCart(true);
   }
       setLoading(false);
}
    const transColor = bgTran ? bgTran : "bg-transparent";
    const innerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        padding: "5px",
        height: "40px",
        width: "100%",
    }
    // const transTeColor = bgTran[0] == "b" ? "white" : "black";
    const lowerCaseBgColor = bgColor?.toLowerCase() || "black";
    const textColor = lowerCaseBgColor[0] == "b" ? "white" : "black";
    
    return (
        <div className="relative  w-full">
            <button onClick={onclicksignal ? ()=> { flushSync( () => setLoading(true)); addToCart(product, quantity); setShowCart(true); console.log("onclicked add the product")
            } : (() => { console.log("no onclick") })} style={{ ...innerStyle, ...style1, "--btn-hoverEffect": `${bgColor}`, "--text-color": `${textColor}` }} className={`w-full btn h-full ${transColor} `}
            >{children} {loading && <div className="animate-spin text-white  z-50 border-b-2 border-b-white h-4 w-4 rounded-4xl"></div> }
            </button>
            {cartShow && createPortal(<CartSystem isSliderCart={true} isCart={isCart} setCart={setCart}  />, document.body)}
            {/* <div className="absolute btn top-1 z-50    w-full bg-white" style={{  width: "100%", height: "12px",  }}></div> */}
        </div>
    )
}


