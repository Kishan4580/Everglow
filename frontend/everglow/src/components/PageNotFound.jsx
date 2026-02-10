import searchicon from "../assets/search.png"
export default function PageNotFound ()
{
    return(
        <div className="flex place-items-center">
            
            <div className="max-w-[560px]" >
                <h1>Page not found</h1>
            <p>t looks like nothing was found at this location. Try a search or check the links below.</p>
            <div className="spinz-color">
                <input type="button" name="" id=""  className="p-3  border-none outline-none"/>
                <img src={searchicon} alt="" />
            </div>
            <p>
               Go back to <a href="" className="hover:decoration-1 underline-offset-2">Everglow</a>
            </p>
            </div>
        </div>
    )
}