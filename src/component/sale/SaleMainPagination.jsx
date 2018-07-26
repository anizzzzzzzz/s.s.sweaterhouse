import React, {Component} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style/SaleMainPagination.css';


class SaleMainPagination extends Component {
    render() {
        return (
                <Pagination className="sales-main-pagination" aria-label="Page navigation example">
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
    }
}

export default SaleMainPagination;