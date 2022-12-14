import axios from 'axios'
const baseUrl = '/api/stations'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => { return response.data })
 
}
const getById = (id) => {
    const request = axios.get(baseUrl+"/"+id)
    return request.then(response => { return response.data })
 
}
const createStation = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => { return response.data })
}

export { getAll, createStation, getById }