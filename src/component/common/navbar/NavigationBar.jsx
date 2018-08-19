import React, {Component} from 'react';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';
import './NavigationBar.css';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {selectProductType} from "../../../action/ImageAction";
import {connect} from "react-redux";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            height:'0px'
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleClick(e){
        e.preventDefault();
        this.props.selectProductType(e.target.name);
        window.location='/products?item='+e.target.name;
    }

    render() {
        return (
            <div className="sshouse">
                    <Navbar color="dark" dark expand="md" className="fixed-top">
                    <NavbarBrand href="/">S.S. Sweater House</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mx-auto" navbar>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="/" >Home</NavLink>
                            </NavItem>
                            <UncontrolledDropdown className="nav-item-custom nav-text-style" nav inNavbar>
                                <DropdownToggle nav caret >
                                    Products
                                </DropdownToggle>
                                <DropdownMenu right className="dropdown-menu-custom">
                                    <DropdownItem className="nav-text-style"
                                                  href="/products?item=handwarmer"
                                                  name="handwarmer"
                                                  onClick={(e)=>{return this.handleClick(e)}}
                                    >
                                        Handwarmer
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style"
                                                  href="/products?item=jacket"
                                                  name="jacket"
                                                  onClick={(e)=>{return this.handleClick(e)}}
                                    >
                                        Jacket
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style"
                                                  href="/products?item=shock"
                                                  name="shock"
                                                  onClick={(e)=>{return this.handleClick(e)}}
                                    >
                                        Shock
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style"
                                                  href="/products?item=sweater"
                                                  name="sweater"
                                                  onClick={(e)=>{return this.handleClick(e)}}
                                    >
                                        Sweater
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style"
                                                  href="/products?item=trouser"
                                                  name="trouser"
                                                  onClick={(e)=>{return this.handleClick(e)}}
                                    >
                                        Trouser
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="/sale" >Sale</NavLink>
                            </NavItem>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="/faq" >FAQ</NavLink>
                            </NavItem>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="#none" >About us</NavLink>
                            </NavItem>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="#none" >Contact</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="nav-text-style">
                                <NavLink href="/login" >Login</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
Nav.propTypes = {
    tabs: PropTypes.bool,
    pills: PropTypes.bool,
    card: PropTypes.bool,
    justified: PropTypes.bool,
    fill: PropTypes.bool,
    vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    horizontal: PropTypes.string,
    navbar: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
      selectProductType:selectProductType
  },dispatch);
};

export default connect(null, mapDispatchToProps)(NavigationBar);
