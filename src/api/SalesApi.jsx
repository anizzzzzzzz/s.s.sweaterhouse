import API_DICT from '../config/appConfig';

export function findAllSales(pageNo, size, token) {
    return fetch(API_DICT.ROOT_API+"/find-all-sales?page="+pageNo.toString()+"&size="+size.toString(),{
        method:'GET',
        headers : {
            'Authorization' : 'Bearer ' + token
        },
    });
}

export function findAllBySalesAndType(type,pageNo, size, token) {
    return fetch(API_DICT.ROOT_API+"/find-all-sales-and-type?page="+pageNo.toString()+"&size="+size.toString()+"&type="+type.toString(),{
        method:'GET',
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    });
}