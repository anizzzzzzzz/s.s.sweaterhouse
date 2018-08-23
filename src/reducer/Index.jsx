import selectProdType from "./ImageReducer";
import {combineReducers} from "redux";
import {isProdCategoriesCollapseOpen} from "./CollapseReducer";
import getStoredRestUrl from "./RestUrlReducer";
import trackingPagination from "./PaginationReducer";

const allReducers = combineReducers({
    selectProdType:selectProdType,
    isProdCategoriesCollapseOpen:isProdCategoriesCollapseOpen,
    getStoredRestUrl: getStoredRestUrl,
    trackingPagination: trackingPagination
});

export default allReducers;