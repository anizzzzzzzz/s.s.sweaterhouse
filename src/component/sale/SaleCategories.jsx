import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import './style/SaleCategories.css';

class SaleCategories extends Component {
    render() {
        return (
            <Nav vertical className="sales-categories">
                <NavItem>
                    <NavLink href="/sale?item=handwarmer&page=1" className="sales-categories-list" >Handwarmer</NavLink>
                </NavItem>
                <hr className="sales-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/sale?item=jacket&page=1" className="sales-categories-list">Jacket</NavLink>
                </NavItem>
                <hr className="sales-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/sale?item=shock&page=1" className="sales-categories-list">Shock</NavLink>
                </NavItem>
                <hr className="sales-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/sale?item=sweater&page=1" className="sales-categories-list">Sweater</NavLink>
                </NavItem>
                <hr className="sales-categories-list-hr-line"/>
                <NavItem>
                    <NavLink href="/sale?item=trouser&page=1" className="sales-categories-list">Trouser</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default SaleCategories;