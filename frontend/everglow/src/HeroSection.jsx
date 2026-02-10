import { Suspense, useState } from 'react';
import { use } from 'react';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { useQuery } from "@tanstack/react-query"

import Error from './Error.jsx';
import Button from './components/Button';
import { ProductCategoryCard } from './components/ProductCategoryCard';
import { BestSellerCard } from './components/BestSellerCard';
import ShimmerGrid from './ShimmerGrid';
import { JournalCard } from './JournalCard';
import { HomeBanner } from "./HomeBanner.jsx"
const serverUrl = import.meta.env.VITE_SERVER_URL

// import bsImageSrc from "./assets/product-thumbnail-2-600x600.png"
// import bsImageSrc1 from "./assets/product-thumbnail-3-600x600.png"
// import bsImageSrc2 from "./assets/product-thumbnail-21-600x600.png"
// import bsImageSrc3 from "./assets/product-thumbnail-22-600x600.png"

import heroImage from './assets/home-banner-4-2048x878.jpg'
import image1 from './assets/cleansers.png';
import image2 from './assets/serum.png';
import image3 from './assets/masks.png';
import image4 from './assets/moisturizers.png';
import image5 from './assets/sunscreen.png';


import brImage1 from "./assets/product-category-1.jpg"
import brImage2 from "./assets/product-category-2.jpg"
import brImage3 from "./assets/product-category-3.jpg"
import brImage4 from "./assets/product-category-4.jpg"

import skincare from "./assets/home-image-3.jpg"
import radiance from "./assets/home-image-4.jpg"
import reasonToChooseGirlImg from "./assets/home-image-5.jpg"

import transformationOSkincare from "./assets/home-banner-3-2048x818.jpg"
import circle from "./assets/check-circled-white.png"

import serumWithGirl from "./assets/home-image-2.jpg"

import noAlcohol from "./assets/no-alcohol.png"
import crueltyFree from "./assets/cruelty-free.png"
import natural from "./assets/natural.png"
import ecoFriendly from "./assets/eco-friendly.png"


// import jImage1 from "./assets/blog-image-3-1536x1536.jpg"
// import jImage2 from "./assets/blog-image-5-1536x1536.jpg"
// import jImage3 from "./assets/blog-image-6-1536x1536.jpg"
// import jImage4 from "./assets/blog-image-8-1536x1536.jpg"

const productFeatures = [
    { title: "Clinically tested", desc: "Embrace the journey to radiant skin with our trusted skincare." },
    { title: "Easy to Apply", desc: "skincare is designed to provide maximum benefits with minimal effort." },
    { title: "100% Orgainc", desc: "Nourish Your Skin Naturally with 100% Organic Skincare Solutions.7" },
    { title: "100% Vegan", desc: "Cruelty-Free Beauty: to discover the Power of 100% Vegan Skincare" }
]
const browseCategories = [{ src: brImage1, title: "Cleansers" }, { src: brImage2, title: "Serums" }, { src: brImage3, title: "Masks" }, { src: brImage4, title: "Mostuirizers" }]
const categories = [{ src: image1, title: "Cleansers" }, { src: image2, title: "Serum" }, { src: image3, title: "Masks" }, { src: image4, title: "Mostuirizers" }, { src: image5, title: "Sunscreen" }]
export default function HeroSection() {
    // const [staticBestSellerProducts, setBestsellerProd] = useState([
    // { productName: "Nourishing – Conditioner 0.6-500mL", price: 499, imgSrc: bsImageSrc },
    // { productName: "Gentle Gel Facial Cleanser (200mL)", price: 450, imgSrc: bsImageSrc1 },
    // { productName: "Body Cream (120mL)", price: 279, imgSrc: bsImageSrc2 },
    // { productName: "Tri-Peptide Age Repair Lip Treatment", price: 299, imgSrc: bsImageSrc3 }
    // ]);
    // const journals = [
    // { title: "Discover the Secrets to Radiant Skin", imgSrc: jImage1, date: "12-07-2025", slug: "discover-secrets-radiant-skin" },
    // { title: "Unleash Your Ultimate Journey with our Skin Care", imgSrc: jImage2, date: "2-12-2025", slug: "unleash-ultimate-journey-skin-care" },
    // { title: "A Comprehesnsice Tools for Effective Skin Treatments", imgSrc: jImage3, date: "2-12-2024", slug: "comprehensive-tools-skin-treatments" },
    // { title: "Unlock the Secrets of Healthy Skin", imgSrc: jImage4, slug: "unlock-secrets-healthy-skin" }]
    // { title: "Unleash Your Ultimate Journey with our Skin Care", imgSrc: jImage2, date: "2-12-2025", slug: "unleash-ultimate-journey-skin-care" },
    const [status, setStatus] = useState(false)
        const [reload, setReload] = useState(false)
    
    const { data, isError } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
                const res = await fetch(`${serverUrl}/blogs?count=4`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }
                const json = await res.json();
                const blogsWithSlug = json.map(blog => ({
                    title: blog.title,
                    imgSrc: blog.coverImage,
                    date: blog.date,
                    slug: blog.slug
                }));
                // console.log(blogsWithSlug);
                return blogsWithSlug;
            
        },
        // staleTime: Infinity,
        // refetchOnWindowFocus: false,
        // retry: 2,
    });
    // console.log(data);
    const fetchBsProducts = async () => {
        const res = await fetch(`${serverUrl}/bestseller`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, // optional if needed
            },
        })
        return await res.json()
    }
