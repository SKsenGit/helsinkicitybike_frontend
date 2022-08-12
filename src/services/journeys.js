import axios from 'axios'
const baseUrl = '/api/journeys'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => { return response.data })
 
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => { return response.data })
}

module.exports =  { getAll, create }