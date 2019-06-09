import API_DICT from '../config/appConfig';

export function findAllProducts(pageNo, size) {
    return fetch(API_DICT.ROOT_API+"/find-all?page="+pageNo.toString()+"&size="+size.toString(),{
       method:'GET'
    });
}

export function findAllProductsByType(type, pageNo, size){
    let data=new FormData();
    data.append("type",type);
    data.append("size",size.toString());
    data.append("page",pageNo.toString());

    return fetch(API_DICT.ROOT_API+"/find-all-by-type",{
        method:'POST',
        body:data
    });
}

export function findOneByPrductIdAndProductCode(id,productCode){
    let data=new FormData();
    data.append("id",id);
    data.append("productCode",productCode);
    return fetch(API_DICT.ROOT_API+"/find-one",{
        method:'POST',
        body:data
    });
}