import React, {Component} from 'react';
import './style/ShowSelectedImages.css';
import selectIcon from '../../../images/Check_icon.svg.png';

class ShowSelectedImages extends Component {
    onSelect(event, name){
        event.preventDefault();

        this.props.handleSelectImage(name);
    }

    createImagesList(){
        return this.props.images.map((image,id)=>
            (
                <div className={this.props.selectedImage===image.name?"image-item-selector-div selected-image":"image-item-selector-div"}
                     key={image.name}>
                    <img src={URL.createObjectURL(image)}
                         alt={image.name}
                         className="selected-images-candid"
                         onClick={(e)=>this.onSelect(e,image.name)}
                    />
                    <img src={selectIcon} alt="selected" className={this.props.selectedImage===image.name?"select-icon":"hide-icon"}/>
                </div>
            )
        );
    }

    render() {
        return (
            <div className="select-image-parent-div">
                <p>Select an image to highlight.</p>
                <div className="image-child-div">
                    {this.createImagesList()}
                </div>
            </div>
        )
    }
}

export default ShowSelectedImages;