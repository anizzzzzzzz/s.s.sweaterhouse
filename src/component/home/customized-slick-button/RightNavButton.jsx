import React, {Component} from 'react';

class RightNavButton extends Component {
    render() {
        return (
            <button
                type="button"
                className="slick-arrow slick-custom-arrow slick-custom-next-arrow"
                onClick={this.props.onClick}
            >
                &#8250;
            </button>
        );
    }
}

export default RightNavButton;
