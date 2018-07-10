import React, {Component} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

class ProductFilter extends Component {
    constructor(props){
        super(props);

        this.toggle=this.toggle.bind(this);
        this.state={
            dropDownOpen:false,
            filterName:""
        };

        this.filterItem=[
            {
                "id":1,
                "key":"Best Match",
                "value":"bestMatch"
            },
            {
                "id":2,
                "key":"Best Rated",
                "value":"bestRated"
            },
            {
                "id":3,
                "key":"Newest Item",
                "value":"newestItem"
            },
            {
                "id":4,
                "key":"Price Low",
                "value":"priceLow"
            },
            {
                "id":5,
                "key":"Price High",
                "value":"priceHigh"
            }
        ]
    }

    toggle(){
        this.setState({
            dropDownOpen:!this.state.dropDownOpen
        });
    }

    handleClick(event,name){
        event.preventDefault();
        this.setState({
            filterName:name
        });
    }

    render() {
        return (
            <UncontrolledDropdown
                className="products-filter"
                isOpen={this.state.dropDownOpen}
                toggle={this.toggle}
            >
                <DropdownToggle className="products-filter-dropdown-toggle" caret>
                    Sort By : {this.state.filterName}
                </DropdownToggle>
                <DropdownMenu className="products-filter-dropdown-menu" right>
                    {
                        this.filterItem.map((filter)=>
                            <DropdownItem key={filter.id} onClick={(e)=>this.handleClick(e,filter.key)}>{filter.key}</DropdownItem>
                        )
                    }
                </DropdownMenu>
            </UncontrolledDropdown  >
        )
    }
}

export default ProductFilter;