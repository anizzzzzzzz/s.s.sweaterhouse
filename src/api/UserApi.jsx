import API_ROOT from '../config/appConfig';

export function userRegistration(user){
    console.log(user);
    return fetch(API_ROOT+"/register/user",{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
}

export function userLogin(user) {
    return fetch(API_ROOT+"/auth",{
       method:'POST',
       headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
       },
        body:JSON.stringify(user)
    });
}
