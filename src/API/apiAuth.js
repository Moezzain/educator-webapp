import axios from "axios"
import url from '../config/apiConfig'
import { sha256 } from 'js-sha256';

const encrypt = (text) => {
    return sha256(text);
}

export const login = async ({ username, password }) => {
    let encryptedPassword = await encrypt(password);
    console.log("password encrypted: ",encryptedPassword);
    console.log("username: ",username);
    
    const data = {
        id: username,
        password: encryptedPassword
    }
    return axios.post(`${url}/login`, data)
}
