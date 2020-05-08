import url from '../config/apiConfig'
import { parseObjectOfArrays } from '../helpers/Converters'

export const getEducatorIds = async () => {
  return await fetch(`${url}/educator?get=all`)
    .then(res => res.json())
    .then(data => {
      let educators = {}
      data.forEach((educator) => {
        let { name, id } = JSON.parse(educator)
        educators[id] = { name, id }
      })
      return educators;
    })
    .catch(err => console.log('error getting ids: ', err)
    )
}

export const getEducatorChats = async () => {
  const educators = await getEducatorIds();
  let patientChats = []
  for (var i in educators) {
    let chats = await getChats(educators[i].id)
    if (chats) {
      educators[i].chats = chats
      educators[i].count = chats.length
    }
  }
  return educators;
}

export const getChats = async (educatorId) => {

  return await fetch(`${url}/chat?educatorId=${educatorId}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        return;
      }
      let chats = data.map((item) => JSON.parse(item))
      return chats

    }).catch(e => console.log(e))
}

export const getAllEducatorsAndPatients = async () => {
  const educators = await getEducatorIds();
  let patients = {}
  for (var i in educators) {
    let educator = educators[i]
    let { chats, appointments } = await getEducatorData(educator.id)
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
      console.log("patients", patients);
      // break;

    }
    if (appointments) {
      educators[i].appointments = appointments
    }
  }

  return {educators, patients};
}


export const getEducatorData = async (educatorId) => {


  const get = 'chats,appointments,educator,all';
  return await fetch(`${url}/educator?id=${educatorId}&get=${get}`)
    .then(res => res.json())
    .then(data => {
      delete data.educator
      let parsedData = parseObjectOfArrays(data);
      const { appointments, chats } = parsedData;
      return { chats, appointments };
    })
    .catch(err => console.log(err))
}
