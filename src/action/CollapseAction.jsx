import {IS_PRODUCT_CATEGORIES_OPEN} from "./constant/ActionTypes";

export const isProductCollapseOpen = (isOpen)=>{
    return {
        type: IS_PRODUCT_CATEGORIES_OPEN,
        payload: isOpen
    }
};