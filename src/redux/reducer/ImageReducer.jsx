import {SELECT_PRODUCT_TYPE} from "../action/constant/ActionTypes";

const selectProdType= (state=null, action)=>{
    switch (action.type){
        case SELECT_PRODUCT_TYPE:
            return action.payload;
        default:
            return state;
    }
};

export default selectProdType;