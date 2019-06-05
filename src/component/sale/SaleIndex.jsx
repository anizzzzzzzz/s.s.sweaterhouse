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

class SaleIndex extends Component {
    constructor(props){
        super(props);

        const parseQueryString = require('query-string');
        let queryParams = parseQueryString.parse(this.props.location.search);

        this.state={
            item:queryParams.item,
            page:('page' in queryParams)?parseInt(queryParams.page,10):1,
        };

        this.toggle=this.toggle.bind(this);
    }

    toggle() {
        this.props.isSaleCollapseOpen(!this.props.isSaleCategoriesCollapseOpen);
    }

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
                         <SaleFilter/>
                     </div>

                    <div className="sales-section-div">
                        <div className={this.props.isSaleCategoriesCollapseOpen===true?"sales-section-div-collapse-true":"sales-section-div-collapse-false"}>
                            <SaleCategories isOpen={this.props.isSaleCategoriesCollapseOpen}/>
                        </div>

                        <SaleMain isOpen={this.props.isSaleCategoriesCollapseOpen}
                                  item={this.state.item}
                                  page={this.state.page}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        isSaleCategoriesCollapseOpen:state.isSaleCategoriesCollapseOpen
    }
};

const mapDispatchToAction = dispatch=>{
    return bindActionCreators({
        isSaleCollapseOpen:isSaleCollapseOpen
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToAction)(SaleIndex);