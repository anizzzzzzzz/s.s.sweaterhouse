import API_ROOT from '../config/appConfig';

export function showImages() {
    return fetch(API_ROOT+"/find-all",{
       method:'GET'
    });
}

export function findAllByType(type, pageNo, size){
    let data=new FormData();
    data.append("type",type);
    data.append("size",size.toString());
    data.append("page",pageNo.toString());

    return fetch(API_ROOT+"/find-all-by-type",{
        method:'POST',
        body:data
    });
}