if (isError) {
    return <div className="h-[450px] flex justify-center items-center">
                <Error setReload={setReload} err={{title : "Error", message : "Error to fetch data."}} />
            </div>
}
    // console.log(data);
    
    return (
        <div className="hero-section mona-sans ">
            {/* <div className="relative z-0 px-4 md:px-6" style={{ background: `url(${heroImage}) center/cover`, maxHeight: "884px", height: "528px" }}>
                <div className="hero-text absolute z-50 h-24 w-full left-0 p-4 bottom-1/2 flex gap-4 flex-col font-bold text-white">
                    <h3></h3>
                    <h1 className=''></h1>
                    <div className="w-32"> <Button bgColor={"white"} style1={{ border: "1px solid white", height: "50px" }}>Discover Products</Button></div>
                </div>
            </div> */}
            <HomeBanner textcolor="text-white" imgsrc={heroImage} h3={"Elevate your beauty ritual"} h1={"Embrace Your Flawless Transformation"}></HomeBanner>
            <div className=''>
                <div className='text-black py-10 md:py-16 spinz-color px-4 md:px-6' >
                    <h3 className='font-semibold'>Complete are for skin</h3>
                    <h2 className='font-bold text-2xl py-3'>Explore our categories</h2>
                    <div className='grid grid-cols-2 md:grid-cols-5 gap-2 py-6 place-items-center'>
                        {categories.map((category, index) => <ProductCategoryCard key={index} imgSrc={category.src} maxHeight={"220px"} maxWidth={"220px"} category={category} />)}
                    </div>
                </div>
                { status && <div className='py-10 md:py-16  px-4 md:px-6 bg-white lg:text-2xl'>
                    <h2 className='py-4 md:py-6'> Ours Bestseller</h2>
                    <p className='py-4 md:pe-6'>Discover the power of our Radiant Beauty line, meticulously formulated to nourish, transform, and revitalize your skin.</p>
                    <Suspense fallback={<ShimmerGrid />}>
                        <Bestseller queryPromise={fetchBsProducts()} setStatus={setStatus}/>
                    </Suspense>
                </div>
}
                <div className='light-purple py-16 md:py-24 text-white  px-4 md:px-6'>
                    <div className='grid md:grid-cols-2 gap-4 justify-center md:flex-row'>
                        <img src={reasonToChooseGirlImg} alt="" />
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-4'>
                                <h3>Reason to Choose</h3>
                                <h1>Organic skincare products for daily routine.</h1>
                                <p className='text-white!'>
                                    High-quality skincare products contain ingredients like vitamins, antioxidants, and moisturizer that replenish the skin’s natural oils and promote hydration.
                                </p>
                            </div>
                            <hr />
                            <ul id='reasonToChoose'>
                                {productFeatures.map((feature, index) => (<li key={index} className=' gap-2'>
                                    <div className="flex gap-4">
                                        <img src={circle} alt="" height={"45px"} width={"45px"} style={{ background: `URL(circle) ` }} className='h-full' />
                                        <div className='flex md:flex-col'>
                                            <h3 className='font-bold'>{feature.title}</h3>
                                            <p className='text-white! h-full w-full py-8'>{feature.desc}</p>
                                        </div>
                                    </div>
                                </li>))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 py-10 md:py-16  px-4 md:px-6 bg-white text-black '>
                <div className='flex flex-col gap-4 font-bold'>
                    <img src={skincare} alt="" />
                    <h4 className='font-semibold'>Unlocking Skincare's Hidden Secrets</h4>
                    <div className="w-1/3"><Button bgColor={"Black"} style1={{ border: "1px solid black", height: "50px" }}><Link to={"/shop"} >Shop all creams </Link ></Button></div>

                </div>
                <div className='flex flex-col gap-4 font-bold'>
                    <img src={radiance} alt="" />
                    <h4 className='font-semibold'>Unlocking Skincare's Hidden Secrets</h4>
                    <div className="w-1/3"><Button bgColor={"Black"} style1={{ border: "1px solid black", height: "50px" }}><Link to={"/shop"} >Shop all creams </Link ></Button>
                    </div></div>
            </div>

            <div className='py-4 md:py-10 px-4 md:px-6 bg-white'>
                <hr className='bg-black h-0.5 ' />
            </div>
            <div className='px-4 md:px-6 py-8 md:py-10'>
                <h3>For all skin types</h3>
                <h2>Browse By Categories</h2>
                <div className='grid md:grid-cols-4 gap-2 py-6 place-items-center'>
                    {browseCategories.map((category, index) => <ProductCategoryCard key={index} maxHeight={"600px"} maxWidth={"600px"} imgSrc={category.src} category={category} />)}
                </div>
            </div>
            <div className=''>
                <div className=' relative  '>
                    <img src={transformationOSkincare} alt="" style={{ minHeight: "360px", objectFit: "cover" }} />
                    <div className='py-10 lg:py-16 px-4 md:px-6 flex flex-col gap-4 absolute top-0 text-white '>
                        <h2>The Transformative Power of Skincare</h2>
                        <ul className='text-lg font-light md:text-2xl flex flex-col gap-3 list-disc list-inside '>
                            <li>Improved Skin Health</li>
                            <li>Enhanced Radiance</li>
                            <li>Long-lasting Beauty</li>
                            <li>Protection from Environmental Damage</li>
                            <li>Relaxation and Self-Care</li>
                        </ul>
                        <div className="font-bold w-32"><Button bgColor={"white"} style1={{ border: "1px solid white", height: "50px" }}>Explore More</Button></div>

                    </div>
                </div>
            </div>
            <div className='py-10 lg:py-16 px-4 md:px-6'>
                <h2 className='text-center'>Mastering the Art of Serum Techniques for Optimal Skincare</h2>
                <div className='flex flex-col md:flex-row place-items-center gap-4 md:gap-6 lg:gap-12 py-6 lg:py-12'>
                    <img src={serumWithGirl} alt="Girl With Serums Cream" className='md:w-1/2' />
                    <div className='flex flex-col gap-4'>

                        <div>
                            <h3 className='step'>01</h3>
                            <p className='step-desc'>From proper cleansing and prepping of the skin to precise application methods such as gentle tapping, massaging, or layering, this guide equips to elevate your skincare routine.From proper cleansing and prepping of the skin to precise application methods such as gentle tapping, massaging, or layering, this guide equips to elevate your skincare routine.</p>
                            <hr />
                        </div>
                        <div>
                            <h3 className='step'>02</h3>
                            <p className='step-desc'>You can ensure that your serums penetrate deeply into the skin, and providing the desired transformative effects.</p>
                            <hr />
                        </div>
                        <div>
                            <h3 className='step'>03</h3>
                            <p className='step-desc'>Done. Enhancing skincare results.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='  py-10 lg:py-16 mx-4 md:mx-8   spinz-color'>
                <div className='text-center py-4 md:py-8'>
                    <h4 className='text-xl'>Our team care about you.</h4>
                    <h2>We always focus on quality</h2>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center'>
                    <div>
                        <img src={natural} alt="100% Natural Products" className='py-2' />
                        <strong>100% Natural</strong>
                    </div>
                    <div>
                        <img src={noAlcohol} alt="No-alcohol Products" className='py-2' />
                        <strong>No alcohol</strong>
                    </div>
                    <div>
                        <img src={ecoFriendly} alt="Cruelty Free Products" className='py-2' />
                        <strong>Exo-friendly</strong>
                    </div>
                    <div>
                        <img src={crueltyFree} alt="Eco-friendly Products" className='py-2' />

                        <strong>Cruelty-free</strong>
                    </div>
                </div>
            </div>
            <div className='grid  md:grid-cols-4 gap-8 py-10 md:py-16  px-4 md:px-6 '>
                {isError && <div className='text-red-500 py-2'>Error to fetch blogs </div>}
                {data?.map((j, i) => (
                    <JournalCard date={j.date} key={i} imgSrc={j.imgSrc} title={j.title} />
                ))}
            </div>
        </div>
    )
}


const Bestseller = ({ queryPromise, setStatus }) => {
    const bsProducts = use(queryPromise)
    const data = bsProducts;
    if(data.status == 404 || data.status == 501 || data.status == 500) {
        setStatus(false)
        return null;
    }
    console.log(data);
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center'>
            {data?.map((product, index) => <BestSellerCard key={index} product={product} />)}
        </div>
    )
}