import heroImage from "./assets/collections/collection-image-3-1536x530.jpg"
import coll1 from "./assets/collections/collection-image-4.jpg"
import coll2 from "./assets/collections/collection-image-5.jpg"
import coll3 from "./assets/collections/collection-image-7.jpg"
import coll4 from "./assets/collections/collection-image-1.jpg"
import coll5 from "./assets/coll/menu-image-3.png"
import coll6 from "./assets/coll/menu-image-5.png"
import arrowRight from "./assets/arrow-right.png"

import { SkinSecrets } from "./components/ProductReadMore"
import { HomeBanner } from "./HomeBanner"
import Button from "./components/Button"

export const Collections = () => {
    return (
        <div>
            <div className="text-black">
                <HomeBanner imgsrc={heroImage} h3={"Radiant Beauty Unveiled"} h1={"Explore Our Exquisite Skincare Collection"}></HomeBanner>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 p-4 md:p-16 items-center">
                {/* <div className="flex gap-4 md:gap-8 lg:gap-16"> */}
                <img src={coll1} alt="" className="" />
                <img src={coll2} alt="" className="" />
                {/* </div> */}
                <div className="flex flex-col gap-4 md:gap-8">
                    <h2>Nourish Your Skin Naturally</h2>
                    <p>Discover the power of our Radiant Beauty line, meticulously formulated to nourish, transform, and revitalize your skin.</p>
                    <div className="md:w-1/2 ">
                        <Button bgColor={"black     "}>Explore this collection</Button>
                    </div>
                </div>
            </div>
            <div className=" grid md:grid-cols-2 gap-8 md:gap-16 p-4 md:p-16 items-center">
                <img src={coll3} alt="" />
                <div className="flex flex-col gap-4 md:gap-8">
                    <h2>Radiant Beauty Unveiled</h2>
                    <p>From luxurious cleansers to targeted serums, our collection offers a comprehensive range of products designed to meet your unique skincare needs.</p>
                    <div className="w-1/3">
                        <Button bgColor={"black "}>Explore this collection</Button>
                    </div>
                </div>
            </div>
            <div className=" grid md:grid-cols-2 gap-8 md:gap-16 p-4 md:p-16 items-center">
                <img src={coll4} alt="" />
                <div className="flex flex-col gap-4 md:gap-8">
                    <h2>Timeless Beauty Collection</h2>
                    <p>Each product in our Timeless Beauty Collection is meticulously crafted to deliver visible results.</p>
                    <div className="w-1/3">
                        <Button bgColor={"black "}>Explore this collection</Button>
                    </div>
                </div>
            </div>
            <div className="spinz-color grid md:grid-cols-2 gap-8 md:gap-10 p-4 items-center">
            <ExploreCollection category={"Moisturizers"} description={"Hydrate and rejuvenate your skin with our nourishing moisturizers."} title={"Moisturizers"} imgsrc={coll5} />
            <ExploreCollection category={"Haircare"} description={"Revitalize your hair with our nourishing haircare products."} title={"Haircare"} imgsrc={coll6} />
        </div>
        <SkinSecrets ></SkinSecrets>
        </div>
    )
}

const ExploreCollection = ({category, description, title, imgsrc})=>{
    return(
        <div className="flex flex-col gap-2 ">
            <img src={imgsrc} alt="" className="w-full"/>
            <p>{description}</p>
            <h3>{title}</h3>
                         <div className="font-bold flex place-items-center gap-2 cursor-pointer">Explore <img src={arrowRight} alt="" className="h-4 w-4" />Explore {category}</div>
        </div>
    )
}