import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeIndex from "../component/home/HomeIndex";
import Faq from "../component/faq/Faq";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeIndex}/>
                    <Route path="/faq" component={Faq}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;