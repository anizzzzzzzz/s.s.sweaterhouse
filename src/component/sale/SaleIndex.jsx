import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import './style/SaleIndex.css';
import SaleCategories from "./SaleCategories";
import * as FontAwesome from 'react-icons/lib/fa'
import SaleFilter from "./SaleFilter";
import Footer from "../common/footer/Footer";
import SaleMain from "./SaleMain";
import {bindActionCreators} from "redux";
import {isSaleCollapseOpen} from "../../redux/action/CollapseAction";
import {connect} from "react-redux";
import AddProductModal from "../admin/addProduct/AddProductModal";
import {ADMIN, SUPER_ADMIN} from "../../constant/RoleConstant";

class SaleIndex extends Component {
    constructor(props){
        super(props);

        const parseQueryString = require('query-string');
        let queryParams = parseQueryString.parse(this.props.location.search);

        this.state={
            item:queryParams.item,
            page:('page' in queryParams)?parseInt(queryParams.page,10):1,
            modalVisible:false,
        };

        this.toggle=this.toggle.bind(this);
    }

    toggle() {
        this.props.isSaleCollapseOpen(!this.props.isSaleCategoriesCollapseOpen);
    }

    handleModalVisible = (visible) => {
        this.setState({
            modalVisible:visible
        });
    };

    //checks if ADMIN, SUPER_ADMIN role is present in usersession role.
    // Then will add this will be displayer
    addProductButton = () => {
        if(this.props.userSession.roles.includes(ADMIN, SUPER_ADMIN)){
            return (<button type="button"
                            className="product-index-button product-index-button-add"
                            onClick={()=>this.handleModalVisible(true)}>
                <span><FontAwesome.FaPlus/> Add Product</span>
            </button>)
        }
    };

    render() {
        return (
            <div>
                <NavigationBar props={this.props}/>
                <div className="sales-section">
                     <div className="sales-section-buttons">
                         <button type="button" className="sales-index-button"  onClick={this.toggle}>
                             {!this.state.collapse?
                                 (<span><FontAwesome.FaPlus/> Show Categories</span>):
                                 (<span><FontAwesome.FaMinus/> Hide Categories</span>)}
                         </button>

                         {/*The add button should be displayed only if the user have admin credential.*/}
                         {this.addProductButton()}
                         <SaleFilter/>
                     </div>

                    <div className="sales-section-div">
                        <div className={this.props.isSaleCategoriesCollapseOpen===true?"sales-section-div-collapse-true":"sales-section-div-collapse-false"}>
                            <SaleCategories isOpen={this.props.isSaleCategoriesCollapseOpen}/>
                        </div>

                        <SaleMain isOpen={this.props.isSaleCategoriesCollapseOpen}
                                  item={this.state.item}
                                  page={this.state.page}
                                  userSession={this.props.userSession}/>
                    </div>
                </div>
                <Footer/>

                {/*Add Product Modal*/}
                <AddProductModal modalVisible={this.state.modalVisible} handleModalVisible={this.handleModalVisible}/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        isSaleCategoriesCollapseOpen:state.isSaleCategoriesCollapseOpen,
        userSession:state.getUserSession
    }
};

const mapDispatchToAction = dispatch=>{
    return bindActionCreators({
        isSaleCollapseOpen:isSaleCollapseOpen
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToAction)(SaleIndex);