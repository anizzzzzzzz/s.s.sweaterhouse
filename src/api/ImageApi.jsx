import API_ROOT from '../config/appConfig';

export function showImages() {
    return fetch(API_ROOT+"/find-all",{
       method:'GET'
    });
}