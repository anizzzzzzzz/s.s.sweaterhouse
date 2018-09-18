import API_ROOT from '../config/appConfig';

export function findAllProducts(pageNo, size) {
    return fetch(API_ROOT+"/find-all?page="+pageNo.toString()+"&size="+size.toString(),{
       method:'GET'
    });
}

export function findAllProductsByType(type, pageNo, size){
    let data=new FormData();
    data.append("type",type);
    data.append("size",size.toString());
    data.append("page",pageNo.toString());

    return fetch(API_ROOT+"/find-all-by-type",{
        method:'POST',
        body:data
    });
}

export function findOneByProductCode(productCode){
    let data=new FormData();
    data.append("productCode",productCode);
    return fetch(API_ROOT+"/find-one",{
        method:'POST',
        body:data
    });
}