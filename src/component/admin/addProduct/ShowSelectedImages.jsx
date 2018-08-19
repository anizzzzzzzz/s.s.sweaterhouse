import React, {Component} from 'react';

class ShowSelectedImages extends Component {
    createImagesList(){
        return this.props.images.map((image,id)=>(
                <div key={id}>
                    {console.log(new FileReader().readAsArrayBuffer(image))}
                </div>
            )
        )
    }

    render() {
        console.log(this.props.images);
        return (
            <div>
                {this.createImagesList()}
            </div>
        )
    }
}

export default ShowSelectedImages;