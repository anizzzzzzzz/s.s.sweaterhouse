import React, {Component} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import './style/ProductPagination.css';
import bindActionCreators from "redux/src/bindActionCreators";
import {trackingPagination} from "../../action/PaginationAction";
import {connect} from "react-redux";


class ProductMainPagination extends Component {
    handleClick(event,i){
        event.preventDefault();
        this.props.trackingPagination(i);
    }

    handleNext(event,i){
        event.preventDefault();
        if((i+1)<this.props.totalPages){
            this.props.trackingPagination(i+1);
        }
    }

    handlePrevious(event,i){
        event.preventDefault();
        if((i-1)>=0){
            this.props.trackingPagination(i-1);
        }
    }

    createPagination(){
        let page=[];

        for(let i=0; i<this.props.totalPages; i++){
            if(i === this.props.currentPage){
                page.push(
                    <PaginationItem key={i} onClick={(e)=>this.handleClick(e,i)} active>
                        <PaginationLink>
                            {i+1}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
            else {
                page.push(
                    <PaginationItem key={i} onClick={(e) => this.handleClick(e, i)}>
                        <PaginationLink>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        return page.map((pa)=>pa);
    }

    render() {
        return (
            <Pagination className="products-main-pagination">
                <PaginationItem disabled={this.props.isFirst} onClick={(e)=>this.handlePrevious(e,this.props.currentPage)}>
                    <PaginationLink previous />
                </PaginationItem>
                {this.createPagination()}
                <PaginationItem disabled={this.props.isLast} onClick={(e)=>this.handleNext(e,this.props.currentPage)}>
                    <PaginationLink next disabled={this.props.isLast}/>
                </PaginationItem>
            </Pagination>
        )
    }
}

const mapDispatchToAction=(dispatch)=>{
    return bindActionCreators({
        trackingPagination:trackingPagination
    },dispatch)
};

export default connect(null,mapDispatchToAction)(ProductMainPagination);