import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import IndexCorausel from "./IndexCarousel";
import CategoriesCard from "./CategoriesCard";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "../common/footer/Footer";
import SubscriptionSection from "./SubscriptionSection";

class HomeIndex extends Component {
    render() {
        return (
            <div>
                <NavigationBar props={this.props}/>
                <IndexCorausel/>
                <CategoriesCard/>
                <FeaturedProducts/>
                <SubscriptionSection/>
                <Footer/>
            </div>
        )
    }
}

export default HomeIndex;