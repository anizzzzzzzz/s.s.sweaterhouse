import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeIndex from "../component/home/HomeIndex";
import Faq from "../component/faq/Faq";
import ProductIndex from "../component/products/ProductIndex";
import SaleIndex from "../component/sale/SaleIndex";
import Login from "../component/login/Login";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeIndex}/>
                    <Route path="/products" component={ProductIndex}/>
                    <Route path="/faq" component={Faq}/>
                    <Route path="/sale" component={SaleIndex}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;