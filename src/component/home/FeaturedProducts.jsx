import React, {Component} from 'react';
import './style/FeaturedProducts.css';
import {Card, CardImg} from "reactstrap";
import Slider from "react-slick";
import LeftNavButton from "./customized-slick-button/LeftNavButton";
import RightNavButton from "./customized-slick-button/RightNavButton";

class FeaturedProducts extends Component {
    constructor(){
        super();

        this.state={
            images:[]
        };
    }

    componentDidMount() {
        const images = this.importAll(require.context('../../images/carousel', false, /\.(png|jpe?g|svg)$/));
        this.setState({
            images:images
        });
    }

    importAll(r) {
        let images = [];
        r.keys().forEach((item, index) => {
            let image={
                id:index,
                image:r(item),
                src:index
            };
            images.push(image);
        });
        return images;
    }

    createImagesList(){
        return this.state.images.map((image)=>{
            return (
                <Card key={image.id} className="featured-products-card">
                    <CardImg className="featured-products-card-img" top src={image.image} alt="Card image cap"/>
                </Card>
            )
        });
    }

    render() {
        var settings = {
            arrows:true,
            autoplay:true,
            prevArrow:<LeftNavButton/>,
            nextArrow:<RightNavButton/>,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="featured-products">
                <h2>Featured Products</h2>
                <Slider {...settings} className="featured-products-slider">
                    {this.createImagesList()}
                </Slider>
            </div>
        )
    }
}

export default FeaturedProducts;