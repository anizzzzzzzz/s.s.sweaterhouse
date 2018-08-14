const DEV = 'DEV';
const PROD= 'PROD';

let mode = DEV;
let ROOT_API;

if(mode === 'DEV'){
    ROOT_API='http://localhost:8080';
}
else if(mode === 'PROD'){
    ROOT_API='http://localhost:8080';
}

export default ROOT_API;