import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import './style/ProductCategories.css';

class ProductCategories extends Component {
    render() {
        return (
            <Nav vertical className="products-categories">
                <NavItem>
                    <NavLink href="/products?item=handwarmer&page=1"
                             className="products-categories-list"
                             name="handwarmer"
                    >
                        Handwarmer
                    </NavLink>
                </NavItem>
                <hr className="products-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/products?item=jacket&page=1"
                             className="products-categories-list"
                             name="jacket"
                    >
                        Jacket
                    </NavLink>
                </NavItem>
                <hr className="products-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/products?item=shock&page=1"
                             className="products-categories-list"
                             name="shock"
                    >
                        Shock
                    </NavLink>
                </NavItem>
                <hr className="products-categories-list-hr-line"/>
                <NavItem>
                    <NavLink  href="/products?item=sweater&page=1"
                             className="products-categories-list"
                             name="sweater"
                    >
                        Sweater
                    </NavLink>
                </NavItem>
                <hr className="products-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/products?item=trouser&page=1"
                             className="products-categories-list"
                             name="trouser"
                    >
                        Trouser
                    </NavLink>
                </NavItem>
                <hr className="products-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/products"
                             className="products-categories-list"
                             name="trouser"
                    >
                        Clear all
                    </NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default ProductCategories;