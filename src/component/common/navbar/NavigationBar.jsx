import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import './NavigationBar.css';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteUserSession} from "../../../redux/action/UserSessionAction";
import {decoder} from "../../../util/Decoder";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            roles:[]
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentWillMount(){
        this.setState({
            roles: decoder(this.props.userSession)
        });
    }

    handleClick = (e)=>{
        e.preventDefault();
        this.props.deleteUserSession();
        this.setState({
            roles:[]
        });
        this.props.props.history.push({
            pathname:"/login"
        });
    };

    render() {
        console.log(this.state.roles);
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
                            <NavItem className="nav-item-custom nav-text-style">
                                <NavLink href="/products" >Products</NavLink>
                            </NavItem>
                            {/*<UncontrolledDropdown className="nav-item-custom nav-text-style" nav inNavbar>
                                <DropdownToggle nav caret >
                                    Products
                                </DropdownToggle>
                                <DropdownMenu right className="dropdown-menu-custom">
                                    <DropdownItem className="nav-text-style dropdown-custom"
                                                  href="/products?item=handwarmer&page=1"
                                                  name="handwarmer"
                                    >
                                        Handwarmer
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style dropdown-custom"
                                                  href="/products?item=jacket&page=1"
                                                  name="jacket"
                                    >
                                        Jacket
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style dropdown-custom"
                                                  href="/products?item=shock&page=1"
                                                  name="shock"
                                    >
                                        Shock
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style dropdown-custom"
                                                  href="/products?item=sweater&page=1"
                                                  name="sweater"
                                    >
                                        Sweater
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-text-style dropdown-custom"
                                                  href="/products?item=trouser&page=1"
                                                  name="trouser"
                                    >
                                        Trouser
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>*/}
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
                                {(this.props.userSession.token === '' && this.props.userSession.username === '')
                                    ? <NavLink href="/login" >Login</NavLink>
                                    : <NavLink href="/" onClick={this.handleClick}>Logout</NavLink>
                                }
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

const mapStateToProps = (state)=>{
    return{
        userSession:state.getUserSession
    }
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        deleteUserSession:deleteUserSession
    },dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(NavigationBar);
