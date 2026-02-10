import { createContext } from "react";

// const localStorageCartProducts = localStorage.getItem("cart_products")
// let CartProductContext;
// // console.log(localStorageCartProducts);

//     if (localStorageCartProducts === null) {
//       console.log("Cart is empty in localstorage.");
//       CartProductContext = createContext({cartProducts : new Map(), setCartProducts : ((prev, proId, quantity) => {
//   const newMap = new Map(prev);
//   const item = newMap.get(proId);
//   if (item) item.qty += 1;
//   newMap.set(proId, quantity);
//   return newMap;
// })})
//     }else{
//       CartProductContext = createContext({cartProducts : new Map(JSON.parse(localStorageCartProducts)), setCartProducts : ()=>{}})
//     }

//     // const prod = localStorage.setItem()
//   // CartProductContext = createContext({cartProducts : JSON.parse(localStorageCartProducts), setCartProducts : () => {}})
//   export {CartProductContext}



export const CartContext = createContext({
  cart: new Map(),
  updateCart: async (id, qty) => {},
});