import { useState, useRef } from "react"
import {useFormik} from "formik"
import emailicon from "../assets/email_verification_allInOne.svg"
const Register = () => {
    const [isLoading, setLoading] = useState(false)
    const [isOutlineUser, setOutlineUser] = useState(false)
    const [isEmailSent, setEmailSent] = useState(false)
    const [userEmail, setUserEmail] = useState()
    const username = useRef(null)
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const validate = (values, props /* only available when using withFormik */) => {
        return sleep(2000).then(() => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            errors.email ? setOutlineUser(true) : setOutlineUser(false)


            //...
            return errors;
        });

    };
    const outlineStyleForUsername = {
        "outlineColor": isOutlineUser ? "red" : "green"
    }
    const formik = useFormik({
        initialValues: { email: "" },
        onSubmit: values => {
            setLoading(true)
            fetch("https://localhost:8443/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json()).then(data => {

                console.log(data); 
                setEmailSent(true)
                setUserEmail(values.email)
                // EmailSentSuccessModal(values.email)
                setLoading(false)
                values.email = "";

            }).catch(err => { console.log(err); setLoading(false) })
        }

        , validate: validate
    }

    )
    return (
        <div>
            <form action="https://localhost:8443/register" onSubmit={formik.handleSubmit}>
            {isLoading ? <div>Loading...</div> : <div className="flex flex-col gap-3">
                <label htmlFor="email">Email address *</label>
                <input style={{ ...outlineStyleForUsername }} type="email" name="email" id="" ref={username} className="border border-gray-950 p-2" onTouchStart={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                <p>A link to set a new password will be sent to your email address.</p>
                <p>
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                </p>
                <SimpleButton children={"Register"} />
            </div>}
        </form>
        {isEmailSent && <EmailSentSuccessModal email={userEmail} />}
        </div>

    )
}

const SimpleButton = ({ children }) => {

    return (
        <button type="submit" className="py-2 w-full bg-black text-white">{children}</button>
    )
}


const Login = () => {
    const username = useRef(null)
    const password = useRef(null)
    const [isOutlinePass, setOutlinePass] = useState(false)
    const [isOutlineUser, setOutlineUser] = useState(false)


    // Async Validation
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const validate = (values, props /* only available when using withFormik */) => {
        return sleep(2000).then(() => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password && values.password.length < 8) {
                errors.password = "Password required and must be greater than 8"
            }
            errors.password ? setOutlinePass(true) : setOutlinePass(false)
            errors.email ? setOutlineUser(true) : setOutlineUser(false)


            //...
            return errors;
        });

    };

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: { email: "", password: "", remember: false },
        onSubmit: values => {
            console.log(typeof values);

            alert(JSON.stringify(values, null, 2));
            fetch("https://localhost:8443/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json" // Add Accept header
                },
                body: JSON.stringify(values)
            }).then(async (data) => {
                if (!data.ok) {
                    throw new Error('Network response was not ok');
                }
                const res = await data.json()
                console.log("server processed sucessfully", res);
            }).catch((error) => {
                console.error("Registration failed:", error.message);
            });
        }

        ,
        validate: validate

    }
    );
    const outlineStyleForPassword = {
        "outlineColor": isOutlinePass ? "red" : "green"
    }
    const outlineStyleForUsername = {
        "outlineColor": isOutlineUser ? "red" : "green"
    }
    return (

        <form action="https://localhost:8443/login" method="POST" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3">
                <label htmlFor="usernameoremail">Username or email address *</label>
                <input type="text" name="email"  style={outlineStyleForUsername} ref={username} onChange={formik.handleChange} value={formik.values.email} id="" className="border border-gray-950 p-2" />
                <span className="text-red-800"> {formik.errors.email}</span>
                <label htmlFor="password">Password</label>
                <input style={outlineStyleForPassword} type="password" name="password" ref={password} onChange={formik.handleChange} value={formik.values.password} id="" className="border border-gray-950 p-2" />
                <span className="text-red-800"> {formik.errors.password}</span>

                <div>
                    <input type="checkbox" name="remember" onChange={formik.handleChange} value={formik.values.remember} id="" className=" mx-2" />
                    <label htmlFor="remember">Remember me</label>

                    <span className="text-red-800">{formik.errors.remember}</span>
                </div>

                <SimpleButton children={"Login"} />
                <p><a href="#" className="underline underline-offset-2 text-black">Lost your password?</a></p>
            </div>
        </form>
    )
}


const Account = () => {
    const [isAccount, setAccount] = useState(false);
    const btnSecondInlineStyle = {
        "borderBottom": isAccount && "2px solid black",
        "paddingBottom": "2px",
        width: "100%",
        outline: "none"
    }

    const btnOneInlineStyle = {
        "borderBottom": !isAccount && "2px solid black",
        "paddingBottom": "2px",
        width: "100%",
        outline: "none"
    }


    return (
        <div className="py-12 px-4 md:px-8 lg:px-12">
            <div className="py-16 text-3xl">My account</div>
            <div className="border-1 h-[1px]"></div>
            <div className="py-6 flex gap-6 border-e-2 border-e-gray-500  my-16">
                <button type="button" onClick={() => setAccount(!isAccount)} style={btnSecondInlineStyle}>Login</button>
                <button type="button" onClick={() => setAccount(!isAccount)} style={btnOneInlineStyle}>Register</button>

            </div>
            <div className="flex justify-center my-16">
                <div className="max-w-[836px]  w-full h-auto">
                    {isAccount ? <Login /> : <Register />}
                </div>
            </div>
        </div>
    )
}

const EmailSentSuccessModal = ({email})=>
{
    return(
        <div className="max-w-1/3 flex flex-col gap-4 p-4 border place-items-center m-4">
            <img src={emailicon} alt="" height={"56"} width={"56"}/>
            <div>Email sent successfully to {email}</div>
        </div>
    )
}

export { Account, SimpleButton };