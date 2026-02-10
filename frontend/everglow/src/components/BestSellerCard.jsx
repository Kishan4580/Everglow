import ruppeeLogo from "../assets/rupee-sign-svgrepo-com.svg"
import  Button  from "./Button"
import { Link } from "react-router-dom"
export const BestSellerCard = ({product})=>{
  // console.log(product._id);
    const rangeLe = product.range.length
    let lastPrice, both;
    if(rangeLe > 1) { lastPrice = product.range[rangeLe-1].price

       both = product.range[0].price > lastPrice ? lastPrice + " - " + product.range[0].price : product.range[0].price + " - " + lastPrice
    }else both = product.range[0].price
    return (
        <div className="flex flex-col gap-4 h-full justify-between">
  <img src={product.productimage} alt={product.productname} className="spinz-color rounded-lg" />
  <h2>{product.productname}</h2>
  <p className="flex items-center lg:text-xl font-light">
    <img height="28" width="28" src={ruppeeLogo} alt="₹" />
    {both}
  </p>
  <div className="font-semibold">
    <Button bgColor="black" style1={{ border: "1px solid black", height: "50px" }} product={product._id} quantity={1} onclicksignal={true} >
     { rangeLe > 1 ? <Link to={`/product/${product._id}`}>Choose an Option</Link> : "Add to Cart"}
    </Button>
  </div>
</div>

    )
}

