import React, {Component} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style/ProductMainPagination.css';


class ProductMainPagination extends Component {
    constructor(props){
        super(props);

        console.log(this.props);
    }

    createPagination(){

        for(let i=0; i<=this.props.totalPages; i++){
             (
                <PaginationItem>
                    <PaginationLink href="#">
                        {i+1}
                    </PaginationLink>
                </PaginationItem>
            )
        }
    }
    /*render() {
        return (
                <Pagination className="products-main-pagination" aria-label="Page navigation example">
                    <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink href="#">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            4
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            5
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>
                </Pagination>
        )
    }*/

    render() {
        return (
            <Pagination className="products-main-pagination" aria-label="Page navigation example">
                {this.createPagination()}
            </Pagination>
        )
    }
}

export default ProductMainPagination;