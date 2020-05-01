import axios from "axios"
import apiUrl from '../config/apiConfig'
import { sha256 } from 'js-sha256';

const encrypt = (text) => {
    return sha256(text);
}

export const login = async ({ username, password }) => {
    let encryptedPassword = await encrypt(password);
    
    const data = {
        id: username,
        password: encryptedPassword
    }
    return axios.post(`${apiUrl}/login`, data)
}

export const getMessages = async id => {
    try {
        let result = await axios
            .get(`${apiUrl}/message?chatId=${id}`, { timeout: 10000 })
        return result;
    } catch (error) {
        return error
    }
}