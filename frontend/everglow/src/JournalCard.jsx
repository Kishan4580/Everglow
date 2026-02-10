import arrowRight from "./assets/arrow-right.png"
import { Link } from "react-router-dom"
export const JournalCard = ({imgSrc, title, date, blogId })=>{
    return (
        <div className="flex flex-col">
           <Link to ={`/blog/${blogId}`}> <img src={imgSrc} alt="Product Article Image" className="my-2" /></Link>
            <time dateTime={date}>{date}</time>
             <h3 className="mt-3"><Link to ={`/blog/${blogId}`}>{title}</Link></h3>
             <hr className="my-2"/>
             <div className="font-bold flex place-items-center gap-2 cursor-pointer"><Link to ={`/blog/${blogId}`}>Continue reading</Link> <img src={arrowRight} alt="" className="h-4 w-4" /></div>
        </div>
    )
}