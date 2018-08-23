import selectProdType from "./ImageReducer";
import {combineReducers} from "redux";
import {isProdCategoriesCollapseOpen} from "./CollapseReducer";
import getStoredRestUrl from "./RestUrlReducer";

const allReducers = combineReducers({
    selectProdType:selectProdType,
    isProdCategoriesCollapseOpen:isProdCategoriesCollapseOpen,
    getStoredRestUrl: getStoredRestUrl
});

export default allReducers;