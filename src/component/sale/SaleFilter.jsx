import React, {Component} from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import './style/SaleFilter.css';

class SaleFilter extends Component {
    constructor(props){
        super(props);

        this.state={
            showMenu:false,
            filterName:""
        };

        this.showMenu=this.showMenu.bind(this);
        this.closeMenu=this.closeMenu.bind(this);

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

    componentWillMount(){
        this.setState({
            filterName:this.filterItem[0].key
        })
    }

    showMenu(e){
        e.preventDefault();
        this.setState({
                showMenu:true
        },
        () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
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
            <div className="sales-filter">
                <button
                    type="button"
                    className="product-index-button"
                    onClick={this.showMenu}
                >
                    Sort By : {this.state.filterName}
                    <FontAwesome.FaCaretDown/>
                </button>
                {
                    this.state.showMenu?
                        (
                            <div className="sales-filter-dropdown-menu">
                                {
                                    this.filterItem.map(filter=>
                                            <div>
                                                <a
                                                    key={filter.id}
                                                    tabIndex={filter.id}
                                                    className="sales-filter-dropdown-item"
                                                    onClick={(e)=>this.handleClick(e,filter.key)}
                                                >
                                                    {filter.key}
                                                </a>
                                                {
                                                    (filter.id<this.filterItem.length)?
                                                    (<hr style={{margin:'1px 0'}}/>):
                                                    (null)
                                                }
                                            </div>
                                    )
                                }
                            </div>
                        ):
                        (
                            null
                        )
                }
            </div>
        )
    }
}

export default SaleFilter;