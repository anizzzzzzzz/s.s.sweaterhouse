import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";

class ProductCategories extends Component {
    render() {
        return (
            <Nav vertical className="products-categories">
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Handwarmer</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Jacket</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Shock</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Sweater</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="products-categories-list">Trouser</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default ProductCategories;