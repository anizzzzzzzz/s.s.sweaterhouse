import {TRACK_PAGINATION} from "./constant/ActionTypes";

export const trackingPagination=(pageNo)=>{
    return {
        type: TRACK_PAGINATION,
        payload: pageNo
    }
};