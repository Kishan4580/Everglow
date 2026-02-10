import { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { flushSync } from 'react-dom'
import { AddressContext } from './contextstore/addressstore'
import Button from "./components/Button"
// import { CartContext } from './components/cart'
import { useAddress } from './components/useaddress'
export default function Cart({ updateCart, proImgSrc, alt, price, prodInfo, prodId, quantity }) {
    // const { updateCart } = useContext(CartContext)
    const { address, setAddress } = useAddress()
    const [localQuantity, setLocalQuantity] = useState(quantity)
    const [showChanAdd, setShowChanAdd] = useState(false)
    const removeRef = useRef(null)
    const [cartRemNo, setCartRemNo] = useState(false)
    const handlerIncrement = () => {
        console.log("increment")
        flushSync(() => setLocalQuantity(localQuantity + 1))
        updateCart(prodId, localQuantity + 1)
        console.log(localQuantity);
    }
    const handlerDecrement = () => {
        console.log("decrement")
        if (localQuantity > 0) {
            flushSync(() => setLocalQuantity(localQuantity - 1))
            updateCart(prodId, localQuantity - 1)
            console.log(localQuantity);

        }
    }
    const removeItems = () => {
        // if (removeRef.current) {
        flushSync(() => setLocalQuantity(0),
            updateCart(prodId, 0),
            setCartRemNo(true))
        // removeRef.current.remove()
        // }
        // throw new Error("removeRef is undefined")
    }

    useEffect(() => {

    }, [localQuantity, prodId])
    const subtotal = price * localQuantity
    if (!cartRemNo) {
        return <div className='flex items-center gap-2 px-2' >
            <div >
                <button onClick={() => removeItems()} className='text-xl px-1' >X</button>
            </div>
            <Link to={`/product/${prodId}`} >
                <img src={proImgSrc} alt={alt} className='max-w-36 spinz-color' />
            </Link>
            <div className="flex justify-between grow">
                <div className='flex flex-col text-2xl gap-2'>
                    <Link to={`/product/${prodId}`} > <p>{prodInfo}</p> </Link>                <p>{price}</p>
                    <div className='max-w-[280px]'>
                        <ProductIncDec handlerDecrement={handlerDecrement} handlerIncrement={handlerIncrement} quantity={quantity} setQuantity={setLocalQuantity} />
                    </div>
                </div>
                <div className='text-2xl'>
                    {subtotal}
                </div>
            </div>
        </div>
    }
    return (
        <div className=''>
            {cartRemNo &&
                <p className='border-e-2 border-green-700'>{prodInfo} is remove </p>
            }

        </div>
    )
}

const ProductIncDec = ({ handlerDecrement, handlerIncrement, quantity, setQuantity }) => {
    return (
        <div className='flex justify-between  p-1 px-2 md:px-4  border-1 '>
            <button className='cursor-pointer ' onClick={() => handlerDecrement(quantity, setQuantity)}>-</button>
            <input className='lg:w-1/6 sm:w-1/12 mx-auto  outline-none' type="number" id='quantity' value={quantity} onChange={(e) => {console.log(e.target.value);
             setQuantity(e.target.value > 0 ? e.target.value : 1)}} min={1} />
            <button className='cursor-pointer ' type='button' onClick={() => { handlerIncrement(); console.log("called"); }
            }>+</button>
        </div>
    )  
}

const CardTotals = ({ subTotal, total }) => {
    const [showChanAdd, setShowChanAdd] = useState(false)
    return (
        <div className='text-2xl'>
            <h2 className='py-5 px-3'>Card totals</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between font-semibold'>
                    <p>Subtotal</p>
                    <p>{subTotal}</p>
                </div>
                <p className='font-semibold'>Shipping</p>
                <div>
                    <div className='flex flex-col  gap-3'>
                        <div>
                            <label htmlFor="flat-rate">
                                Flat rate:
                                <input type="radio" className='mx-3' />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="local-pickup">
                                Local pickup:
                                <input type="radio" className='mx-3' />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="free-shipp">Free shipping:
                                <input type="radio" className='mx-3' />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='border-2 p-2'>
                    Shipping to { }
                </div>
                <div>
                    <button className='decoration-black decoration-1 underline-offset-3 underline hover:no-underline ' onClick={() => setShowChanAdd(!showChanAdd)}>Change address</button>
                    {showChanAdd && <Address></Address>}
                </div>
                <div>
                    <b>Total  </b>
                    <b>{total}</b>
                </div>
                <div>
                    <Button bgColor={"white"} style1={{ "backgroundColor": "black", color: "white" }} >Proceed to checkout</Button>
                </div>
            </div>
            {/* <div>
                <p>Total</p>
            </div> */}
        </div>
    )
}
// const cardEmpty = () => {
//     return (
//         <div>
//             <h2>Your Cart is curently empty</h2>
//             <Button style={{}}>  <Link>Return to shop</Link></Button>
//         </div>
//     )
// }

const Address = () => {

    const { address, setAddress } = useContext(AddressContext)

    const [selectedCountry, setSelectedCountry] = useState("India")
    const [selectedState, setSelectedState] = useState("Maharashtra")
    const [addressLocal, setAddressLocal] = useState({
        country: "",
        // city: "",
        state: "",
        postalCode: "",
    })
    const updateAddress = (address) => {
        setAddress(address);
        console.log("update address", address)
    }
    console.log(countries);
    const oneFlagH = 25
    let pointer = 20
    return (
        <div>
            {/* <datalist ></datalist> */}
            {/* <input type="text" />    */}
            <div className="flex gap-2 py-2">
                <input type="text" list="countries" className='border-2' placeholder='Enter or Select Country' onChange={(e) => { flushSync(() => { setSelectedCountry(e.target.value) }); setAddressLocal({ ...addressLocal, country: e.target.value }) }} />
                <ul id='countries' className='border-2 p-2 absolute z-50 bg-white overflow-y-auto max-h-[240px]' onChange={(e) => { flushSync(() => { setSelectedCountry(e.target.value) }); setAddressLocal({ ...addressLocal, country: e.target.value }) }}>

                    {countries.map((country, index) => {
                        return <li  className='country' key={index} value={country} >{country}</li>;
                    })}
                </ul>            <input type="text" list="states" className='border-2' placeholder='Enter or Select State' onChange={(e) => { setAddressLocal({ ...addressLocal, state: e.target.value }); setSelectedState(e.target.value) }} />
                <datalist id='states'>{
                    countryStates[selectedCountry]?.map((state, index) => <option key={index} value={state}>{state}</option>)
                }
                </datalist>
            </div>
            <input type="number" className='border-2' placeholder='Enter Postal/ZIP' onChange={(e) => setAddressLocal({ ...addressLocal, postalCode: e.target.value })} />
            <button className='p-2' onClick={() => updateAddress(addressLocal)}>Update</button>
        </div>

    )
}

// Helper function for country codes
const getCountryCode = (country) => {
    const codes = {
        "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Argentina": "ar", "Australia": "au",
        "Austria": "at", "Bangladesh": "bd", "Belgium": "be", "Brazil": "br", "Canada": "ca",
        "China": "cn", "Denmark": "dk", "Egypt": "eg", "France": "fr", "Germany": "de",
        "India": "in", "Indonesia": "id", "Iran": "ir", "Iraq": "iq", "Ireland": "ie",
        "Israel": "il", "Italy": "it", "Japan": "jp", "Mexico": "mx", "Netherlands": "nl",
        "Norway": "no", "Pakistan": "pk", "Russia": "ru", "South Africa": "za", "Spain": "es",
        "Sweden": "se", "Switzerland": "ch", "Turkey": "tr", "Ukraine": "ua", "United Kingdom": "gb",
        "United States": "us"
    };
    return codes[country] || "un";
}

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
]

