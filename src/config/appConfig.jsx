const DEV = 'DEV';
const PROD= 'PROD';

let mode = 'DEV';
let API_DICT = {};

if(mode === DEV){
    API_DICT['ROOT_API']='http://localhost:8080';
    API_DICT['IMAGE_API'] = 'http://localhost:9000'
}
else if(mode === PROD){
    API_DICT['ROOT_API']='http://192.168.1.103:8080';
    API_DICT['IMAGE_API'] = 'http://192.168.1.103:9000'
}

export default API_DICT;