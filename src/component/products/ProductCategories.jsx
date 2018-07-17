import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import './style/ProductCategories.css';

class ProductCategories extends Component {
    render() {
        return (
            <Nav vertical className="products-categories">
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Handwarmer</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Jacket</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Shock</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Sweater</NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Trouser</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default ProductCategories;