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
    console.log(`
  ${educatorId}
  ${token}
  ${url}
  `);
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

export const getAllEducatorsAndPatients = async (educatorId, token) => {
  try {
    console.log(`
  ${educatorId}
  ${token}
  ${url}
  `);
    const caseHandler = isCaseHandler(educatorId,token)
    if(caseHandler){

    
    const educators = await getEducatorIds(educatorId, token);
    console.log('educators: ',educators);
    
    let patients = {}
    for (var i in educators) {
      let educator = educators[i]
      let {chats, appointments}= await getEducatorData(educator.id, token)
      
      if (chats) {
        educator.chats = chats
        educator.count = chats.length
        chats.forEach((chat) => {
          let patient = patients[chat.patientId]
          if (!patient) {
            patients[chat.patientId] = chat
            patient= patients[chat.patientId]
          }
          if (patient && patient.educators) {
            patient.educators.push({id: educator.id, name: educator.name})
          }
          else {
            patient.educators = [{id: educator.id, name: educator.name}]
          }
        })
        // break;

      }
      if (appointments) {
        educators[i].appointments = appointments
      }
    // }
    }

    return {educators, patients};
}}
  catch (error) {
    console.log(' Error getAllEducatorsAndPatients', error);
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
      const { appointments, chats } = parsedData;
      return { chats, appointments };
    }
  } catch (error) {
    console.log('getEducatorData Error', error);
  }
}



export const isCaseHandler = async (educatorId, token) => {
  console.log(`
  ${educatorId}
  ${token}
  ${url}
  `);
  
  await axios.get(`${url}/educator?id=${educatorId}&get=educator&educatorId=${educatorId}`, {headers: {
    Authorization: `Bearer ${token}`
  }}).then((result) => {
    return result?.data?.isCaseHandler 
    
  }).catch((e) => {
    console.log('isCaseHandler error ',e);
    
  })
}

export const logout = async (educatorId, token) => {
  console.log('educator:',educatorId);
  console.log('token:',token);
  
  const body = {
    educatorId,
    notificationToken:" "
  }
  const result =  await axios.patch(`${url}/logout`,body,{headers: {
    Authorization: `Bearer ${token}`}}).then((res) => {
      console.log('logout: ',res);
      
    }).catch((e) => {
      console.log('error ',e);
      
    })
    return result
} 