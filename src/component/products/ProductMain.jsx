import React, {Component} from 'react';
import './style/ProductMain.css';
import ProductLists from "./ProductLists";

class ProductMain extends Component {
    render() {
        return (
            <div className={this.props.isOpen?"products-main-with-filter":"products-main"}>
                <ProductLists isOpen={this.props.isOpen}/>
            </div>
        )
    }
}

export default ProductMain;