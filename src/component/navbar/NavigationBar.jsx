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
import '../../style/style.css';
import PropTypes from 'prop-types';

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="sshouse">
                <Navbar expand="md">
                    <NavbarBrand href="/">S.S. Sweater House</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} style={{color:'red'}} >a</NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mx-auto" navbar>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="#none" className="all-nav-item-style">Home</NavLink>
                            </NavItem>
                            <UncontrolledDropdown className="nav-item-custom nav-text-style" nav inNavbar>
                                <DropdownToggle nav caret className="all-nav-item-style">
                                    Products
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem className="nav-text-style">
                                        Handwarmer
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style">
                                        Jacket
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style">
                                        Shock
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style">
                                        Sweater
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style">
                                        Trouser
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="#none" className="all-nav-item-style">Sale</NavLink>
                            </NavItem>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="#none" className="all-nav-item-style">FAQ</NavLink>
                            </NavItem>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="#none" className="all-nav-item-style">About us</NavLink>
                            </NavItem>
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="#none" className="all-nav-item-style">Contact</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="nav-text-style">
                                <NavLink href="#none" className="all-nav-item-style">Login</NavLink>
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

export default NavigationBar;