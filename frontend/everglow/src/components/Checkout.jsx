import { Formik, Form, Field } from "formik"
export default function Checkout() {
    return (
        <div className="pt-24 md:pt-28 spinz-color pb-2">
            <h1 className="py-10 md:py-16  ">Checkout</h1>
            <hr className="h-0.5 bg-black d-block" />
            <Formik initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}>
                <Form className="flex flex-col bg-white px-4 py-4 mx-w-[620px]">
                    <div className="grid-cols-2">
                       <div className="flex gap-4 md:gap-6">
                         <div className="flex flex-col">
                            <label htmlFor="firstName">First Name</label>
                        <Field  className="border-2 p-3 border-gray-500" id="firstName" name="firstName" placeholder="Jane" />

                        </div>
                        
                       <div className="flex flex-col">
                         <label htmlFor="lastName">Last Name</label>
                        <Field className="border-2 p-3 border-gray-500"  id="lastName" name="lastName" placeholder="Doe" />

                       </div>
                       </div>

                    </div>
                    <div className=" flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder=" jane@acme.com"
                        type="email"
                        className="border-2 p-3 border-gray-500"
                    />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}