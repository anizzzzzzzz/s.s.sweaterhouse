import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeIndex from "../component/home/HomeIndex";
import Faq from "../component/faq/Faq";
import ProductIndex from "../component/products/ProductIndex";
import SaleIndex from "../component/sale/SaleIndex";
import Login from "../component/login/Login";
import Register from "../component/register/Register";
import AddProduct from "../component/admin/addProduct/AddProduct";
import ViewIndex from "../component/view-product/ViewIndex";

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
                    <Route path="/register" component={Register}/>
                    <Route path="/add-product" component={AddProduct}/>
                    <Route path="/view" component={ViewIndex}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;