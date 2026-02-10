import { useQuery } from "@tanstack/react-query";
import heroImage from "./assets/blog/blog-image-7-2048x707.jpg"
import { SmallLoading } from "./Loading";
import { Link } from "react-router-dom";
const serverUrl = import.meta.env.VITE_SERVER_URL;
export default function Blog() {
    const {
  isPending: isBlogsPending,
  isError: isBlogsError,
  data: blogsData,
  error : blogsError
} = useQuery({ queryKey: ['blogs'], queryFn: fetchblogs });

const {
  isPending: isCountsPending,
  isError: isCountsError,
  data: categoryCounts
} = useQuery({ queryKey: ['blogscounts'], queryFn: fetchcategorywiseblogcounts });
// const {
//     data, isPending, isError, error
// } = useQuery({queryKey : ['blogs'], queryFn : async () => {
//     const resp = await fetch(`${serverUrl}/blogs`, {
//         method : "GET",
//         headers : {
//             "accept" : 'application/json'
//         }
        
//     })
//     if (!resp.ok) {
//             throw new Error("Something went wrong.");
//         }
//         return await resp.json()
// }})
if (isBlogsPending) {
    return <SmallLoading />
}
if (isBlogsError) {
    return <div>Error to {blogsError.message}</div>
}
console.log(blogsData);

    return (
        <div>
            <div className="relative z-0 px-4 md:px-6" style={{ background: `url(${heroImage}) center/cover`, maxHeight: "884px", height: "528px" }}>
                <div className="hero-text absolute z-50 h-24 w-full left-0 p-4 bottom-1/2 flex gap-4 flex-col font-bold text-white">
                    <h3>Our Journal</h3>
                    <h1 className=''>Explore our Journal & Insights.</h1>
                </div>
            </div>
            {/* <div className="flex gap-4 flex-wrap">{categoryCounts.map((category, i)=> <Link to={`/blog-category/${category}`}>{category}</Link>)}</div> */}
            <hr />
           <div className="flex flex-col">{blogsData.map((blog, i)=> <OneBlog data={blog} />)}</div>
        </div>
    )

}

const fetchblogs = async () => {
    const apipath = `${serverUrl}/blogs`
    // Need to return the fetched data from the function
const fetchblogs = await fetch(apipath).then(async (res) => {
    const data = await res.json();
    return data; // Return the parsed data
}, (err) => {
    console.log("Error for fetching blogs : ", err); 
    throw new Error("Failed to fetch blogs")
})
return fetchblogs; // Return the result to the queryFn    
}

const OneBlog = ({ data }) => {         
    const title = data.title;
    const imgsrc = data.coverImage;
    const date = data.createdAt;
    const proId = data.slug;
    return (
        <div className="grid md:grid-cols-2 justify-items-center items-center gap-6 lg:gap-8 border-b p-4 text-xl">
          <div className=""> <Link to={`/blog/${proId}`}> <img src={imgsrc} alt="Blog image" /></Link></div>
           <div className=""> <time datetime={date}>{date}</time>
           <Link to={`/blog/${proId}`}> <h2 className="border-b-2 pb-4 py-1">{title}</h2></Link>
          <Link to={`/blog/${proId}`}>  <div>Continue reading</div></Link></div>
        </div>
    )
}

const fetchcategorywiseblogcounts = async () => {
    const apipath = `${serverUrl}/blogs-category`
    const counts = await fetch(apipath)
    counts.then((res) => res.json()).
        catch((er) => console.log("Error to fetch category wise blogs counts : ", er)
        )
}
// const more = async (params) => {
    
// }