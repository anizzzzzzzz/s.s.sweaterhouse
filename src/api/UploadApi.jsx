import API_DICT from '../config/appConfig';


export function uploadProduct(images, name, type, size, price, sale, selectedImage, token) {
    console.log(selectedImage);
    let data=new FormData();
    for(let i=0; i<images.length; i++) {
        data.append("images", images[i]);
    }
    data.append("name",name);
    data.append("type",type);
    data.append("price",price);
    data.append("sale",sale);
    data.append("size",size);
    data.append("selectedImage",selectedImage);

    return fetch(API_DICT.ROOT_API+"/upload-products",{
        method:'POST',
        body:data,
        headers : {
            'Authorization' : 'Bearer ' + token
        },
    });
}