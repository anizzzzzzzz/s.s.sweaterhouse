import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeIndex from "../component/home/HomeIndex";
import Faq from "../component/faq/Faq";
import ProductIndex from "../component/products/ProductIndex";
import SaleIndex from "../component/sale/SaleIndex";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeIndex}/>
                    <Route path="/products" component={ProductIndex}/>
                    <Route path="/faq" component={Faq}/>
                    <Route path="/sale" component={SaleIndex}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;