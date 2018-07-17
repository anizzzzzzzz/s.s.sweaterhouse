import React, {Component} from 'react';

class LeftNavButton extends Component {
    render() {
        return (
        <button
            type="button"
            className="slick-arrow slick-custom-arrow slick-custom-prev-arrow"
            style={{display:'inline-block'}}
            onClick={this.props.onClick}
        >
            &#8249;
        </button>
        );
    }
}

export default LeftNavButton;
