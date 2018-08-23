import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import './style/ProductCategories.css';
import {bindActionCreators} from "redux";
import {selectProductType} from "../../action/ImageAction";
import {connect} from "react-redux";
import {trackingPagination} from "../../action/PaginationAction";

class ProductCategories extends Component {
    handleClick(e){
        e.preventDefault();
        this.props.selectProductType(e.target.name);
        this.props.trackingPagination(0);
        window.location='/products?item='+e.target.name;
    }

    render() {
        return (
            <Nav vertical className="products-categories">
                <NavItem>
                    <NavLink href="/products?item=handwarmer"
                             className="products-categories-list"
                             name="handwarmer"
                             onClick={(e)=>{return this.handleClick(e)}}
                    >
                        Handwarmer
                    </NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=jacket"
                             className="products-categories-list"
                             name="jacket"
                             onClick={(e)=>{return this.handleClick(e)}}
                    >
                        Jacket
                    </NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=shock"
                             className="products-categories-list"
                             name="shock"
                             onClick={(e)=>{return this.handleClick(e)}}
                    >
                        Shock
                    </NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=sweater"
                             className="products-categories-list"
                             name="sweater"
                             onClick={(e)=>{return this.handleClick(e)}}
                    >
                        Sweater
                    </NavLink>
                    <hr className="products-categories-list-hr-line"/>
                </NavItem>
                <NavItem>
                    <NavLink href="/products?item=trouser"
                             className="products-categories-list"
                             name="trouser"
                             onClick={(e)=>{return this.handleClick(e)}}
                    >
                        Trouser
                    </NavLink>
                </NavItem>
            </Nav>
        )
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({
            selectProductType:selectProductType,
            trackingPagination:trackingPagination
        },dispatch);
};

export default connect(null,mapDispatchToProps)(ProductCategories);