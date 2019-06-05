import selectProdType from "./ImageReducer";
import {combineReducers} from "redux";
import {isProdCategoriesCollapseOpen, isSaleCategoriesCollapseOpen} from "./CollapseReducer";
import getStoredRestUrl from "./RestUrlReducer";
import trackingPagination from "./PaginationReducer";
import getUserSession from "./UserSessionReducer";
import forgotPasswordUsername from "./ForgotPasswordReducer";

const allReducers = combineReducers({
    selectProdType:selectProdType,
    isProdCategoriesCollapseOpen:isProdCategoriesCollapseOpen,
    getStoredRestUrl: getStoredRestUrl,
    trackingPagination: trackingPagination,
    isSaleCategoriesCollapseOpen:isSaleCategoriesCollapseOpen,
    getUserSession:getUserSession,
    forgotPasswordUsername:forgotPasswordUsername
});

export default allReducers;