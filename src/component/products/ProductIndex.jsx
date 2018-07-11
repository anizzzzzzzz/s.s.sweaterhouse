import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import '../../style/style.css';
import {Collapse} from "reactstrap";
import ProductCategories from "./ProductCategories";
import ProductionMain from "./ProductionMain";
import * as FontAwesome from 'react-icons/lib/fa'
import ProductFilter from "./ProductFilter";

class ProductIndex extends Component {
    constructor(props){
        super(props);

        this.state={
            collapse:true
        };

        this.toggle=this.toggle.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="products-section">
                     <button type="button" className="product-index-button"  onClick={this.toggle}>
                         {!this.state.collapse?
                             (<span><FontAwesome.FaPlus/> Show Categories</span>):
                             (<span><FontAwesome.FaMinus/> Hide Categories</span>)}
                     </button>
                    <ProductFilter/>

                    <div className="products-section-div">
                        <Collapse isOpen={this.state.collapse}>
                            <ProductCategories isOpen={this.state.collapse}/>
                        </Collapse>

                        <ProductionMain isOpen={this.state.collapse}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductIndex;