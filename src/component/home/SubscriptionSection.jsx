import React, {Component} from 'react';
import * as FontAwesome from 'react-icons/lib/fa'


class SubscriptionSection extends Component {
    createSocialLink(){
        return (
          <div>
              <a><FontAwesome.FaFacebook/></a>
              <a><FontAwesome.FaInstagram/></a>
          </div>
        );
    }
    render() {
        return (
            <div className="subscription-section">
                <div className="subscription-sub-section">
                    {this.createSocialLink()}
                </div>
            </div>
        )
    }
}

export default SubscriptionSection;