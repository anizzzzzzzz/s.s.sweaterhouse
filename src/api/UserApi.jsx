import API_DICT from '../config/appConfig';

export function userRegistration(user){
    console.log(user);
    return fetch(API_DICT.ROOT_API+"/register/user",{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
}

export function userLogin(user) {
    return fetch(API_DICT.ROOT_API+"/auth",{
       method:'POST',
       headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
       },
        body:JSON.stringify(user)
    });
}
