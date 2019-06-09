import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store/Index";
import {PersistGate} from "redux-persist/lib/integration/react";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
