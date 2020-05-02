import url from '../config/apiConfig'


export  const getEducatorIds= async () => {
    return await fetch(`${url}/educator?get=all`)
        .then(res => res.json())
        .then(data => {
            let educators = {}
            data.forEach((educator) => {
                console.log('educator:');
                console.log( JSON.parse(educator));
                
                
                let { name, id } = JSON.parse(educator)
                educators[id]= { name, id }
            })
            return educators;
        })
        .catch(err => console.log('error getting ids: ', err)
        )
}

export const getEducatorChats= async () => {
    const educators = await getEducatorIds();

    for (var i in educators) {
        let chats = await getChats(educators[i].id)
        if (chats) {
            educators[i].chats = chats
            educators[i].count = chats.length
        }
    }
    console.log(educators);
    
    return educators;
}

export const getChats= async (educatorId) => {
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
