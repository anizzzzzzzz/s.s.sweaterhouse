import API_DICT from '../config/appConfig';
import * as axios from "axios";

export function findAllProducts(pageNo, size, token) {
    return fetch(API_DICT.ROOT_API+"/find-all?page="+pageNo.toString()+"&size="+size.toString(),{
        method:'GET',
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    });
}

export function findAllProductsByType(type, pageNo, size, token){
    let data=new FormData();
    data.append("type",type);
    data.append("size",size.toString());
    data.append("page",pageNo.toString());

    return fetch(API_DICT.ROOT_API+"/find-all-by-type",{
        method:'POST',
        headers : {
            'Authorization' : 'Bearer ' + token
        },
        body:data
    });
}

export function findOneByPrductIdAndProductCode(id, productCode, token){
    let data=new FormData();
    data.append("id",id);
    data.append("productCode",productCode);
    return fetch(API_DICT.ROOT_API+"/find-one",{
        method:'POST',
        headers : {
            'Authorization' : 'Bearer ' + token
        },
        body:data
    });
}

export function updateProduct(images, product, token) {
    let productBlob = new Blob([JSON.stringify(product)], {
        type: "application/json"
    });
    let data = new FormData();
    for(let i=0; i<images.length; i++) {
        data.append("images", images[i]);
    }
    data.append("product", productBlob);
    /*return fetch(API_DICT.ROOT_API + "/update-product",{
        method : 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization" : "Bearer "+token
        },
        body : data
    })*/
    return axios({
        method: "post",
        url: API_DICT.ROOT_API + "/update-product",
        data: data,
        config: {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        },
        headers : {"Authorization" : "Bearer "+token}
    })
}