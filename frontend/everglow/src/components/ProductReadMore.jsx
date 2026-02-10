import { useEffect, useRef, useState, useContext, useMemo, useCallback } from 'react'
import { flushSync } from "react-dom"
import { data, Link, useParams } from 'react-router-dom'
import { SimpleButton } from "./Account"
import Button from './Button'
import { ProductIncDec } from '../Cart'
import { CartContext } from './cart'
// import cartProductContext from "./cart.js"
import { SmallLoading } from '../Loading'
import { useQuery, useMutation } from "@tanstack/react-query"
import './ProductReadMore.css'

import skinsecret from "../assets/products/collection-image-8-1536x607.jpg"
import imgsrc1 from "../assets/products/single-product-image-1.jpg"
import imgsrc2 from "../assets/products/single-product-image-2.jpg"
import imgsrc3 from "../assets/products/single-product-image-3.jpg"
import Loading from '../Loading'
import { Rating } from './Shop'
import Error from '../Error'
const serverURL = import.meta.env.VITE_SERVER_URL
const ProductReadMore = () => {
    const [isDesShow, setIsDesShow] = useState(false)
    const [zoom, setZoom] = useState(false)
    const zoomRef = useRef()
    const [prSelected, setPrSelected] = useState(0)
    const [slide, setSlide] = useState(1)
    const [slideM, setSlideM] = useState(1)
    const [slideW, setSlideW] = useState()
    const w = useRef(null)
    const [isAddInfoShow, setIsAddInfoShow] = useState(false)
    const [isReviewShow, setIsReviewShow] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [k, setK] = useState(0)
    const [option, setOption] = useState([1, 0, 0])
    const [zoomImg, setZoomImg] = useState(null)
    const [reload, setReload] = useState(false);
    const id = useParams().id;
    const getProductOneInfo = async (id) => {
        //    console.log(id);

        const response = await fetch(`${serverURL}/product:${id}`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return await response.json()

    }



    // const jsonStr = JSON.stringify(proId)
    // const removeQ = proId.split("'")
    // console.log(removeQ);
    const {
        data, isPending, isError, error
    } = useQuery({ queryKey: ['product', id], queryFn: () => getProductOneInfo(id) });
    const filter = (e) => {
        if (e === "D") {
            if (isDesShow) {
                setIsDesShow(false)
                return
            }
            setIsDesShow(true)
            setIsAddInfoShow(false)
            setIsReviewShow(false)
        }
        else if (e === "A") {
            if (isAddInfoShow) {
                setIsAddInfoShow(false)
                return
            }
            setIsAddInfoShow(true)
            setIsDesShow(false)
            setIsReviewShow(false)
        }
        else if (e === "R") {
            if (isReviewShow) {
                setIsReviewShow(false)
                return
            }
            setIsReviewShow(true)
            setIsDesShow(false)
            setIsAddInfoShow(false)
        }
    }

    const handlerIncrement = () => {
        // console.log("increment")
        setQuantity(quantity + 1)

        // console.log(quantity);

    }
    const handlerDecrement = () => {
        // console.log("decrement")
        setQuantity(quantity - 1)
        // console.log(quantity);

    }
    const removeItems = () => {
        if (removeRef) {
            removeRef.current.remove()
        }
        throw new Error("removeRef is undefined")
    }
    const { cartProducts, setCartProducts } = useContext(CartContext)
    // const { setC } = useContext()

    const addToCart = (productId, quantity) => {
        setCartProducts(prevMap => {
            const newMap = new Map(prevMap); // clone
            newMap.set(productId, { qty: quantity });
            return newMap;
        });

    }
        // console.log( data);
    useEffect(()=> {
        if(data && data["plain.productimage"] && data["plain.productimage"][0]) {
            setZoomImg(data["plain.productimage"][0])
        }
    }, [data])
    const transform = {
        transform: `translateX(${slideM}px)`,
        minWidth: '100%'

    }

    const dimension = {
        // "--img-zoom": `${imgsrc1}`

        flex: " 0 0 100%"

    }
    
    if (isPending) {
        return < SmallLoading />
    }

    if (isError) {
        return <div className='h-[450px] flex items-center'><Error err={{title : " Error", message: "Something went wrong"}} setReload={setReload}/></div>
        // <span>Error: {error.message}</span>
    }
    // console.log();
    // useCallback(() => , [data]);
    const buttons = [
        { title: "Additional Informations", info: "An intensely moisturizing, but lightweight, non-greasy hand lotion thanks to a blend of botanical oils that deliver superior, deeply penetrating hydration leaving skin soft and supple. Our bestselling hand moisturizer combines precious Rose Petal Oil, with Rosehip, Camelia, Sea Buckthorn, Wheat Germ Oil and Vitamin E. Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils." },
        { title: "Ingredients", info: "Our bestselling hand moisturizer combines precious Rose Petal Oil, with Rosehip, Camelia, Sea Buckthorn, Wheat Germ Oil and Vitamin E. Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils" }
        , { title: "Special Instructions", info: "Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils." }
    ]
// console.log(data);

    return (
        <div className=''>
            <div className='spinz-color grid lg:grid-cols-2 md:gap-6 lg:gap-16 px-4 md:px-6  py-14 md:py-20   '>
                <div className=''>
                    <div className="">
                        <div className=' relative  '>
                            <div ref={w} className='relative bg-white order-2' onMouseMove={(e) => {
                                if(zoom && zoomRef.current) {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                                    console.log("X : ",x,"Y", y);
                                    
                                    zoomRef.current.style.setProperty("--x", x + "%");
                                    zoomRef.current.style.setProperty("--y", y + "%");
                                }
                            }} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}>
                                {k == 0 && < img src={ data["plain.productimage"][0] || data[0]["plain.productimage"][0]} alt={"first image"} className='aspect-square  ' style={{ maxWidth: "100%", maxHeight: "100%", width: "100%", height: "100%", flexShink: 0, ...dimension }} />}
                                {k == 1 && < img src={data["plain.productimage"][1]} alt={"second image"} className='aspect-square' style={{ maxWidth: "100%", maxHeight: "100%", width: "100%", height: "100%", flexSrink: 0, }} />}
                                {k == 2 && < img src={data["plain.productimage"][2]} alt={"third image"} className='aspect-square' style={{ maxWidth: "100%", maxHeight: "100%", width: "100%", height: "100%", flexSrink: 0, }} />}
                                {/* {k == 3 && < img src={data["plain.productimage"[3]]} alt={"first image"} className='aspect-square' style={{ maxWidth: "100%", maxHeight: "100%", width: "100%", height: "100%", flexSrink: 0, }} />} */}
                            </div>

                            {zoom && zoomImg && (
                                <div 
                                    ref={zoomRef} 
                                    className='zoom-effect z-10 h-full w-full absolute top-0 left-0' 
                                    style={{
                                        '--img-zoom': `url(${zoomImg})`,
                                        '--x': '50%',
                                        '--y': '50%'
                                    }}
                                >
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex  gap-4 py-4  '>
                        
                        { data["plain.productimage"].map((item, i) =>
                            < Image key={i} k={k} setK={setK} setZoomImg={setZoomImg} setPrSelected={setPrSelected} slide={slide} slideW={slideW} setSlideM={setSlideM} setSlide={setSlide} prSelected={prSelected} i={i} imgsrc={item} alt={item} maxWidth="200px" maxHeight="200px" />)}
                    </div>
                </div>
                <div className="product-read-more   flex flex-col  gap-4 text-xl md:text-2xl bg-white p-3 md:p-5">
                    <h3 className='py-2'>{data.productname}</h3>
                    {/* {console.log(data)} */}
                    
                    <Rating rating={data.reviews} />
                    <hr className='bg-gray-500 h-0.5 my-3 ' />
                    <p>{data.range.price}</p>
                    <p>{data["productdesc"]}</p>
                    <hr className='bg-gray-500 h-0.5 my-3 ' />
                    <div className='border '>
                        <ProductIncDec handlerDecrement={() => handlerDecrement(quantity, setQuantity)} handlerIncrement={() => handlerIncrement(quantity, setQuantity)} quantity={quantity} setQuantity={setQuantity} />
                        <Button bgColor={"black"} product={data._id} quantity={quantity} onclicksignal={true} onclick={() => addToCart(data.id, quantity)}>Add to cart</Button>
                    </div>
                    {/* <p>Out of stock : {data.inStock}</p> */}
                    <p>SKU :  <b>{data.sku}</b></p>
                    {/* {''.t} */}
                    <p className='flex flex-wrap items-center gap-2 '>Category : {data.categories.map((v, i) => <Link key={i} to={`/product-category/${v}`} className='text-xl'>{v}</Link>)}</p>
                    <div className='px-12'>

                        {/* {isDesShow && <div className=''>
                            <h1>Overview: see what makes our product unique</h1>
                            <p>{product.description}</p>
                            < SkinSecrets skinsecret={skinsecret} />
                        </div>} */}
                        {/* {isAddInfoShow && <p>{data.additionalInfo}</p>}
                        {isReviewShow && <p>{data.reviews}</p>} */}

                    </div>
                </div>

            </div>
            <div className=" border-b px-4 py-6 lg:py-10 text-lg lg:text-xl bg-white">
                <button className='block py-3 px-5 text-2xl font-semibold' onClick={() => filter("D")} >Description</button >
                <button className='block py-3 px-5 text-2xl font-semibold' onClick={() => filter("A")}>Additional information</button>
                <button className='block py-3 px-5 text-2xl font-semibold' onClick={() => filter("R")} >Reviews({data.reviews.length})</button>

            </div>
            <div className='bg-white px-4 md:px-8 lg:px-10'>
                {/* <Description description={data.description} /> */}
               {isDesShow &&  <CareForYourSkin />}
               {/* {console.log(data)
               } */}
                {isAddInfoShow &&  data.range.map((item) =>{
                     console.log(item.dimension);
                 return <AdditionalTable quantity={item.quantity} isBiodegradable={item.isBiodegradable} dimension={item.dimension} />})}
                {isReviewShow && <Review reviews={data.reviews}  productname={data.productname}/>}
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="spinz-color md:w-1/2  w-full">
                    {buttons.map((v, l) => {
                        // console.log(option);
                        
// console.log( option[l]);

                        return <OpenButton i={l+1} key={l} setOption={setOption} title={v.title} info={v.info} isOpen={option[l]} />
                    }
                    )}
                    {/* <OpenButton i={2} setOption={setOption} title={"Additional Informations"} info={"An intensely moisturizing, but lightweight, non-greasy hand lotion thanks to a blend of botanical oils that deliver superior, deeply penetrating hydration leaving skin soft and supple. Our bestselling hand moisturizer combines precious Rose Petal Oil, with Rosehip, Camelia, Sea Buckthorn, Wheat Germ Oil and Vitamin E. Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils."} />
                    <OpenButton i={3} setOption={setOption} title={"Ingredients"} info={"An intensely moisturizing, but lightweight, non-greasy hand lotion thanks to a blend of botanical oils that deliver superior, deeply penetrating hydration leaving skin soft and supple. Our bestselling hand moisturizer combines precious Rose Petal Oil, with Rosehip, Camelia, Sea Buckthorn, Wheat Germ Oil and Vitamin E. Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils."} /> */}
                    {/* < Instructions  title/> */}
                </div>
                <img src={imgsrc1} alt={"Image"} className=' md:w-1/2 w-full' />

            </div>
            <SkinSecrets skinsecret={skinsecret} />
        </div>

    )
}
const Image = ({ imgsrc, alt, maxHeight, maxWidth, prSelected, setZoomImg, setPrSelected, slide, setSlide, i, k, setK, slideW, setSlideM }) => {
    const cBorder = i === k ? "border-3 border-black" : "border-2 border-black"
    return (
        <button className={` ${cBorder}`} onClick={() => {
            console.log("selected");
            flushSync(() => {
                // setPrSelected(i); console.log(i);
                setK(i)
                setZoomImg(imgsrc)
                // let diff;
                // if (i > slide) {
                //     diff = i - slide; setSlide(i);
                // } else { diff = slide - i } console.log(diff, "Difference", slideW);
                // setSlideM(-(slideW * diff)); console.log(slide);
            });

        }
        }>
            <img className='' src={imgsrc} alt={alt} height={"100%"} width={"100%"} style={{ maxHeight: maxHeight, maxWidth: maxWidth, height: "100%", width: "100%" }} />
        </button>
    )
}
const AdditionalTable = ({ quantity, isBiodegradable, dimension }) => {
    const isBio = isBiodegradable ? "Yes" : "No";
    console.log(dimension);
    
    const cuDime = `${dimension.l} X ${dimension.b} X ${dimension.h} ${dimension.unit}`;
    return (
        <table className='border w-full my-3'>
           <tbody> <tr className=' border-b '><td className='p-2'>Quantity</td><td className='border-s px-2'>{quantity}</td></tr>
            <tr className=' border-b '><td className='p-2'>Biodegradable</td><td className='border-s px-2'>{isBio}</td></tr>
            <tr className=' border-b '><td className='p-2'>Dimension</td><td className='border-s px-2'>{cuDime}</td></tr>
       </tbody>
        </table>
    )
}

const Review = ({ reviews, productname }) => {
    const isReviews = reviews.length > 0 ? true : false
    console.log(reviews);
    
    return (
        <div>
            <h3>Reviews</h3>
            {isReviews ? reviews.map((review, index) => {
                return (
                    <div key={index} className='spinz-color p-4 '>
                       < Rating rating={review.rating} />
                        <p>{review.reviewname}</p>
                        <p>{review.review}</p>
                        <p>{review.
reviewdate}</p>
                    </div>
                )
            }) : <div className='py-4 border-y-2'>
                <p >There are no reviews yet.</p>
                <h3>Be the first to review  {productname}</h3>
            </div>}
             <TakeReview proId={data._id} />
        </div>
    )
}

const TakeReview = ({proId}) => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [rating, setRating] = useState(0)
const [rememberMe, setRememberMe] = useState(0)

const [comment, setComment] = useState("")
const [validationInfo, setValidationInfo] = useState("")

    const submitReview = async (reviewData) => {
        const response = await fetch(`${serverURL}/submit-review?proId=${proId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        })
        if (!response.ok) throw new Error('Failed to submit review')
        return response.json()
    }

    const mutation = useMutation({
        mutationFn: submitReview,
        onSuccess: () => {
            setValidationInfo("Review submitted successfully!")
            setName(""); setEmail(""); setRating(0); setComment("")
        },
        onError: () => setValidationInfo("Failed to submit review")
    })

    const handleReview = () => {
        setValidationInfo("")
        
        if (!rating || rating < 1 || rating > 5) {
            setValidationInfo("Please provide a valid rating (1-5)")
            return
        }
        if (!comment || comment.length < 10) {
            setValidationInfo("Comment must be at least 10 characters")
            return
        }
        if (!name || name.length < 3) {
            setValidationInfo("Name must be at least 3 characters")
            return
        }
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setValidationInfo("Please provide a valid email")
            return
        }

        mutation.mutate({ name, email, rating, comment })
    }
    return (
        <div className='py-12'>
            <h3>Take a review</h3>
            <form action="" className='flex flex-col gap-y-4 md:gap-y-6'>
                <div >{validationInfo}</div>
                <label htmlFor="rating">Your rating*</label>
                <input onChange={(e) => {if (Number( e.target.value ) > 0 && Number( e.target.value ) < 5 ) {
                    setRating(e.target.value)
                }}} type="number" name="rating" min={1} max={5} id="" className='border-2 border-gray-500 block w-full py-3 px-2' />
                <label htmlFor="comment">Comment*</label>
                {/* <input type="text" name="comment" id=""  className='border block w-full py-3'/> */}
                <textarea onChange={(e) => {if (e.target.value.length <= 100) {
                    setComment(e.target.value)
                }}} name="review" id="review" className='border-2 block-2 border-gray-500 w-full py-3 h-32 px-2'></textarea>
                <label htmlFor="name">Name*</label>
                <input onChange={(e) => {if (e.target.value.length <= 20 && e.target.value.length >= 3) {
                    setName(e.target.value)
                }}} type="text" name="name" id="name" className=' border-gray-500 border-2 block w-full py-3 px-2' />
                <label htmlFor="email">Email*</label>
                <input onChange={(e) => {if (e.target.value.length <= 20 && e.target.value.length >= 3 ) {
                   if ( e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)  ) {
                    setEmail(e.target.value)
                   } 
                }}} type="email" name="email" id="email" className='border-2 border-gray-500 block w-full py-3 px-2' />
                <div className='flex gap-2'>
                    <input type="checkbox" />
                    <label htmlFor="remember">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>
               <div className="w-25"> <SimpleButton children={"Submit"} onclick={handleReview} /></div>
            </form>
        </div>
    )
}
const ratingOutOfFive = [0, 0, 0, 0, 0,]

const ButtonGroup = ({ product }) => {
    const [rating, setRating] = useState(0)

    const handleRating = (e) => {
        // ratingOutOfFive.filter(())
        setRating(e.target.innerText)
    }
    const hoverOrClickStyle = {
        "borderBottom": "2px solid black",
        "paddingBottom": "2px",
        width: "100%",
        outline: "none"
    }
    return (
        <div className="flex gap-3">
            {ratingOutOfFive.map((rating, index) => {
                return (
                    <button style={{ hoverOrClickStyle }} key={index}>{index}</button>
                )
            })}
        </div>
    )
}


const SkinSecrets = () => {
    return (
        <div style={{ background: `url(${skinsecret}) center/cover` }} className='relative -z-0 text-white'>
            <div className=' gap-4 flex flex-col md:justify-start lg:w-1/2 py-6 md:py-32 px-4 md:px-10 relative z-0'>
                <h3>Skin Health and Beauty</h3>
                <h1>Skin’s Secrets</h1>
                <p className='text-white md:text-xl!'>The scientific journals that focus on skin care and dermatology. One prominent example is the “Journal of Investigative Dermatology” (JID), which covers a wide range of topics related to skin biology, diseases, and therapies. It publishes original research articles, reviews, and clinical studies</p>
                <div className="w-1/4"><Button bgColor={"white"} style1={{ border: "1px solid white" }}>Explore More</Button></div>
            </div>
        </div>
    )
}

const Instructions = ({ ingredients, instructions, additional, }) => {
    return (
        <div className='flex flex-col md:flex-row gap-4 py-6 md:py-16 px-4 md:px-10'>
            <button>Special Instructions </button>
            <p>An intensely moisturizing, but lightweight, non-greasy hand lotion thanks to a blend of botanical oils that deliver superior, deeply penetrating hydration leaving skin soft and supple. Our bestselling hand moisturizer combines precious Rose Petal Oil, with Rosehip, Camelia, Sea Buckthorn, Wheat Germ Oil and Vitamin E. Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils.</p>
        </div>
    )
}

const OpenButton = ({ title, info, isOpen, setOption, i, }) => {
    const handleClick = () => {
        setOption(prev => {
            const newState = [0, 0, 0];
            newState[i - 1] = 1;
            return newState;
        });
    };

    return (
        <div className="my-6 md:my-8 mx-4 md:mx-10  text-lg md:text-xl font-semibold ">
            <div>
                <button onClick={handleClick} className='border-b-1 w-full p-3  inline-flex justify-between gap-x-2'>
                    <span>{title}</span>
                    <span> <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg></span>
                </button>
                {isOpen > 0 && <div className='py-4 text-sm md:text-base '>
                    {info}
                </div>}

            </div>
        </div>

    )
}

const CareForYourSkin = () => {
    return (
        <div className='py-6 md:py-16 '>
            <div className="px-4 md:px-10 text-lg">
                <h1>Overview: see what makes our product unique</h1>
                <p className='py-2 md:py-3'>
                    An intensely moisturizing, but lightweight, non-greasy hand lotion thanks to a blend of botanical oils that deliver superior, deeply penetrating hydration leaving skin soft and supple. Our bestselling hand moisturizer combines precious Rose Petal Oil, with Rosehip, Camelia, Sea Buckthorn, Wheat Germ Oil and Vitamin E. Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils.
                </p>
                <hr className='my-6 md:my-8 lg:my-12' />
            </div>

            <div className="grid md:grid-cols-2 gap-0">
                <div className='spinz-color flex flex-col gap-4 rounded-sm py-6 md:py-16 px-4 md:px-8 lg:px-12'>
                    <h2>
                        “Care for your skin, embrace self-love, and radiate beauty through mindful skincare practices.”
                    </h2>
                    <div className="w-1/3">
                        <Button bgColor={"black"} style1={{border : "2px solid black"}}>Learn More</Button>
                    </div>

                    <div><img src={imgsrc3} className='' alt={"Image"} /></div>

                </div>

                <div>
                    <div className="h-11/12 "><img className='h-full w-full' src={imgsrc2} alt={"Image"} /></div>

                </div>
            </div>
        </div>
    )
}
export { SkinSecrets, ProductReadMore }