export default function Error ({err}) {
    // console.log(setReload );
    // console.log(err.title, err.message);
    return (
        <div className=" w-1/2 flex flex-col gap-2 max-w-[340px] p-4 rounded-md border-2 border-[#cc0c39] border-s-4 ">
            <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="black" className="bg-red-700 rounded-full"> 
            <path d="M12 2v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="18" r="2" fill="#fff" />
          </svg>
                <h3>{err.title}</h3>
            </div>
            <div>
                {err.message}
            </div>
            <button className="bg-red-500 w-1/3 p-2 text-white  cursor-pointer" onClick={()=> window.location.reload()}>Reload</button>
        </div>
    )
}