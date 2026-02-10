import { Link } from "react-router-dom"
export  const ProductCategoryCard = ({imgSrc, category, maxHeight, maxWidth})=>{   
    return (
        <div className="w-full ">
            <div className="   p-4 md:p-8 h-full w-full ">
            <img src={imgSrc} alt={category.title} className=""  style={{maxHeight : maxHeight, maxWidth : maxWidth, height : "100%", width : "100%", minHeight : "100%"}}/>
            </div>
            <div className="underline decoration-1 decoration-black underline-offset-6 text-center text-lg cursor-pointer hover:no-underline"><Link to={`product-category/${category.title}`}><strong>{category.title}</strong></Link></div>
        </div>
    )
}