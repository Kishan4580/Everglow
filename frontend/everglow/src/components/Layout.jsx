import Navbar from "./Navbar.jsx"
import Footer from './Footer.jsx'


export default function Layout({ children }) {
    const getComnam = children.type?.name || children[0].type?.name;
    // console.log(getComnam, children);

    let navStyle;
    switch (getComnam) {
        case "Shop":
            navStyle = { color: "black", logoBlack: true }
            break;
        case "HeroSection":
            navStyle = { color: "white" }
            break;
        case "CardSystem":
            navStyle = { color: "black", logoBlack: true }
            break;
        case "ProductReadMore":
            navStyle = { color: "black", logoBlack: true }
            break;
        default:
            break;
    }
    // console.log();
    return (
        <div>
            <header className="me-2 md:me-4">
                <Navbar style={navStyle ? navStyle : null} currentPage={getComnam} />
            </header>
            <main >{children}</main>
            <footer>
                <Footer />
            </footer>

        </div>
    )
}