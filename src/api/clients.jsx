export async function getClients(){
    const response = await fetch(import.meta.env.VITE_API_URL)
    const result = await response.json()

    return result
}

export async function getClient(id){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const result = await response.json()
    console.log(response)

    return result
}

export async function addClient(data) {
    try {
        const reponse = await fetch(import.meta.env.VITE_API_URL,{
            method: 'POST',
            body : JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        await reponse.json()
        
    } catch (error) {
        console.log(error)
    }
}

export async function updateClient(data, id) {
    
    try {
        const reponse = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'PUT',
            body : JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        await reponse.json()
        
    } catch (error) {
        console.log(error)
    }

    return 
}

export async function deleteClient(id) {
    try {
        const reponse = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'DELETE',
        })

        await reponse.json()
        
    } catch (error) {
        console.log(error)
    }
}