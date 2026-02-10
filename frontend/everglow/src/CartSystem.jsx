import { useQuery } from "@tanstack/react-query"
import Cart, { CardTotals } from "./Cart"
import Button from "./components/Button"
import { CartContext } from "./cart.js"
import { useContext } from "react"
import { Link } from "react-router-dom"
// import { isPromise } from "formik"
import { SmallLoading } from "./Loading"
import Error from "./Error.jsx"

const serverUrl = import.meta.env.VITE_SERVER_URL

export default function CardSystem({ isSliderCart, isCart, setCart }) {
    // console.log(isSliderCart);
    // isSliderCart = isSliderCart == undefined ? false: true;
    // console.log(isSliderCart);

    const isVerticalScroll = isSliderCart ? "overflow-y-auto h-[250px] border-y-2 " : " "
    const cartstyle = isSliderCart ? "top-0 right-0 w-2/3 md:w-1/2  h-full bg-white fixed z-50 " : "mt-26 "
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
    if (cart.size == 0) {
        return (
            <div className="h-216 relative flex justify-center items-center  p-4  ">
                {/* <button>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path>
                </svg>
            </button> */}
                <div className=" flex flex-col items-center gap-4 text-2xl">
                    <span className=" ">Your cart is empty.</span>
                    <button className="p-2 bg-black text-white"><Link to="/shop">Start Shopping</Link></button>
                </div>
            </div>
        )
    }

    if (isPending) {
        return <div> <SmallLoading ></SmallLoading></div>
    }
    if (isError) {
        return <div> <Error err={error}></Error></div>
    }
    console.log(data);
    if (data.status == 501) {
        return <Error err={{ title: "There was a problem", message: `${data.message} Please try again later.` }}></Error>
    }
    return (
        isCart && <div className={`${cartstyle} p-4`}>
            <h2 className=" h-24 text-2xl">Cart</h2>
            <button className=" w-full" onClick={() => setCart(false)}>
                <svg className="mr-0 ml-auto" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
            </button>
            <hr className="py-2" />
            <div className="lg:flex gap-4">
                <div className="grow-7">
                    <div className={`${isVerticalScroll} flex flex-col gap-4 md:gap-6   md:border-0`}>
                        {data?.map((product, i) => <Cart key={i} quantity={cart.get(product._id) || 0} updateCart={updateCart} price={product.range[0].price} prodInfo={product.productname} proImgSrc={product.productimage} prodId={product._id}></Cart>)}
                    </div>
                    <div className="p-3 flex flex-col gap-4 md:gap-8 border-t-2 mt-4 md:py-14">
                        <div className="flex gap-3 ">
                            <input type="text" className="grow-3 border-2 ps-2" placeholder="Coupon code" />
                            <div className="grow-7">     <Button type="button" value="Apply coupon" bgColor={"black"} style1={{ border: "2px solid black" }} > Add coupon</Button>
                            </div></div>
                        <div className="">   <Button type="button" value="Apply coupon" bgColor={"black"} style1={{ border: "2px solid black" }} >Update cart</Button>
                        </div>
                    </div>

                </div>

                {!isSliderCart && <div className="spinz-color p-4 md:p-8 grow-4 max-h-[820px]">
                    <CardTotals ></CardTotals>
                </div>
                }
            </div>
        </div>
    )
}