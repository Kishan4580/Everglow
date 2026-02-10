import Button from "./components/Button"
import { Link } from "react-router-dom"
export const HomeBanner = ({ h3, h1, imgsrc, textcolor }) => {
    return (
        <div className={`relative z-0 px-4 md:px-6 ${textcolor}`} style={{ background: `url(${imgsrc}) center/cover`, maxHeight: "884px", height: "528px" }}>
            <div className="hero-text absolute z-50 h-24 w-full left-0 p-4 bottom-1/2 flex gap-4 flex-col font-bold ">
                <h3>{h3}</h3>
                <h1 className=''>{h1}</h1>
                <div className="w-32"> <Button bgColor={"white"} style1={{ border: "2px solid white", height: "50px" }}> <Link to={"/shop"}>Discover Products</Link> </Button></div>
            </div>
        </div>
    )
}