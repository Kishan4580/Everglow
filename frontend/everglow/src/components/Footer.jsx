import natural from "../assets/natural.png"
import noAlcohol from "../assets/no-alcohol.png"
import crueltyFree from "../assets/cruelty-free.png"
import ecoFriendly from "../assets/eco-friendly.png"
import logo from "/logo.png";
import leavesimg from "../assets/home-banner-2-1536x848.jpeg"

import { Link } from "react-router-dom"
export default function Footer() {
    return (
        <div className="spinz-color">
            <div className="grid md:grid-cols-2 gap-5 lg-gap-8 min-h-92  ">
                <div className="gap-4 flex flex-col py-6 md:py-12 px-4">
                    <div className="flex flex-col gap-4"><img src={logo} alt="Everglow Logo" height={"80px"} className="max-h-24 max-w-54" />
                        <p>We aim to empower and inspire individuals to take charge of their skincare routines and embrace self-care.</p></div>
                    <div className='line grid grid-cols-2 lg:grid-cols-4 gap-6'>
                        <div >
                            <img src={natural} alt="100% Natural Products" />
                            <strong>100% Natural</strong>
                        </div>
                        <div>
                            <img src={noAlcohol} alt="No-alcohol Products" />
                            <strong>No alcohol</strong>
                        </div>
                        <div>
                            <img src={ecoFriendly} alt="Cruelty Free Products" />
                            <strong>Exo-friendly</strong>
                        </div>
                        <div>
                            <img src={crueltyFree} alt="Eco-friendly Products" />

                            <strong>Cruelty-free</strong>
                        </div>
                    </div>
                </div>
                <div style={{ background: `url(${leavesimg})` }} className="py-6 md:py-12 text-white px-4">
                    <div>
                        <div className="grid md:grid-cols-3 gap-3 md:text-xl  ">
                            <div>
                                <h4 className="font-bold py-3">Quick Links</h4>
                                <div className="flex flex-col gap-3">{quickLinks.map((link, index) => (<Link to={{ pathname: `/${link.link}` }} key={index}>{link.title}</Link>))}</div>
                            </div>
                            <div><h4 className="font-bold py-3">Shopping</h4>
                                <div className="flex flex-col gap-3">{shopping.map((link, index) => (<Link to={link.link} key={index}>{link.title}</Link>))}</div>
                            </div>
                            <div>
                                <h4 className="font-bold py-3">Follow us</h4>
                                <div className="flex flex-col gap-3">{socialLinks.map((link, index) => (<Link to={{ pathname: `/some/path/${link}` }} key={index}>{link.title}</Link>))}</div>
                            </div>
                        </div>
                    </div>

                    {/* <hr className=" my-4 border-1 w-full" /> */}

                </div>
            </div>
            <hr />
            <div className="py-4 text-center">
                &copy; Everglow. 2025 All rights reserved.
            </div>
        </div>
    )
}

const quickLinks = [{ title: "Terms & conditions", link: "/terms-conditions" }, { title: "Return & refunds", link: "/refund-policy" }, { title: "Privacy Policy", link: "/privacy-policy" }, { title: "Contact us", link: "/contact-us" }, { title: "Promotions", link: "/promotions" }]
const socialLinks = [{ title: "Instagram", link: "/instagram" }, { title: "Facebook", link: "/facebook" }, { title: "Twitter", link: "/twitter" }, { title: "Youtube", link: "/youtube" }]
const shopping = [{ title: "Shop", link: "/shop" }, { title: "Blog", link: "/blog" }, { title: "About us", link: "/about-us" }, { title: "Support", link: "/support" }]