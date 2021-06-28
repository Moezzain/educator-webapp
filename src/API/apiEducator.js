import url from '../config/apiConfig'
import { parseObjectOfArrays } from '../helpers/Converters'
import axios from "axios"

export const getMessages = async (chatId, educatorId, token) => {
  try {
    let result = await axios
        .get(`${url}/message?chatId=${chatId}&educatorId=${educatorId}`, {headers: {
          Authorization: `Bearer ${token}`
        }, timeout: 10000 })
    if (result?.data) {
      return result.data
    }
  } catch (error) {
      console.log('error',error);
      
      return error
  }
}

export const getEducatorIds = async (educatorId, token) => {
  try {
    const result = await axios.get(`${url}/educator?get=all&id=${educatorId}&educatorId=${educatorId}`, {headers: {
      Authorization: `Bearer ${token}`
    }})
    if (result.data) {
      let educators = {}
      result.data.forEach((educator) => {
        let { name, id } = JSON.parse(educator)
        educators[id] = { name, id }
      })
      return educators;
    }
  } catch(err) {
    console.log('Error getEducatorIds', err);
  }
}

export const getEducatorChats = async (educatorId, token) => {
  const educators = await getEducatorIds(educatorId, token);
  let patientChats = []
  for (var i in educators) {
    let chats = await getChats(educators[i].id, token)
    if (chats) {
      educators[i].chats = chats
      educators[i].count = chats.length
    }
  }
  return educators;
}

export const getChats = async (educatorId, token) => {
  try {
    const filterDate = 'all';
    const result = await axios.get(`${url}/chat?educatorId=${educatorId}&filterDate=${filterDate}`, {headers: {
      Authorization: `Bearer ${token}`
    }})
    if(result.data) {
      if (result.data.error) {
        return;
      }
      let chats = result.data?.chats?.map((item) => JSON.parse(item))
      if(!chats) {
        return []
      }
      return chats
    }
  } catch (error) {
    console.log("Error getting chats:", error);
  }
}



export const getEducatorData = async (educatorId, token) => {
  try {
    const get = 'chats,appointments,educator,all';
    const result = await axios.get(`${url}/educator?id=${educatorId}&get=${get}&educatorId=${educatorId}`, {headers: {
      Authorization: `Bearer ${token}`
    }})
    if(result.data) {
      
      const {data} = result;
      delete data.educator
      let parsedData = parseObjectOfArrays(data);
      const educator = parsedData.educators.filter((educator) => {
        return educator.id === educatorId
      })
      
      const { appointments, chats } = parsedData;
      return { chats, appointments, educator };
    }
  } catch (error) {
    console.log('getEducatorData Error', error);
  }
}



export const isCaseHandler = async (educatorId, token) => {
  
  return axios.get(`${url}/educator?id=${educatorId}&get=educator&educatorId=${educatorId}`, {headers: {
    Authorization: `Bearer ${token}`
  }}).then((result) => {
    
    return result?.data?.isCaseHandler 
    
  }).catch((e) => {
    console.log('isCaseHandler error ',e);
    
  })
}

export const logout = async (educatorId, token) => {
  const body = {
    educatorId,
    notificationToken:" "
  }
  const result =  await axios.patch(`${url}/logout`,body,{headers: {
    Authorization: `Bearer ${token}`}}).then((res) => {
      
    }).catch((e) => {
      console.log('error ',e);
      
    })
    return result
} 