import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import HeroSection from './HeroSection'
// import { Account } from './components/Account'
import Layout from "./components/Layout.jsx"
import About from "./About.jsx"
import Contact from "./contact.jsx"
import Shop from "./components/Shop.jsx"
import { AccountContext } from "./contextstore/account.js"
// import { Gentle } from "./components/Gentle.jsx"
import './App.css'
import Checkout from "./components/Checkout.jsx"
// import Loading from "./Loading.jsx"
import { Reply } from "./Reply.jsx"
import { Account } from "./components/Account.jsx"
import { CartProvider } from "./CartProvider.jsx"
import CardSystem from "./CartSystem.jsx"
// const TestContext = createContext({cr : new Map, setMap})
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import ResetPassword from "./ResetPassword.jsx"

import ErrorBoundary from "./ErrorBounday.jsx"
// import { Profile } from "./Profile.jsx"
import { ProductReadMore } from "./components/ProductReadMore.jsx"
import { BlogInfo } from "./BlogInfo.jsx"
import Blog from "./Blog.jsx"
import { Collections } from "./Collections.jsx"
import NetworkStatus from "./NetworkStatus.jsx"
import { AddressContextProvider } from "./AddressContextProvider.jsx"
function AppContent() {
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState("");
  const token = localStorage.getItem("log_token");
  const login = () => {
    if (!token) {

      localStorage.setItem("log_token", "123")
    }
    console.log("logged in");
  }
  const cleartoken = () => {

    localStorage.removeItem("log_token")
    console.log("logged out");
  }
  const SignInModal = () => {
    return (
      <div>
        <div className="border rounded-lg bg-gray-600 text-white gap-3 p-4 w-1/2 flex flex-col  h-[152px] ">
          <p> You are not login, please login in.
          </p><button className="bg-green-800 rounded-sm p-2 w-1/3" onClick={() => login()}>Log in</button>

        </div>
      </div>
    )
  }
  const SignOutModal = () => {
    return (
      <div>
        <div className="border rounded-lg bg-gray-600 text-white p-4 w-1/2 flex flex-col gap-3 h-[152px] m-2 ">
          <p>You can logout here, choose to another account.
          </p><button className="bg-red-800 rounded-sm p-2 w-1/3" onClick={() => cleartoken()}>Log out</button>

        </div>
      </div>
    )
  }
  // let issingin;
  // if (token) {
  //   issingin = < SignOutModal />
  // } else issingin = < SignInModal />
  const category = () => {
    const paths = location.pathname.split("product-category/")
    const categoryFromUrl = paths[1];
    switch (categoryFromUrl) {
      case "Moisturizers":
        return "Moisturizers"
      case "Haircare":
        return "Haircare"
      case "Serum":
        return "Serum"
      case "Sunscreen":
        return "Sunscreen"
      case "Bodycare":
        return "Bodycare"
      case "Masks":
        return "Masks"
      case "Cleansers":
        return "Cleansers"
      default:
        return "shop"
    }
  }

  useEffect(() => {
    const newCategory = category();
    setCurrentCategory(newCategory);
  }, [location.pathname]);

  const [isLogin, setLogin] = useState(() => {
    const saved = localStorage.getItem("is_login");
    return saved ? true : false;
  })
  const updateLogin = () => {
    setLogin(prev => !prev);
  };
  // 💾 Har update par localStorage me save karo
    useEffect(() => {
      localStorage.setItem("is_login", JSON.stringify(isLogin));
    }, [isLogin]);
  

  return (
    <ErrorBoundary>
      <AccountContext value={{isLogin, updateLogin}}>
        <CartProvider>
          <AddressContextProvider>
            <Routes>
              <Route path="/" element={<Layout><HeroSection /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/shop" element={<Layout><Shop category={"shop"} /></Layout>} />
              <Route path="/product-category/:categoryName" element={<Layout><Shop category={currentCategory} /></Layout>} />
              <Route path="/blog:blogId" element={<Layout><BlogInfo /></Layout>} />
              <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
              <Route path="/cart" element={<Layout><CardSystem isSliderCart={false} /></Layout>} />
              <Route path="/blogs" element={<Layout><Blog /></Layout>} />
              <Route path="/collections" element={<Layout><Collections /></Layout>} />
              <Route path="/blog/:blogSlug" element={<Layout><BlogInfo /></Layout>} />
              <Route path="/register" element={<Account />} />
              <Route path="/create-password" element={<ResetPassword />} />
              <Route path="/product/:id" element={<Layout><ProductReadMore /></Layout>} />
            </Routes>
            <NetworkStatus />
          </AddressContextProvider>
        </CartProvider>
      </AccountContext>
    </ErrorBoundary>
  )
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/">
        <AppContent />
      </Router>
    </QueryClientProvider>
  )
}

export default App
