import React, {Component} from 'react';
import Lightbox from "react-images";
import './style/ViewLightBox.css';
import API_DICT from "../../config/appConfig";

class ViewLightBox extends Component {
    constructor(){
        super();

        this.state={
            index:0
        };
    }

    componentWillMount(){
        this.setState({
            index:this.getIndex()
        });
    }

    createImageList(){
        let imgs=[];
        this.props.images.forEach(image=>{
            // imgs.push({src:'data:' + image.type + ';base64,' + image.image});
            imgs.push({src:API_DICT.IMAGE_API + '/' + image.location});
        });
        return imgs;
    }

    closeLightbox(){
        this.props.closeLighbox();
    }

    getIndex(){
        let ind=0;
        this.props.images.forEach((image,index)=>{
            if(image.name === this.props.currentImage.name){
                ind=index
            }
        });

        return ind;
    }


    handlePrevious(){
        this.setState({
            index:this.state.index-1
        });
    }

    handleNext(){
        this.setState({
            index:this.state.index+1
        });
    }

    render() {
        console.log(this.state);
        this.getIndex();
        return (
            <Lightbox
                images={this.createImageList()}
                currentImage={this.state.index}
                onClickPrev={this.handlePrevious.bind(this)}
                onClickNext={this.handleNext.bind(this)}
                backdropClosesModal={true}
                isOpen={this.props.openLightbox}
                onClose={this.closeLightbox.bind(this)}
                showThumbnails={true}
                showImageCount={false}
            />
        )
    }
}

export default ViewLightBox;