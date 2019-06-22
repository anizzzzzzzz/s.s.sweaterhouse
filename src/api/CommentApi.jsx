import API_DICT from "../config/appConfig";

export function saveComment(data, token) {
    return fetch(API_DICT.ROOT_API + '/comment',{
        method:'POST',
        headers : {
            "Authorization" : "Bearer " + token,
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
}