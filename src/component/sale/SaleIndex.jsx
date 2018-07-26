import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import './style/SaleIndex.css';
import SaleCategories from "./SaleCategories";
import SaleMain from "./SaleMain";
import * as FontAwesome from 'react-icons/lib/fa'
import SaleFilter from "./SaleFilter";
import Footer from "../common/footer/Footer";

class SaleIndex extends Component {
    constructor(props){
        super(props);

        this.state={
            collapse:false
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

                        <SaleMain isOpen={this.state.collapse}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default SaleIndex;