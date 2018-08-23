import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import './style/ProductIndex.css';
import ProductCategories from "./ProductCategories";
import ProductMain from "./ProductMain";
import * as FontAwesome from 'react-icons/lib/fa'
import ProductFilter from "./ProductFilter";
import Footer from "../common/footer/Footer";
import {connect} from "react-redux";
import {isProductCollapseOpen} from "../../action/CollapseAction";
import {bindActionCreators} from "redux";

class ProductIndex extends Component {
    constructor(props){
        super(props);

        this.toggle=this.toggle.bind(this);
    }

    toggle() {
        this.props.isProductCollapseOpen(!this.props.isProdCategoriesCollapseOpen);
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="products-section">
                     <div className="products-section-buttons">
                         <button type="button" className="product-index-button"  onClick={this.toggle}>
                             {!this.props.isProdCategoriesCollapseOpen?
                                 (<span><FontAwesome.FaPlus/> Show Categories</span>):
                                 (<span><FontAwesome.FaMinus/> Hide Categories</span>)}
                         </button>
                         <ProductFilter/>
                     </div>

                    <div className="products-section-div">
                        <div className={this.props.isProdCategoriesCollapseOpen===true?"products-section-div-collapse-true":"products-section-div-collapse-false"}>
                            <ProductCategories isOpen={this.props.isProdCategoriesCollapseOpen}/>
                        </div>

                        <ProductMain isOpen={this.props.isProdCategoriesCollapseOpen}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        isProdCategoriesCollapseOpen:state.isProdCategoriesCollapseOpen
    }
};

const mapDispatchToAction = dispatch=>{
    return bindActionCreators({
        isProductCollapseOpen:isProductCollapseOpen
    },dispatch);
};

export default connect(mapStateToProps, mapDispatchToAction)(ProductIndex);