import { Form, redirect, useActionData, useNavigate, } from "react-router-dom"
import FormClient from "../components/FormClient"
import Error from "../components/Error"
import { addClient } from "../api/clients"

// eslint-disable-next-line react-refresh/only-export-components
export async function action({request}){
    const formData = await request.formData()
    const email = formData.get('email')
    const data = Object.fromEntries(formData)

    //Validation
    const errors = []

    if(Object.values(data).includes('')){
        errors.push('All fields are required')
    }

    // eslint-disable-next-line no-control-regex, no-useless-escape
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
    if(!regex.test(email)){
        errors.push('Invalid emnail')
    }

    if(Object.keys(errors).length){
        return errors
    }

    await addClient(data)

    return redirect('/')
}

function NewClient() {
    const navigate = useNavigate()
    const errors = useActionData()

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">New client</h1>
            <p className="mt-3">Fill all the fields for a new entry</p>
            <div className="flex justify-end">
                <button className="bg-blue-800 text-white py-1 px-3 font-bold uppercase" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
                {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}
                <Form 
                    method="post"
                >
                    <FormClient/>
                    <input 
                        className="mt-5 w-full bg-blue-800 p-3 font-bold text-white uppercase" 
                        value='Register New Client'
                        type='submit'
                    />
                </Form>
            </div>
        </>
    )
}

export default NewClient
