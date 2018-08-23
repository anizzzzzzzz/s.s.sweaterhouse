import API_ROOT from '../config/appConfig';

export function showImages() {
    return fetch(API_ROOT+"/find-all",{
       method:'GET'
    });
}

export function findAllByType(type){
    let data=new FormData();
    data.append("type",type);
    data.append("size","5");
    data.append("page","0");

    return fetch(API_ROOT+"/find-all-by-type",{
        method:'POST',
        body:data
    });
}