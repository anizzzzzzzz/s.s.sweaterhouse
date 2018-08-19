import selectProdType from "./ImageReducer";
import {combineReducers} from "redux";
import {isProdCategoriesCollapseOpen} from "./CollapseReducer";

const allReducers = combineReducers({
    selectProdType:selectProdType,
    isProdCategoriesCollapseOpen:isProdCategoriesCollapseOpen
});

export default allReducers;