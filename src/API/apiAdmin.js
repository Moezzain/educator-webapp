import url from '../config/apiConfig'
import { parseObjectOfArrays } from '../helpers/Converters'
import axios from "axios"

export const getAdminData = async ({educatorId, adminId, token}) => {
  try {
    const get = 'chats,appointments,educator,all';
    const result = await axios.get(`${url}/educator?id=${educatorId}&get=${get}&adminId=${adminId}`, {headers: {
      Authorization: `Bearer ${token}`
    }})
    if(result.data) {
      
      const {data} = result;
      const educator = JSON.parse(data.educator)
      delete data.educator
      let parsedData = parseObjectOfArrays(data);
      const { appointments, chats, educators } = parsedData;
      
      return { chats, appointments, educator, educators};
    }
  } catch (error) {
    console.log('getAdminData Error', error);
  }
}

