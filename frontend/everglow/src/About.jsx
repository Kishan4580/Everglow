// assets 
import skincaredelight from "./assets/about-image-5.jpg"
import acidserum from "./assets/about-image-6.jpg"
import gitlwithproteinshek from "./assets/about-image-8.jpg"
import foundeimage from "./assets/founder-name.png"
import rightarrow from "./assets/arrow-right.png"
import heroImage from "./assets/about-image-9-768x265.jpg"
import skinsecreimage from "./assets/about-image-7-1536x639.jpg"
import natural from "./assets/natural-3.png"
import crueltyFree from "./assets/cruelty-free-3.png"
import ecoFriendly from "./assets/eco-friendly-3.png"
import noAlcohol from "./assets/no-alcohol-3.png"
// components
import { SkinSecrets } from "./components/ProductReadMore"
import Button from "./components/Button"

export default function About() {
    return (
        <div>
            <div className="relative z-0 px-4 md:px-6 left-0" style={{ background: `url(${heroImage}) center/cover`, maxHeight: "884px", height: "528px" }}>
                <div className="hero-text absolute z-50 h-24 w-full bottom-1/2 left-0 flex gap-4 flex-col px-4 font-bold text-white">
                    <h3>Elevate your beauty ritual</h3>
                    <h1 className=''>Embrace Your Flawless Transformation</h1>
                    <div className="w-1/3 md:w-1/5">
                        <Button bgColor={"white"} style1={{ border: "1px solid white", height: "50px" }}>Discover Products</Button>
                    </div>
                </div>
            </div>
            <div className="text-center flex flex-col gap-4 md:gap-8 py-8 md:py-16">
                <h2>The pursuit of the beauty is ancient</h2>
                <p>The act of applying makeup to enhance and beautify our features is one of life’s enduring rituals.</p>
                <p>Until recently, to find something that could nurture and nourish the skin, rather than toxify it, was close to impossible.</p>
            </div>
            <div className="grid md:grid-cols-2 place-items-center gap-4 md:gap-12 my-6 ">
                <img src={gitlwithproteinshek} alt="" style={{}} />
                <div className="flex flex-col gap-4">
                    <h2>Our Philosophy</h2>
                    <p>From a very early age, when people asked me what I wanted to be when I grew up, I always said: “I want to create my own beauty brand.”Coming from an entrepreneurial family and practically growing up in the color cosmetics industry, my passion only grew. Once I started my master degree, I also started my journey, which is now known as the brand Everglow</p>
                    <img src={foundeimage} alt="Anna Jain Image" style={{ height: "52px", width: "72px" }} />
                    <strong>CEO & Founder of Everglow</strong>
                </div>
            </div>
            <SkinSecrets skinsecret={skinsecreimage} />
            <div className=" ">
                <div className="py-6 md:py-12 px-2 md:px-4 text-center">
                    <h2 className="py-2 md:py-4">Our skincare promise</h2>

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center'>
                        <div>
                            <img src={natural} alt="100% Natural Products" className='py-2' />
                            <strong>100% Natural</strong>
                        </div>
                        <div>
                            <img src={noAlcohol} alt="No-alcohol Products" className='py-2' />
                            <strong>No alcohol</strong>
                        </div>
                        <div>
                            <img src={ecoFriendly} alt="Cruelty Free Products" className='py-2' />
                            <strong>Exo-friendly</strong>
                        </div>
                        <div>
                            <img src={crueltyFree} alt="Eco-friendly Products" className='py-2' />

                            <strong>Cruelty-free</strong>
                        </div>
                    </div>
                </div>
                <div className=" grid grid-cols-2 ">
                    <img src={acidserum} alt="" />
                    <div className="spinz-color py-4 md:py-12 px-4 md:px-6  flex flex-col gap-4 md:gap-8">
                        <h4>Our collections</h4>
                        <h2>Smoothing Hyaluronic Acid Serum</h2>
                        <p className="text-xl!">
                            Facial skin is left looking youthfully firm, radiant and noticeably smoother. This formulation is ideal for use as an intensive treatment to counteract the effects of environmental exposure including sunburn, windburn and overexposure to heating or air-conditioning.</p>
                        <div className="lg:w-1/3 w-1/2">
                            <Button bgColor={"black"} style1={{ border: "1px solid black" }}>Explore more <img src={rightarrow} alt="right arrow" style={{ height: "1.1rem", width: "1.1rem" }} /></Button>
                        </div>
                    </div>
                </div>
                <div className="text-white grid grid-cols-2 ">
                    <img src={skincaredelight} alt="" />
                    <div className="light-purple py-4 md:py-12  px-4 md:px-6 flex flex-col gap-6 md:gap-12">
                        <h4>Our collections</h4>
                        <h2>Smoothing Hyaluronic Acid Serum</h2>
                        <p className="text-xl!">
                            Facial skin is left looking youthfully firm, radiant and noticeably smoother. This formulation is ideal for use as an intensive treatment to counteract the effects of environmental exposure including sunburn, windburn and overexposure to heating or air-conditioning.</p>
                        <div className="lg:w-1/3 w-1/2">  <Button bgColor={"white"} style1={{ border: "1px solid white" }}>Contact us <img src={rightarrow} alt="right arrow" style={{ height: "1.1rem", width: "1.1rem" }} /></Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}