import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
// import { ShopContext } from "../contextstore"
import { flushSync } from "react-dom";
import Button from "./Button";
import Loading, { SmallLoading } from "../Loading"
import Error from "../Error"
import fillstar from "../assets/star.png"
import outlinestar from "../assets/star-outlined.png"

const serverURL = import.meta.env.VITE_SERVER_URL;
const viteUrl = import.meta.env.VITE_UI_SERVER_URL;
// console.log(viteUrl)

const getProductOneInfo = (productId) => {
    console.log('Product ID:', productId);
}   
export default function Shop({ category }) {
    const [products, setProducts] = useState([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({})
    const [nomatch, setNoMatch] = useState(false)
    const [sort, setSort] = useState(false)
    const [stock, setStock] = useState(false)
    const [price, setPrice] = useState(false)
    const [totalProducts, setTotalProducts] = useState(0)
    // const readData = useContext(ShopContext)
    const totalProductCount = async (category = "shop") => {
        const res = await fetch(`${serverURL}/product-count`, {
            method: "GET",
            headers: { "Content-Type": "application/json",
                "Accept": "application/json",
                data: category
             }
        })
        const data = await res.json();
        setTotalProducts(data.count)
        console.log(data.count);
        

        return data.count;
    }
    const [filterProducts, setFilterProducts] = useState({ sort: "", pricerange: { st: 1, end: 9999 }, stock: { inStock: false, outOfStock: false } })
    const [originalProducts, setOriginalProducts] = useState([])
    const [reload, setReload] = useState(false)
    // const fetchcategorywiseproducts = async (category) => {
    //     setLoading(true)
    //     const uri = `${serverURL}/product-category/${category}`
    //     await fetch(uri).then((res) => { res.json(); setLoading(false) }, (rej) => { setLoading(false); throw new Error("Something went wrong, please try again !") })
    // }
    const filteredProducts = useMemo(() => {
        console.log("filtering starts");
        console.log(originalProducts);
        
        const filtered = originalProducts.filter((product) => {
            // Price range filter
            const inPriceRange = product.minPrice >= filterProducts.pricerange.st && product.maxPrice <= filterProducts.pricerange.end;

            // Stock filter
            let stockCondition = true;
            if (filterProducts.stock.inStock && !filterProducts.stock.outOfStock) {
                stockCondition = product.instock > 0;
            } else if (filterProducts.stock.outOfStock && !filterProducts.stock.inStock) {
                stockCondition = product.instock === 0;
            }

            return inPriceRange && stockCondition;
        }).sort((a, b) => {
            if (filterProducts.sort === 'price-low-high') return a.minPrice - b.minPrice;
            if (filterProducts.sort === 'price-high-low') return b.maxPrice - a.maxPrice;
            if (filterProducts.sort === 'name-a-z') return a.productname.localeCompare(b.productname);
            if (filterProducts.sort === 'name-z-a') return b.productname.localeCompare(a.productname);

            return 0;
        });

        console.log("Filtered products:", filtered);
        setNoMatch(filtered.length === 0);
        return filtered;
    }, [originalProducts, filterProducts]);
    useEffect(() => {
        setLoading(true)
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (category === "shop") {
            // console.log("shop page in user ");
            fetch(`${serverURL}/shop`, options)
                .then((res) => res.json())
                .then((data) => {
                    // setLoading(false)
                    console.log(data);
                    const products = data.products;
                    const categories = data.categorieswisecount
                    setCategories(categories)
                    setOriginalProducts(products)
                    setProducts(products)
                    console.log(products);
                    setStart(products.length > 0 ? 1 : 0)
                    setEnd(products.length)
                    setLoading(false)
                    console.log(categories);
                }).catch((err) => { setLoading(false); setError({ title: "Error", message: "Error to fetch all products." }); console.log("Error to fetch data", err) })
        } else {
            const fetchCategoryData = async () => {
                await totalProductCount(category);
                setLoading(true)
            fetch(`${serverURL}/product-category/${category}`, options)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    flushSync(() => setLoading(false))
                    // const products = data.products;
                    setOriginalProducts(data)
                    setProducts(data)
                    setStart(data.length > 0 ? 1 : 0)
                    setEnd(data.length)
                    // setProducts(filteredProducts);
                }).catch((err) => { setLoading(false); setError({ title: "Error", message: `Error to fetch ${category} data` }); console.log(`Error to fetch ${category} data `, err) })
            };
            fetchCategoryData();
        }
    }, [category])


    useEffect(() => {
        
        setOriginalProducts(products);
    }, [products]);
    // console.log(error);
    const IsError = Object.keys(error).length > 0;
    // console.log(IsError);    
    if (IsError) {
        console.log(error);
        return (<div className="h-[450px] flex justify-center items-center">
            <Error err={error} setReload={setReload} />
        </div>)
    }
    const countInOrOutStockProd = (products) => {
        let counInstockProducts = 0, counOutstockProducts = 0;
        products.filter((value) => {
            if (value.instock > 0) {
                counInstockProducts += 1;
            } else {
                counOutstockProducts += 1;
            }
        })
        return { counInstockProducts, counOutstockProducts }
    }
    console.log(countInOrOutStockProd(products));


    const toggleFilter = (filterType) => {
        console.log(filterType);
        
        switch (filterType) {
            case "sort":
                flushSync(() => setSort(!sort));
                flushSync(() => setPrice(false));
                flushSync(() => setStock(false));
                console.log(sort);

                break;
            case "price":
                flushSync(() => setPrice(!price));
                flushSync(() => setSort(false));
                flushSync(() => setStock(false));
                console.log(price);
                
                break;
            case "stock":
                flushSync(() => setStock(!stock));
                flushSync(() => setSort(false));
                flushSync(() => setPrice(false));
                console.log(stock); 
                break;
        }
    }

    const PriceRange = () => {
        return (
            <div className="p-3 w-1/3 bg-white">
                <div className="flex justify-between py-2">
                    <input type="range" name="start" value={filterProducts.pricerange.st} onChange={(e) => setFilterProducts({ ...filterProducts, pricerange: { ...filterProducts.pricerange, st: e.target.value } })} min={1} max={9999} />
                    <input type="range" name="end" value={filterProducts.pricerange.end} onChange={(e) => { const newEnd = Math.max(Number(e.target.value), Number(filterProducts.pricerange.st)); setFilterProducts({ ...filterProducts, pricerange: { ...filterProducts.pricerange, end: newEnd } }); }} min={filterProducts.pricerange.st} max={9999} />

                </div>
                <form className=" flex flex-col gap-2" >
                    <div className="flex justify-between  gap-2">
                        <input type="number" className="border p-3" value={filterProducts.pricerange.st} onChange={(e) => setFilterProducts({ ...filterProducts, pricerange: { ...filterProducts.pricerange, st: e.target.value } })} />
                        <input type="number" className="border p-3" value={filterProducts.pricerange.end} onChange={(e) => { const newEnd = Math.max(Number(e.target.value), Number(filterProducts.pricerange.st)); setFilterProducts({ ...filterProducts, pricerange: { ...filterProducts.pricerange, end: newEnd } }); }} />
                    </div><div className="flex justify-between">
                           {/* <button className="py-4 px-6 bg-black text-white">Reset</button> */}

                        {/* <button className="py-4 px-6 bg-white text-black">Apply</button> */}
                    </div>
                </form>
            </div>
        )
    }
    const Pagination = () => {
        const [totalPages, setTotalPages] = useState(0);

        useEffect(() => {
            totalProductCount(category).then(count => {
                const pages = Math.ceil(count / 16);
                setTotalPages(pages);
            });
        }, []);

        const pagination = (pageNum) => {
            const uri = `${serverURL}/shop?page=${pageNum}`;
            const options = {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            };

            fetch(uri, options)
                .then(res => res.json())
                .then(data => {
                    setProducts(data.products);
                    setStart((pageNum - 1) * 16 + 1);
                    setEnd(pageNum * 16 > totalProducts ? totalProducts : pageNum * 16);
                });
        };

        if (totalPages <= 1) return null;

        return (
            <div className="flex gap-2 justify-center my-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className="border-2 p-2 px-4 rounded-full   flex justify-center items-center"
                        onClick={() => pagination(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    const Availability = ({ instock, outofstock }) => {
        return (
            <form>
                <label htmlFor="">
                    <input type="checkbox" onChange={(e) => setFilterProducts({ ...filterProducts, stock: { ...filterProducts.stock, outOfStock: !e.target.checked, inStock: e.target.checked, } })} checked={filterProducts.stock.inStock} />
                    In stock ({instock})
                </label>
                <label htmlFor="">
                    <input type="checkbox" onChange={(e) => setFilterProducts({ ...filterProducts, stock: { ...filterProducts.stock, outOfStock: e.target.checked, inStock: !e.target.checked } })} checked={filterProducts.stock.outOfStock} />
                    Out of stock ({outofstock})
                </label>
            </form>
        )
    }
    if (loading) {
        return <div className="h-[450px] flex justify-center items-center"> <SmallLoading /></div>
    }
    let result;
    // console.log(category);
    // products?.length > 0 &&
    if (category === "shop") {
        result = <div className="flex flex-col gap-y-4 ">
            <h1>All Products</h1>
            <p>Join us on this journey to radiant, healthier-looking skin, and embrace a newfound confidence in your own timeless beauty.</p>
            {nomatch && <p className="border-b-2 border-red-700 pe-2">No products were found matching your selection.</p>}

            <hr className="my-4" />
            <div className=" flex flex-wrap gap-2 md:gap-6">
                {categories.map((category) => {
                    return (
                        <div key={category.category} className="">
                            <Link className="hover:underline underline-offset-6" to={`${viteUrl}/product-category/${category.category}`}>{category.category} ({category.count})</Link>
                        </div>
                    )
                })}
            </div>
            <div>

                <div>
                    <div className="flex justify-between flex-wrap items-center gap-y-2  ">
                        <div className=" flex border-2">
                            < DropdownButton inbetweenborder={true} children={"Availability"} handler={() => toggleFilter("stock")} />
                            < DropdownButton children={"Price"} handler={() => toggleFilter("price")} />
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            { }
                            {/* // The issue is in this line: */}
                            {/* // Showing { st = products.length - products.length - 1 `${st} to ${products.length} of ${products.length}`} results */}

                            {/* // Here's the corrected version: */}
                            <div>Showing {(() => {
                                // const st = products.length - products.length + 1;
                                return `${start} to ${end} of ${totalProducts}`;
                            })()} results</div>

                            {/* // Or alternatively: */}
                            {/* <div>Showing {`${1} to ${products.length} of ${products.length}`} results</div> */}

                            <div className="border-2">< DropdownButton children={"Default Sorting"} handler={() => toggleFilter("sort")} /></div>
                        </div>
                    </div>
                    <div className="relative">
                        {sort && <SortByPopulariy setFilterProducts={setFilterProducts} filterProducts={filterProducts} />}
                        {stock && (() => {
                            const { counInstockProducts, counOutstockProducts } = countInOrOutStockProd(products);
                            return <Availability instock={counInstockProducts} outofstock={counOutstockProducts} />;
                        })()}
                        {price && <PriceRange />}
                    </div>
                    <hr className="my-4" /></div>
                {/* <ul> */}
                <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {/* {console.log(products)
                    } */}
                    {originalProducts?.map((product, i) => {
                        const rangeLe = product.minPrice !== product.maxPrice ? 2 : 1;

                        // console.log(product);
                        // <div key={product.id} className="block py-2 px-3  text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:underline decoration-white decoration-1 underline-offset-2 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        //     <Link to={""}>{product} ({product.count})</Link>
                        // </div>
                        const slug = product.productname.replace(/ /g, '-')
                        // console.log(slug);
                        // console.log(product);

                        return (
                            <>
                                <div className="flex flex-col gap-2 justify-between" >
                                    <Link to={`/product/${product._id}`} className="flex flex-col gap-2  " onClick={() => getProductOneInfo(product._id)}>
                                        <img src={product.productimage} alt="Product Image" className="spinz-color " />
                                    </Link>
                                    <Rating rating={product.rating} />
                                    <Link to={`/product/${product._id}`} className="flex flex-col gap-2  " onClick={() => getProductOneInfo(product._id)}>
                                        <h2>{product.productname}</h2> </Link>
                                    <p>Price: {product.minPrice} - {product.maxPrice}</p>
                                    <Button style1={{ border: "2px solid black" }} bgColor={"black"} product={product._id} quantity={1} onclicksignal={true} >     {rangeLe > 1 ? <Link to={`/product/${product._id}`}>Choose an Option</Link> : "Add to Cart"}
                                    </Button>
                                </div>
                            </>
                        )
                    }
                    )
                    }
                </div>
                {/* {<Pagination />} */}
            </div>
            {/* </ul> */}
        </div>
    }
    else {
        result = <div className=" ">
            <h1>{category}</h1>
            <div>
                <hr className="my-4" />
                <div>
                    <div className="flex justify-between flex-wrap  ">
                        <div className=" flex border-2">
                            < DropdownButton inbetweenborder={true} children={"Availability"} handler={() => toggleFilter("stock")} />
                            < DropdownButton children={"Price"} handler={() => toggleFilter("price")} />
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <div>Showing {`${start} to ${end} of ${totalProducts}`} results</div>
                            <div className="border-2">< DropdownButton children={"Default Sorting"} handler={() => toggleFilter("sort")} /></div>
                        </div>
                    </div>
                    <div className="relative">
                        {sort && <SortByPopulariy setFilterProducts={setFilterProducts} filterProducts={filterProducts} />}
                        {stock && (() => {
                            const { counInstockProducts, counOutstockProducts } = countInOrOutStockProd(products);
                            return <Availability instock={counInstockProducts} outofstock={counOutstockProducts} />;
                        })()}
                        {price && <PriceRange />}
                    </div>
                    <hr className="my-4" /></div>
                {/* <ul> */}
                <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {console.log(products)}
                    {originalProducts?.map((product, i) => {
                        // console.log(product.productimage);
                        // <div key={product.id} className="block py-2 px-3  text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:underline decoration-white decoration-1 underline-offset-2 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        //     <Link to={""}>{product} ({product.count})</Link>
                        // </div>
                        return (
                            <div key={i} className="flex flex-col gap-2 justify-between ">
                                <div key={i} className="flex flex-col gap-2 " onClick={() => getProductOneInfo}>
                                    <Link to={`/product/${product._id}`} className="flex flex-col gap-2  " onClick={() => getProductOneInfo(product._id)}>
                                        <img src={product.productimage} alt="Product Image" className="spinz-color " />
                                    </Link>
                                    <Rating rating={product.rating} />
                                    <Link to={`/product/${product._id}`} className="flex flex-col gap-2  " onClick={() => getProductOneInfo(product._id)}>
                                        {product.productname}</Link> <p>Price: {product.minPrice} - {product.maxPrice}</p>
                                </div>
                                <Button bgColor={"black"} style1={{ border: "2px solid black" }} >Add to cart</Button>
                            </div>
                        )
                    }
                    )
                    }
                </div>
            </div>
            {/* </ul> */}
        </div>
    }
    { loading && <div className="w-1/3 h-1/3" > < Loading /></div> }
    return (
        <div>
        <div className="flex justify-center pt-22 pb-6 top-50 h-full w-full px-4 md:px-10  ">
            <div>{result}</div>
            

        </div>
        <Pagination />
        </div>
    )
}
const Rating = ({ rating }) => {
    console.log(rating);

    const n = rating.length
    if (n === 0) {
        return
    }
    // Find highest rating value from array of objects using reduce
    // const a = [{ ra: 3 }, { ra: 5 }, { ra: 4 }];
    // const highestRating = rating.reduce((max, obj) => obj.rating > max ? obj.rating : max, 0);
    return (
        <div>
            {/* <h3> {n} Customer reviews</h3> */}
        <div className="flex">
            {Array.from({ length: rating }).map((_, i) => (
                <img key={i} src={fillstar} alt="Star" />
                // {i < highestRating ? '★' : '☆'}
                // </img>
            ))}
            {Array.from({ length: 5 - rating }).map((_, i) => (
                <img key={i} src={outlinestar} alt="Star" />
                // {i < highestRating ? '★' : '☆'}
                // </img>
            ))}

        </div>
        </div>)
}
const DropdownButton = ({ children, handler, inbetweenborder }) => {

    const border = inbetweenborder ? "border-r-2" : ""
    return (
        <button className={`flex justify-evenly place-items-center  p-2 ${border} `} onClick={handler}>
            <span>{children} </span>
            <span className="">
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </span>
        </button>
    )
}
const SortByPopulariy = ({ setFilterProducts, filterProducts }) => {
    return (
        <div>
            <select className="py-2" name="popularity" id="sort-products" onChange={(e) => {
                // console.log(e.target.value);
                setFilterProducts({ ...filterProducts, sort: e.target.value })
            }}>
                <option value="default-sorting">default sorting</option>
                <option value="sort-by-popularity">sort by popularity</option>
                <option value="sort-by-average-rating">sort by average rating</option>
                <option value="sort-by-latest">sort by latest</option>
                <option value="price-high-low">sort by price : high to low</option>
                <option value="price-low-high">sort by price : low to high</option>

            </select>
        </div>
    )
}
// const highToLowPriceProducts = (products) => {

// }

export { Rating }