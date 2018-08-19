import {IS_PRODUCT_CATEGORIES_OPEN} from "../action/constant/ActionTypes";

export const isProdCategoriesCollapseOpen = (state=true, action)=>{
    switch (action.type){
        case IS_PRODUCT_CATEGORIES_OPEN:
            return action.payload;
        default:
            return state;
    }
};
