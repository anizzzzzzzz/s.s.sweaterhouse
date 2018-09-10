import API_ROOT from '../config/appConfig';

export function findAllSales(pageNo, size) {
    return fetch(API_ROOT+"/find-all-sales?page="+pageNo.toString()+"&size="+size.toString(),{
        method:'GET'
    });
}