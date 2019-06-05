import {IS_PRODUCT_CATEGORIES_OPEN, IS_SALE_CATEGORIES_OPEN} from "./constant/ActionTypes";

export const isProductCollapseOpen = (isOpen)=>{
    return {
        type: IS_PRODUCT_CATEGORIES_OPEN,
        payload: isOpen
    }
};

export const isSaleCollapseOpen = (isOpen)=>{
    return {
        type : IS_SALE_CATEGORIES_OPEN,
        payload: isOpen
    }
};