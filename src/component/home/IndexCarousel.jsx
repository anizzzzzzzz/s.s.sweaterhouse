import React, {Component} from 'react';
import {Carousel, CarouselControl, CarouselIndicators, CarouselItem} from "reactstrap";
import './style/IndexCarousel.css';

class IndexCorausel extends Component {
    constructor(props){
        super(props);

        this.state={
            images:[],
            activeIndex:0,
        }

        this.onExited = this.onExited.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
    }

    componentWillMount() {
        const images = this.importAll(require.context('../../images/carousel', false, /\.(png|jpe?g|svg)$/));
        console.log("images",images);
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

    onExiting(){
        this.animating=true;
    }

    onExited(){
        this.animating=false;
    }

    next(){
        if(this.animating) return;
        const nextIndex=this.state.activeIndex === this.state.images.length-1 ? 0 : this.state.activeIndex+1;
        this.setState({
            activeIndex:nextIndex
        });
    }

    previous(){
        if(this.animating) return;
        const nextIndex=this.state.activeIndex === 0 ? this.state.images.length -1: this.state.activeIndex-1;
        this.setState({
            activeIndex:nextIndex
        });
    }

    goToIndex(newIndex){
        if(this.animating) return;
        this.setState({
            activeIndex:newIndex
        });
    }


    displayCorauselItem(){
        return this.state.images.map((image)=>{
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={image.id}
                >
                    <img src={image.image} alt={image.id} className="carousel-image"/>
                </CarouselItem>
            );
        });
    }

    render() {
        const {activeIndex} = this.state;
        return (
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                    className="carousel-box"
                >
                    <CarouselIndicators items={this.state.images} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
                    {this.displayCorauselItem()}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
        )
    }
}

export default IndexCorausel;