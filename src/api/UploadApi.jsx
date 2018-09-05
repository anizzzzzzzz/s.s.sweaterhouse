import API_ROOT from '../config/appConfig';


export function uploadProduct(images,type,size,price,sale,selectedImage) {
    console.log(selectedImage);
    let data=new FormData();
    for(let i=0; i<images.length; i++) {
        data.append("images", images[i]);
    }
    data.append("type",type);
    data.append("price",price);
    data.append("sale",sale);
    data.append("size",size);
    data.append("selectedImage",selectedImage);

    return fetch(API_ROOT+"/upload-images",{
        method:'POST',
        body:data,
    });
}