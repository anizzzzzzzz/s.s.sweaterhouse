import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import './style/SaleIndex.css';
import SaleCategories from "./SaleCategories";
import * as FontAwesome from 'react-icons/lib/fa'
import SaleFilter from "./SaleFilter";
import Footer from "../common/footer/Footer";
import SaleMain from "./SaleMain";

class SaleIndex extends Component {
    constructor(props){
        super(props);

        const parseQueryString = require('query-string');
        let queryParams = parseQueryString.parse(this.props.location.search);

        this.state={
            collapse:false,
            page:('page' in queryParams)?parseInt(queryParams.page,10):1,
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
                        <div className={this.state.collapse===true?"sales-section-div-collapse-true":"sales-section-div-collapse-false"}>
                            <SaleCategories isOpen={this.state.collapse}/>
                        </div>

                        <SaleMain isOpen={this.state.collapse} page={this.state.page}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default SaleIndex;