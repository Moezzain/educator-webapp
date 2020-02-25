import axios from "axios"
import apiUrl from '../config/apiConfig'


export const login = async (user) => {
    // const password =  await encrypt(password);
    // console.log(password)
    const data = {
        user
    }
    return axios.post(`${apiUrl}/login`, data)
}