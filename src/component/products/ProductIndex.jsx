import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import './style/ProductIndex.css';
import ProductCategories from "./ProductCategories";
import ProductMain from "./ProductMain";
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
                     <div className="products-section-buttons">
                         <button type="button" className="product-index-button"  onClick={this.toggle}>
                             {!this.state.collapse?
                                 (<span><FontAwesome.FaPlus/> Show Categories</span>):
                                 (<span><FontAwesome.FaMinus/> Hide Categories</span>)}
                         </button>
                         <ProductFilter/>
                     </div>

                    <div className="products-section-div">
                        <div className={this.state.collapse===true?"products-section-div-collapse-true":"products-section-div-collapse-false"}>
                            <ProductCategories isOpen={this.state.collapse}/>
                        </div>

                        <ProductMain isOpen={this.state.collapse}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductIndex;