// libraries-components, hooks, etc.
import { Link } from "react-router-dom"
import { createPortal } from "react-dom"
import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { useContext } from "react"

const serverUrl = import.meta.env.VITE_SERVER_URL


// assets
import cImg1 from "../assets/coll/menu-image-1.png"
import cImg2 from "../assets/coll/menu-image-2.png"
import cImg3 from "../assets/coll/menu-image-3.png"
import cImg4 from "../assets/coll/menu-image-4.png"
import cImg5 from "../assets/coll/menu-image-5.png"
// logos
import everLogo from '/logo-lite.png'
import logo from "/logo.png";

import searchiconBlack from "../assets/search.png"
import searchicon from "../assets/search-lite.png"
import carticon from "../assets/cart-lite.png"
import carticonBlack from "../assets/cart.png"
import accounticonBlack from "../assets/myaccount.png"
import accounticon from "../assets/myaccount-lite.png"

// components
import { ProductCategoryCard } from "./ProductCategoryCard"
import { AccountContext } from "../contextstore/account.js"
import Button from "./Button"
import Cart, { CardTotals } from "../Cart.jsx"
// import { SmallLoading } from "../Loading"
import Error from "../Error.jsx"
import { useQuery } from "@tanstack/react-query"
// context store
import { CartContext } from "./cart"


const collections = [{ src: cImg1, title: "Masks" }, { src: cImg2, title: "Moisturizers" }, { src: cImg3, title: "Bodycare" }, { src: cImg4, title: "Haircare" }, { src: cImg5, title: "Cleansers" }]
export default function Navbar({ style, currentPage }) {

    // console.log(style, currentPage);

    // No, this style object won't work as intended. Here's the corrected version:
    const currnaSty = (pageName, currentPage) => {
        return currentPage === pageName ? {
            textDecoration: "underline",
            textDecorationColor: "black",
            textDecorationThickness: "2px",
            textUnderlineOffset: "5px"
        } : {
            // textDecoration: "none",
            // textUnderlineOffset: "5px",
            // ':hover': {
            //     textDecorationColor: "black",
            //     textDecorationThickness: "2px", 
            //     textDecoration: "underline"
            // }
        }
    };
    const isLogin = useContext(AccountContext)
    // console.log(isLogin);
    const [arrowPosS, setArrowPosS] = useState(0)
    const [arrowPosC, setArrowPosC] = useState(0)
    const [arrowPosP, setArrowPosP] = useState(0)

    const [showColl, setShowColl] = useState(false)
    const [showShop, setShowShop] = useState(false)
    const [showPage, setShowPage] = useState(false)
    const [isProfile, setProfile] = useState(false)
    const [isCart, setCart] = useState(false)
    const [isSearch, setSearch] = useState(false)
    const smallMenuRef = useRef(null)

    const { cart, updateCart } = useContext(CartContext);
    // console.log(cart);

    const { isPending, data, isError, error } = useQuery({
        queryKey: ["cart"],
        queryFn: () => fetch(`${serverUrl}/cart`, {
            method: "POST",
            body: JSON.stringify(Array.from(cart.keys()))
        }).then(res => res.json()),
        enabled: cart.size > 0
    })
    // if (cart.size == 0) {
    //     return <div className="h-216 relative flex justify-center items-center  p-4  ">
    //         {/* <button>
    //             <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path>
    //             </svg>
    //         </button> */}
    //         <div className=" flex flex-col items-center gap-4 text-2xl">
    //             <span className=" ">Your cart is empty.</span>
    //             <button className="p-2 bg-black text-white"><Link to="/shop">Start Shopping</Link></button>
    //         </div> </div>
    // }

    // if (isPending) {
    //     console.log("Loading...");

    //     return  <div>Loading....</div>
    // }
    // if (isError) {
    //     console.log("Error :", error);

    //     return
    //     // <div>Error to fetch your cart items : {error.message}</div>
    // }
    // console.log(data);
    // if (data.status == 501) {
    //     return <Error err={{ title: "There was a problem", message: `${data.message} Please try again later.` }}></Error>
    // }

    const SliderCart = () => {
        return (
            <div className="px-6 md:px-12 py-4 bg-white text-black top-0 right-0 md:w-10/12 lg:w-1/2 h-screen fixed">
                <button className=" w-full" onClick={() => setCart(false)}>
                    <svg className="mr-0 ml-auto" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
                </button>
                <h2>Your cart</h2>
                <div className="overflow-y-scroll">
                    {data?.map((product, i) => <Cart key={i} quantity={cart.get(product._id) || 0} updateCart={updateCart} price={product.range[0].price} prodInfo={product.productname} proImgSrc={product.productimage} prodId={product._id}></Cart>)}

                </div>
                <div className="flex justify-between">
                    <h3>Subtotal</h3>
                    <h3>{subtotal}</h3>
                </div>
                <p>Shipping, taxes, and discounts calculated at checkout.</p>
                <div className="flex flex-col gap-4">
                    <Button bgColor={"black"}>Go to Checkout</Button>
                    <Button bgColor={"white"}> <Link to={"/cart"}>View my cart</Link> </Button>
                </div>
            </div>
        )
    }
    return (
        <nav style={style} className="bg-transparent absolute w-full z-50  -top-1 lg:text-xl mt-4 border-gray-200 dark:border-gray-700 px-4 md:px-6">
            <div className="sticky flex justify-between mx-auto py-2 md:py-4 lg:py-6">
                <a href="#" className="">
                    <img src={style?.logoBlack ? logo : everLogo} className="w-5/12 h-3/4" alt="Everglow Logo" />
                    {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:">Everglow</span> */}
                </a>
                <div className="flex gap-4 md:gap-10">
                    <div className="flex items-center gap-4">
                        <div className="flex md:gap-12 gap-6 relative z-0 ml-0 ">
                            <NavbarButton onclickhandler={() => setSearch(!isSearch)}><img src={style.logoBlack ? searchiconBlack : searchicon} alt={"search icon"} style={{ height: "1.2rem", width: "1.2rem" }} height={"22"} width={"22"} /></NavbarButton>
                            <NavbarButton onclickhandler={() => setProfile(!isProfile)}><Link to={"/profile"}><img src={style.logoBlack ? accounticonBlack : accounticon} alt={"account icon"} style={{ height: "1.2rem", width: "1.2rem" }} height={"2.4rem"} width={"2.4rem"} /></Link></NavbarButton>
                            <NavbarButton onclickhandler={() => setCart(!isCart)}><img src={style.logoBlack ? carticonBlack : carticon} alt={"cart icon"} style={{ height: "1.2rem", width: "1.2rem" }} height={"2.4rem"} width={"2.4rem"} />({cart.size})</NavbarButton>
                        </div>
                        {/* <Link to={"/search"}></Link> */}
                        {/* <Link to={"/cart"}></Link> */}
                        <button onClick={() => {
                            if (smallMenuRef.current)
                                smallMenuRef.current.classList.toggle("hidden")
                        }} data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center  rounded-lg md:hidden cursor-pointer  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className=" hidden sm:spinz-color md:flex flex-wrap md:w-auto" id="navbar-dropdown">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   dark:border-gray-700">
                            <li>
                                <a href="#" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Home" ? "" : "hover:underline decoration-2 underline-offset-5"}`} aria-current="page">Home</a>
                            </li>
                            <li onMouseEnter={() => setShowShop(true)} onMouseLeave={() => setShowShop(false)}>
                                {/* md:hover:underline decoration-white decoration-1 underline-offset-5 */}
                                <button onMouseEnter={(e) => { setArrowPosS(180) }} onMouseLeave={(e) => setArrowPosS(0)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Shop" ? "" : "hover:underline decoration-2 underline-offset-5"}`} ><a href="/shop" style={currnaSty(currentPage, "Shop")} >Shop</a> <svg style={{ transform: `rotate(${arrowPosS}deg)` }} className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg></button>

                                {/* <!-- Dropdown menu -->  */}
                                {showShop && <div id="dropdownNavbar" className="z-10 absolute top-16 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44  dark:divide-gray-600">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Simple Product</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Variable Product</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Grouped Product</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">External Product</a>
                                        </li>
                                        <li>
                                            <a href="/cart" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Cart</a>
                                        </li>
                                        <li>
                                            <a href="/checkout" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Checkout</a>
                                        </li>
                                        <li>
                                            <a href={isLogin ? "/profile" : "/register"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">My acoount</a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ">External</a>
                                    </div>
                                </div>
                                }
                            </li>
                            <li onMouseEnter={() => setShowPage(true)} onMouseLeave={() => setShowPage(false)}>
                                <button onMouseEnter={(e) => { setArrowPosP(180) }} onMouseLeave={(e) => setArrowPosP(0)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Contact" ? "" : "hover:underline decoration-2 underline-offset-5"}`} style={currnaSty(currentPage, "Pages")}>Pages
                                    <svg className={`w-2.5 h-2.5 ms-2.5 `} style={{ transform: `rotate(${arrowPosP}deg)` }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {showPage && <div id="dropdownNavbar" className="z-10 absolute top-16 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44  dark:divide-gray-600">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">About</a>
                                        </li>
                                        <li>
                                            <a href="/contact" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Contact us</a>
                                        </li>
                                        <li>
                                            {/* <button  id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 md:w-auto dark:  dark:focus: dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent md:hover:underline decoration-white decoration-1 underline-offset-5">Pagess <svg style={{ transform : `rotate(${arrowPosS}deg)`}} className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg></button> */}
                                            <a href="/pages" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Pages</a>

                                            {/* <!-- Dropdown menu -->  */}
                                            <div id="dropdownNavbar" className="z-10 hidden font-normal  divide-y divide-gray-100 rounded-lg shadow-sm w-44  dark:divide-gray-600">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">About</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Contact us</a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Blog</a>
                                                    </li>
                                                </ul>
                                                <div className="py-1">
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ">External</a>
                                                </div>
                                            </div>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Collections</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Blog</a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ">External</a>
                                    </div>
                                </div>
                                }
                            </li>
                            <li onMouseEnter={(e) => { setArrowPosC(180); setShowColl(true) }} onMouseLeave={(e) => { setArrowPosC(0); setShowColl(false) }}>
                                <Link to={"/collections"} className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Collections" ? "" : "hover:underline decoration-2 underline-offset-5"}`}>Collections </Link>


                                {showColl && createPortal(<div className='absolute top-18 left-0 w-full bg-white z-50'>
                                    <div className='grid grid-cols-2 md:grid-cols-5 gap-2 py-6 place-items-center w-full'>
                                        {collections.map((category, index) => <ProductCategoryCard key={index} imgSrc={category.src} maxHeight={"220px"} maxWidth={"220px"} category={category.title} />)}
                                    </div>
                                </div>, document.body)}
                                <button onClick={() => setShowColl(true)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="outline-none flex items-center justify-between w-full py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 md:w-auto dark:  dark:focus: dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent md:hover:underline decoration-white decoration-1 underline-offset-5">
                                    <svg style={{ transform: `rotate(${arrowPosC}deg)` }} className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                            </li>
                            {/* <li>
                        <a href="#" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Service" ? "" : "hover:underline decoration-2 underline-offset-5"}`}>Services</a>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Pricing" ? "" : "hover:underline decoration-2 underline-offset-5"}`}>Pricing</a>
                    </li>
                    <li>
                        <a href="/contact" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Contact" ? "" : "hover:underline decoration-2 underline-offset-5"}`} style={currnaSty(currentPage, "Contact")}>Contact</a>
                    </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <div ref={smallMenuRef} className=" hidden bg-white text-black  " id="navbar-dropdown">
                <ul className="mobile-menu flex flex-col font-medium p-4 md:p-0 mt-4  border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   dark:border-gray-700">
                    <li>
                        <a href="#" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Home" ? "" : "hover:underline decoration-2 underline-offset-5"}`} aria-current="page">Home</a>
                    </li>
                    <li onMouseEnter={() => setShowShop(true)} onMouseLeave={() => setShowShop(false)}>
                        {/* md:hover:underline decoration-white decoration-1 underline-offset-5 */}
                        <button onMouseEnter={(e) => { setArrowPosS(180) }} onMouseLeave={(e) => setArrowPosS(0)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Shop" ? "" : "hover:underline decoration-2 underline-offset-5"}`} ><a href="/shop" style={currnaSty(currentPage, "Shop")} >Shop</a> <svg style={{ transform: `rotate(${arrowPosS}deg)` }} className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg></button>

                        {/* <!-- Dropdown menu -->  */}
                        {showShop && <div id="dropdownNavbar" className="z-10 absolute top-16 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44  dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Simple Product</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Variable Product</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Grouped Product</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">External Product</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Cart</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Checkout</a>
                                </li>
                                <li>
                                    <a href={isLogin ? "/profile" : "/register"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">My acoount</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ">External</a>
                            </div>
                        </div>
                        }
                    </li>
                    <li onMouseEnter={() => setShowPage(true)} onMouseLeave={() => setShowPage(false)}>
                        <button onMouseEnter={(e) => { setArrowPosP(180) }} onMouseLeave={(e) => setArrowPosP(0)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Contact" ? "" : "hover:underline decoration-2 underline-offset-5"}`} style={currnaSty(currentPage, "Pages")}>Pages
                            <svg className={`w-2.5 h-2.5 ms-2.5 `} style={{ transform: `rotate(${arrowPosP}deg)` }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {showPage && <div id="dropdownNavbar" className="z-10 absolute top-16 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44  dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">About</a>
                                </li>
                                <li>
                                    <a href="/contact" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Contact us</a>
                                </li>
                                <li>
                                    {/* <button  id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 md:w-auto dark:  dark:focus: dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent md:hover:underline decoration-white decoration-1 underline-offset-5">Pagess <svg style={{ transform : `rotate(${arrowPosS}deg)`}} className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg></button> */}
                                    <a href="/pages" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Pages</a>

                                    {/* <!-- Dropdown menu -->  */}
                                    <div id="dropdownNavbar" className="z-10 hidden font-normal  divide-y divide-gray-100 rounded-lg shadow-sm w-44  dark:divide-gray-600">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                            <li>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">About</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Contact us</a>
                                            </li>

                                            <li>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Blog</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ">External</a>
                                        </div>
                                    </div>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Collections</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ">Blog</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ">External</a>
                            </div>
                        </div>
                        }
                    </li>
                    <li onMouseEnter={(e) => { setArrowPosC(180); setShowColl(true) }} onMouseLeave={(e) => { setArrowPosC(0); setShowColl(false) }}>
                        <Link to={"/collections"} className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Collections" ? "" : "hover:underline decoration-2 underline-offset-5"}`}>Collections </Link>


                        {showColl && createPortal(<div className='absolute top-18 left-0 w-full bg-white z-50'>
                            <div className='grid grid-cols-2 md:grid-cols-5 gap-2 py-6 place-items-center w-full'>
                                {collections.map((category, index) => <ProductCategoryCard key={index} imgSrc={category.src} maxHeight={"220px"} maxWidth={"220px"} category={category.title} />)}
                            </div>
                        </div>, document.body)}
                        <button onClick={() => setShowColl(true)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="outline-none flex items-center justify-between w-full py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 md:w-auto dark:  dark:focus: dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent md:hover:underline decoration-white decoration-1 underline-offset-5">
                            <svg style={{ transform: `rotate(${arrowPosC}deg)` }} className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    </li>
                    {/* <li>
                        <a href="#" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Service" ? "" : "hover:underline decoration-2 underline-offset-5"}`}>Services</a>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Pricing" ? "" : "hover:underline decoration-2 underline-offset-5"}`}>Pricing</a>
                    </li>
                    <li>
                        <a href="/contact" className={`block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${currentPage == "Contact" ? "" : "hover:underline decoration-2 underline-offset-5"}`} style={currnaSty(currentPage, "Contact")}>Contact</a>
                    </li> */}
                </ul>
            </div>
            {isCart && <SliderCart />}
            {isProfile && {}}
            {isSearch && <SearchProducts searchiconblack={searchiconBlack} setSearch={setSearch} />}
        </nav >

    );
}
const subtotal = 900;

const SearchProducts = ({ searchiconblack, setSearch }) => {
    const [searchText, setSearchText] = useState('')

    const [searchStatus, setSearchStatus] = useState(false)
    const [numProductsFound, setNumProductsFound] = useState()
    const [error, setError] = useState()
    const [searchResult, setSearchResult] = useState()

    useEffect(() => {
        setSearchResult('')
        // setSearchStatus(false)
    }, [searchResult, searchStatus])
    const handleSearch = () => {

        if (searchText.length > 2 && searchText.length < 20) {
            setSearchStatus(true)
            fetch(`${serverUrl}/search-product`, {
                method: "POST",
                headers: {
                    "accept": 'application/json'
                }, body: JSON.stringify(searchText)
            })
                .then(res => res.json)
                .then(result => { flushSync(() => { searchStatus(false) }); setNumProductsFound(result) })
                .catch(err => { flushSync(() => { searchStatus(false) }); setError(err); setNumProductsFound(0) })
        }

        if (setNumProductsFound > 0) {
            setSearchResult(setNumProductsFound.length)
        } else {
            console.log(error);
            setSearchResult(error);
        }
    }

    return (


        <div className="bg-white absolute flex flex-col items-center justify-center z-50 left-0 top-32 w-full h-full py-6 min-h-94">
            <button className="text-right mx-auto block w-1/2 text-4xl p-2 " onClick={() => setSearch(false)}>X</button>
            <div className="w-full ">
            </div>
            <form action={""} className="border-2 border-black lg:w-1/2 flex items-center justify-between  ">
                <input onChange={(e) => { setSearchText(e.target.value) }} type="text" className="border-none outline-none py-4 lg:py-8 px-4 text-black " placeholder=" Search prducts" />
                <span role="button" onClick={() => handleSearch()} className="border-s-2 border-black inline-blockpy-4 lg:py-8 px-4 h-full"> <img src={searchiconblack} alt="search icon" /></span>
            </form>
            {searchStatus && <p>Loading...</p>}
            <div className="bg-gray-700">{searchResult}</div>
        </div>

    )
}

const NavbarButton = ({ children, onclickhandler }) => {
    return (
        <button className="cursor-pointer flex items-center gap-1" onClick={onclickhandler}>
            {children}
        </button>
    )
}

