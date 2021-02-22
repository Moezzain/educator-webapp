export function parseArray(arr){
    return arr.map((element) => { return JSON.parse(element) })
}

export function parseObjectOfArrays(obj){
    let parsed=[]
    let objects={}
    for(var key in obj){
        var current=obj[key]
        if (Array.isArray(current)) {
            objects[key]= parseArray(current)
            parsed.push(parseArray(current))
        }
    }
    return objects
}