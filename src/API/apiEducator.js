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

export const getAllEducators = async () => {
    const educators = await getEducatorIds();
    
    for (var i in educators) {
        let { chats, appointments } = await getEducatorData(educators[i].id)
        if (chats) {
            educators[i].chats = chats
            educators[i].count = chats.length
        }
        if(appointments){
            educators[i].appointments= appointments
        }
    }
    console.log(educators);

    return educators;
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
