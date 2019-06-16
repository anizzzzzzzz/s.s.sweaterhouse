import React, {Component} from 'react';
import './style/ShowSelectedImages.css';
import selectIcon from '../../../images/Check_icon.svg.png';
import API_DICT from "../../../config/appConfig";
import {Icon} from "antd";

class ShowSelectedImages extends Component {
    onSelect(event, name){
        event.preventDefault();

        this.props.handleSelectImage(name);
    }

    createImagesList(){
        return this.props.images.filter(image => !this.props.deletedImagesId.includes(image.id))
            .map((image,id)=> {
            return (
                <div
                    className={this.props.selectedImage === image.name ? "image-item-selector-div selected-image" : "image-item-selector-div"}
                    key={image.name + '_' +id}>
                    <img
                        src={image.id === undefined ? URL.createObjectURL(image) : API_DICT.IMAGE_API + '/' + image.location}
                        alt={image.name}
                        className="selected-images-candid"
                        onClick={(e) => this.onSelect(e, image.name)}
                    />
                    <div className="delete-icon" style={image.id===undefined?{display:'none'}:{display:'inline-block'}}>
                        <Icon type="delete" onClick={() => this.props.handleDeleteImage(image.id)}/>
                    </div>
                    <img src={selectIcon} alt="selected"
                         className={this.props.selectedImage === image.name ? "select-icon" : "hide-icon"}/>
                </div>
            )
        });
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