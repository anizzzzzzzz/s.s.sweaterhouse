import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import allReducers from "../reducer/Index";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';

const persistConfig = {
    key : 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware)
);

export const persistor = persistStore(store);