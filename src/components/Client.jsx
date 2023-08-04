import propTypes from 'prop-types'
import { Form, redirect, useNavigate } from 'react-router-dom'
import { deleteClient } from '../api/clients'

// eslint-disable-next-line react-refresh/only-export-components
export async function action( {params} ) {
    await deleteClient(params.clientId)
    return redirect('/')
}
const Client = ({ client }) => {
    const navigate =  useNavigate()
    const {name, email, phone_number, company, id} = client
    
    return (
        <tr className='border-b'>
            <td className='p-6 space-y-2'>
                <p className=' text-2xl text-gray-800'>{name}</p>
                <p>{company}</p>
            </td>
            <td className='p-6'>
                <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
                <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Phone: </span>{phone_number}</p>
            </td>
            <td className='p-6 flex gap-3'>
                <button 
                    type='button' 
                    className='text-blue-600 text-xs font-bold uppercase hover:text-blue-700'
                    onClick={() => navigate(`/clients/${id}/edit`)}
                >
                    Edit
                </button>
                <Form 
                    method='post' 
                    action={`clients/${id}/delete`} 
                    onSubmit={(e) => {
                        !confirm('Are you sure you want to delete this user?') && e.preventDefault()
                    }}>
                    <button 
                        type='submit' className='text-red-600 text-xs font-bold uppercase hover:text-red-700'>
                        Delete
                    </button>
                </Form>
            </td>
        </tr>
    )
}

Client.propTypes = {
    client: propTypes.object
}
export default Client
