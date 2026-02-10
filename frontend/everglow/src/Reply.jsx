export const Reply = ()=>{
    return (
        <div className="p-6 md:p-12">
            <div className="flex flex-col gap-3 my-4">
                <h2>Leave a Reply</h2>
            <p>Your email address will not be published.</p>
            <p>Required fields are marked *</p>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Comment *</label>
            <textarea name="comment" style={{minHeight : "160px"}} id=""className="h-full my-2 border p-3"></textarea>
            <label htmlFor="name">Name *</label>
            <input type="text" className="my-2 border p-3"/>
            <label htmlFor="email">Email *</label>
            <input type="text" className="my-2 border p-3"/>
            <div className="inline-flex gap-2 my-2">
                <input type="checkbox" />
            <label htmlFor="">
Save my name, email, and website in this browser for the next time I comment.</label>
            </div>
            <div className=" my-2"><button className="border py-3 px-8 hover:bg-black hover:text-white">Post Comment</button>
           </div> </div>

        </div>
    )
}