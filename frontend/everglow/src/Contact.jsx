// assets
import skinsecreimage from "./assets/about-image-7-1536x639.jpg"
import contact1 from "./assets/contact-1.jpg"
import contact2 from "./assets/contact-2.jpg"

// components
import Button  from "./components/Button"
import { SkinSecrets } from "./components/ProductReadMore"

export default function Contact() {
    return (
        <div>
            <div className="relative w-full z-0 px-4 md:px-6 flex items-center spinz-color" style={{ maxHeight: "884px", height: "528px" }}>
                <div className="hero-text  z-50 bottom-1/2 flex flex-col gap-4 lg:gap-10  px-4 font-bold ">
                    <h3>We care for customer success</h3>
                    <h1 className=''>Need a help or query? Send a mail to everglowtheme@mail.com.</h1>
                   <div className="w-1/3"> 
                   <Button  bgColor={"white"} style1={{ border: "1px solid black", height: "50px" }}> <a href="/shop">Discover Products</a></Button>
                   </div>
                </div>
            </div>
            <div className="px-4 md:px-12">
                   <div className="grid md:grid-cols-2 place-items-center gap-4 md:gap-0 px-4 md:px-0 my-8 md:my-12 ">
                     <img src={contact1} alt={"Contact us 1"} />
                <section className="flex flex-col gap-4 md:gap-6 px-4 md:px-8 ">
                    <h2>Location - New Delhi</h2>
                    <p>
                        1559 Golden Ridge Road,<br />
                        Albar,<br />
                        12207 – ND, <br />
                        India.
                    </p>
                    <p>Our store is open through out the day 9:00 AM – 9:00PM on whole week except sunday.</p>
                  <div className=" w-1/2 md:w-1/3 ">   <Button bgColor ={"black"} style1={{ border: "1px solid black", height: "50px" }}> See location in map</Button></div>
                </section>
                   </div>
                   <hr  className="my-4 bg-black h-0.5"/>
                    <div className="grid md:grid-cols-2  place-items-center gap-4 md:gap-0 px-4 md:px-0 my-8 md:my-12">
                <section className="flex flex-col gap-4 md:gap-6 px-4 md:px-8 py-4 md:py-12 ">
                    <h2>Location - New Delhi</h2>
                    <p>
                        1559 Golden Ridge Road,<br />
                        Albar,<br />
                        12207 – ND, <br />
                        India.
                    </p>
                    <p>Our store is open through out the day 9:00 AM – 9:00PM on whole week except sunday.</p>
                  <div className=" w-1/2 md:w-1/3 ">   <Button bgColor ={"black"} style1={{ border: "1px solid black", height: "50px" }} > See location in map</Button></div>
                </section>
                     <img src={contact2} alt={"Contact us 2"} />
                   </div>
            </div>
            <SkinSecrets skinsecret={skinsecreimage} />
        </div>

    )
}