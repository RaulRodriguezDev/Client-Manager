import { useLoaderData, Form, useNavigate, useActionData, redirect } from "react-router-dom"
import { getClient, updateClient } from "../api/clients"
import FormClient from "../components/FormClient"
import Error from "../components/Error"

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}) {
    const client = await getClient(params.clientId)
    
    if(Object.values(client).length === 0){
        throw new Response('',{
            status:404,
            statusText: 'No such client found'
        })
    }

    return client
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({request, params}){
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

    //Update client
    await updateClient(data, params.clientId)
    return redirect('/')
}
const EditClient = () => {
    const navigate = useNavigate()
    const client = useLoaderData()
    const errors = useActionData()
return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
        <p className="mt-3">You can edit your clients in the form below</p>
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
                    <FormClient client={client}/>
                    <input 
                        className="mt-5 w-full bg-blue-800 p-3 font-bold text-white uppercase" 
                        value='Update Client'
                        type='submit'
                    />
                </Form>
            </div>
        </>
)
}

export default EditClient
