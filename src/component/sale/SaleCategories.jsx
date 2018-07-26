import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import './style/SaleCategories.css';

class SaleCategories extends Component {
    render() {
        return (
            <Nav vertical className="sales-categories">
                <NavItem>
                    <NavLink href="/sale?item=handwarmer" className="sales-categories-list" >Handwarmer</NavLink>
                    <hr className="sales-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/sale?item=jacket" className="sales-categories-list">Jacket</NavLink>
                    <hr className="sales-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/sale?item=shock" className="sales-categories-list">Shock</NavLink>
                    <hr className="sales-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/sale?item=sweater" className="sales-categories-list">Sweater</NavLink>
                    <hr className="sales-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/sale?item=trouser" className="sales-categories-list">Trouser</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default SaleCategories;