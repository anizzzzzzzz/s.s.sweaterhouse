import React, {Component} from 'react';
import {PaginationItem, PaginationLink } from 'reactstrap';
import './style/SalePagination.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pagination from 'material-ui-pagination';

class SalePagination extends Component {
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
            this.props.handlePagination(i);
        }
    }
    render() {
        console.log(this.props);
        return (
            <div className="sales-main-pagination">
                <div className="pagination">
                    <PaginationItem disabled={this.props.isFirst} onClick={(e)=>this.handlePrevious(e,this.props.currentPage)}>
                        <PaginationLink previous />
                    </PaginationItem>
                </div>
                <MuiThemeProvider>
                    <Pagination
                        total = { this.props.totalPages }
                        current = { this.props.currentPage+1 }
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

export default SalePagination;