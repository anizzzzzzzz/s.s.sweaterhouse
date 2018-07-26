import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import './style/ProductCategories.css';

class ProductCategories extends Component {
    render() {
        return (
            <Nav vertical className="products-categories">
                <NavItem>
                    <NavLink href="/products?item=handwarmer" className="products-categories-list" >Handwarmer</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=jacket" className="products-categories-list">Jacket</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=shock" className="products-categories-list">Shock</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=sweater" className="products-categories-list">Sweater</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=trouser" className="products-categories-list">Trouser</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default ProductCategories;