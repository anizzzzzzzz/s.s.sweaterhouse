import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pagination from 'material-ui-pagination';
import './style/ProductPagination.css';
import {PaginationItem, PaginationLink} from "reactstrap";

class ProductPagination extends Component {
    handleClick(i){
        this.props.handlePagination(i);
    }

    handleNext(event,i){
        event.preventDefault();
        if((i)<this.props.totalPages){
            this.props.handlePagination(i+1);
        }
    }

    handlePrevious(event,i){
        event.preventDefault();
        if((i)>0){
            this.props.handlePagination(i-1);
        }
    }

    render() {
        return (
            <div className="products-main-pagination">
                <div className="pagination">
                    <PaginationItem disabled={this.props.isFirst} onClick={(e)=>this.handlePrevious(e,this.props.page)}>
                        <PaginationLink previous />
                    </PaginationItem>
                </div>
                <MuiThemeProvider>
                    <Pagination
                        total = { this.props.totalPages }
                        current = { this.props.currentPage}
                        display = {5}
                        onChange={(number)=>this.handleClick(number)}
                        styleFirstPageLink={{display:'none'}}
                        styleLastPageLink={{display:'none'}}
                    />
                </MuiThemeProvider>
                <div className="pagination">
                    <PaginationItem disabled={this.props.isLast} onClick={(e)=>this.handleNext(e,this.props.page)}>
                        <PaginationLink next />
                    </PaginationItem>
                </div>
            </div>
        )
    }
}

export default ProductPagination;