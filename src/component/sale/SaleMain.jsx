import React, {Component} from 'react';
import './style/SaleMain.css';
import SaleLists from "./SaleLists";
import SaleMainPagination from "./SaleMainPagination";

class SaleMain extends Component {
    render() {
        return (
            <div className={this.props.isOpen?"sales-main-with-filter":"sales-main"}>
                <SaleLists isOpen={this.props.isOpen}/>
                <SaleMainPagination/>
            </div>
        )
    }
}

export default SaleMain;