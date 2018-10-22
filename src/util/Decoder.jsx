export const decoder=(userSession)=> {
    let jwtDecode = require('jwt-decode');
    if(userSession.token !== '' && userSession.username !== ''){
        let decoded = jwtDecode(userSession.token);
        return decoded.roles;
    }
    else{
        return [];
    }
};
