import {SELECT_PRODUCT_TYPE} from "./constant/ActionTypes";

export const selectProductType = (type)=>{
    return {
        type: SELECT_PRODUCT_TYPE,
        payload: type
    }
};