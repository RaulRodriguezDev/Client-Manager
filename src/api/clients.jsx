/**
 * Returns all the clients in the DB
 * @returns {Array} Clients object array
 */
export async function getClients(){
    const response = await fetch(import.meta.env.VITE_API_URL)
    const result = await response.json()

    return result
}

/**
 * Returns a client by id
 * @param {Int32List} id 
 * @returns {Object} Client object with the id received
 */
export async function getClient(id){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const result = await response.json()
    console.log(response)

    return result
}

/**
 * Create a new client in the DB
 * @param {Object} data 
 */
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

/**
 * Update a client with the id
 * @param {Object} data 
 * @param {Int32List} id 
 * @returns 
 */
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

/**
 * Delete a client from the DB
 * @param {Int32List} id 
 */
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