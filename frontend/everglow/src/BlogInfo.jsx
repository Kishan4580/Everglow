import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { SmallLoading } from "./Loading"
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const BlogInfo = () => {
    // The issue is in the queryFn parameter - it receives a condata object, not the blogId directly
// The blogId parameter in queryFn shadows the outer blogId variable
const blogId = useParams().blogSlug;    
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['oneblog', blogId], 
        queryFn: async () => { // Remove blogId parameter since it's not used correctly     
         return await fetch(`${serverUrl}/blog/${blogId}`).then(async res => { return await res.json() }, rej => { throw new Error("Something went wronng .", rej.message) }
            )
        }
    })
    if (isPending) {
        return <SmallLoading />
    }
    if (isError) {
        return <div>Error to {error.message}</div>
    }
    console.log(data);
    return (
        <div>
            <div className="spinz-color py-76 px-5 lg:px-10">
                <h1>{data.title}</h1>
                <p>By
                    <img src={data.createdBy?.image} alt="Author Image" />
                    <time dateTime="">{data.createdAt}</time>
                </p>
            </div>
            <div className="px-8 md:px-18">
                <div>
                <p></p>
                <img src={data.coverImage} alt="" />
            </div>
            <div>
                {groupConsecutiveImages(data.content).map((item, i) => 
                    item.type === 'imageGroup' ? 
                        <ImageGrid key={i} images={item.images} /> : 
                        <Paragraph key={i} content={item} />
                )}
            </div>
            </div>
        </div>
    )
}

// Group consecutive images together
const groupConsecutiveImages = (content) => {
    const result = [];
    let currentImageGroup = [];
    
    content.forEach((item) => {
        if (item.type === 'image') {
            currentImageGroup.push(item);
        } else {
            if (currentImageGroup.length > 0) {
                if (currentImageGroup.length === 1) {
                    result.push(currentImageGroup[0]);
                } else {
                    result.push({ type: 'imageGroup', images: currentImageGroup });
                }
                currentImageGroup = [];
            }
            result.push(item);
        }
    });
    
    // Handle remaining images
    if (currentImageGroup.length > 0) {
        if (currentImageGroup.length === 1) {
            result.push(currentImageGroup[0]);
        } else {
            result.push({ type: 'imageGroup', images: currentImageGroup });
        }
    }
    
    return result;
};

const ImageGrid = ({ images }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
            {images.map((img, i) => (
                <img key={i} src={img.data.src} alt={img.data.alt} className="w-full h-auto" />
            ))}
        </div>
    );
};

const Paragraph = ({ content }) => {
    // Switch statement needs to be inside a JavaScript expression block
    // and should be properly returned
    console.log(content);
    return (
        <>
            {(() => {
                switch (content.type) {
                    case "list":
                        if (content.data.style === 'unordered') { // Use === instead of ==
                            return (
                                <ul className="text-xl list-disc list-inside ">
                                    {content.data.items.map((list, i) => (
                                        <li key={i}>{list}</li>
                                    ))}
                                </ul>
                            );
                        }
                        return (
                            <ol className="text-xl">
                                {content.data.items?.map((list, i) => (
                                    <li key={i}>{list}</li>
                                ))}
                            </ol>
                        );
                    case "quote":
                        return <q>{content.data}</q>;
                    case "code": 
                        return <code>{content.data}</code>;
                    case "paragraph":
                        return <p className="text-xl">{content.data}</p>;
                    case "heading":
                        switch (content.data.level) {
                            case "h1":
                                return <h1 className="py-6">{content.data.text}</h1>;
                            case "h2":
                                return <h2 className="py-4">{content.data.text}</h2>;
                            case "h3":
                                return <h3 className="py-4 md:py-8 text-2xl! font-bold! ">{content.data.text}</h3>;
                            case "h4":
                                return <h4 className="py-4 md:py-8 text-2xl! font-bold! ">{content.data.text}</h4>;
                            case "h5":
                                return <h5 className="py-3 text-xl  ">{content.data.text}</h5>;
                            case "h6":
                                return <h6>{content.data.text}</h6>;
                            default:
                                return <p className="text-xl">{content.data}</p>;
                        }
                    case "image":
                        return <img src={content.data.src} alt={content.data.alt} className="my-4" />;
                    default:
                        return null;
                }
            })()}
        </>
    );
}
