import React, {Component} from 'react';

class ProductionMain extends Component {
    render() {
        return (
            <div className={this.props.isOpen?"products-main-with-filter":"products-main"}>

            </div>
        )
    }
}

export default ProductionMain;