const countryStates = {
    "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Northern Territory", "Australian Capital Territory"],
    "Brazil": ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"],
    "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
    "China": ["Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan", "Inner Mongolia", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Ningxia", "Qinghai", "Shaanxi", "Shandong", "Shanghai", "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"],
    "Germany": ["Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"],
    "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
    "Mexico": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"],
    "Russia": ["Adygea", "Altai Krai", "Altai Republic", "Amur Oblast", "Arkhangelsk Oblast", "Astrakhan Oblast", "Bashkortostan", "Belgorod Oblast", "Bryansk Oblast", "Buryatia", "Chechen Republic", "Chelyabinsk Oblast", "Chukotka", "Chuvashia", "Dagestan", "Ingushetia", "Irkutsk Oblast", "Ivanovo Oblast", "Kabardino-Balkaria", "Kaliningrad Oblast", "Kalmykia", "Kaluga Oblast", "Kamchatka Krai", "Karachay-Cherkessia", "Karelia", "Kemerovo Oblast", "Khabarovsk Krai", "Khakassia", "Khanty-Mansi", "Kirov Oblast", "Komi", "Kostroma Oblast", "Krasnodar Krai", "Krasnoyarsk Krai", "Kurgan Oblast", "Kursk Oblast", "Leningrad Oblast", "Lipetsk Oblast", "Magadan Oblast", "Mari El", "Mordovia", "Moscow", "Moscow Oblast", "Murmansk Oblast", "Nenets", "Nizhny Novgorod Oblast", "North Ossetia", "Novgorod Oblast", "Novosibirsk Oblast", "Omsk Oblast", "Orenburg Oblast", "Oryol Oblast", "Penza Oblast", "Perm Krai", "Primorsky Krai", "Pskov Oblast", "Rostov Oblast", "Ryazan Oblast", "Sakha Republic", "Sakhalin Oblast", "Samara Oblast", "Saratov Oblast", "Smolensk Oblast", "St. Petersburg", "Stavropol Krai", "Sverdlovsk Oblast", "Tambov Oblast", "Tatarstan", "Tomsk Oblast", "Tula Oblast", "Tuva", "Tver Oblast", "Tyumen Oblast", "Udmurtia", "Ulyanovsk Oblast", "Vladimir Oblast", "Volgograd Oblast", "Vologda Oblast", "Voronezh Oblast", "Yamalo-Nenets", "Yaroslavl Oblast", "Zabaykalsky Krai"],
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
    "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
}




export { CardTotals, ProductIncDec }