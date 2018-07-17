import React, {Component} from 'react';
import './style/ProductMain.css';

class ProductMain extends Component {
    render() {
        return (
            <div className={this.props.isOpen?"products-main-with-filter":"products-main"}>

            </div>
        )
    }
}

export default ProductMain;