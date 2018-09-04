import React, {Component} from 'react';
import './style/ViewIndex.css';
import {findOneByProductCode} from "../../api/ImageApi";
import {ProductNullException} from "../../exception/Exceptions";
import ReactImageMagnify from "react-image-magnify";
import NavigationBar from "../common/navbar/NavigationBar";
import {Col, Row} from "reactstrap";

class ViewIndex extends Component {
    constructor(props){
        super(props);

        const parseQueryString = require('query-string');
        let queryParams = parseQueryString.parse(this.props.location.search);

        this.state={
            images:[],
            price:0.0,
            productCode:queryParams.code,
            size:[],
            type:'',
            selectedImage:{}
        };
    }

    componentWillMount(){
        findOneByProductCode(this.state.productCode)
            .then(response=>{
                if(response.status ===200) {
                    return response.json();
                }
                else{
                    throw new ProductNullException();
                }
            })
            .then(result=>{
                this.setState({
                    images : result.productResponse.images,
                    type : result.productResponse.type,
                    price : result.productResponse.price,
                    size : result.productResponse.size,
                    selectedImage : result.productResponse.images.filter(img=>img.highlighted === true)[0]
                });
            })
            .catch(ex=>{
                if(ex instanceof ProductNullException){
                    alert("No such product");
                    window.location="/";
                }
            })
    }

    selectedImageSection(){
        let image=this.state.selectedImage;
        let src = 'data:' + image.type + ';base64,' + image.image;
        return (
          <Col sm="6" md="6" xs="12" lg="6" className="view-product-image">
              <Row>
                  <Col sm="2" md="2" lg="2">
                      {this.imageListSection()}
                  </Col>
                  <Col sm="10" md="10" lg="10">
                      <ReactImageMagnify className="view-product-image-root"
                                         imageClassName="view-product-image-small"
                                         enlargedImageClassName="view-product-image-large"
                                         enlargedImageContainerClassName="view-product-image-container"
                                         {...{
                                             smallImage: {
                                                 alt: image.name+"."+image.extension,
                                                 isFluidWidth: true,
                                                 src: src,
                                             },
                                             largeImage: {
                                                 src: src,
                                                 width: 1000,
                                                 height: 1000
                                             },
                                             shouldUsePositiveSpaceLens: true,
                                             enlargedImageContainerDimensions: {
                                                 width: '100%',
                                                 height: '100%'
                                             },
                                         }}
                      />
                  </Col>
              </Row>



          </Col>
        );
    }

    imageListSection(){
        return (
            <div className="view-product-image-lists">
                {
                    this.state.images.filter(img=>img.name!==this.state.selectedImage.name)
                        .map(img=>{
                            let src = 'data:' + img.type + ';base64,' + img.image;
                            return (
                                <div className="view-product-img-lists" key={img.name}>
                                    <img src={src} alt={img.name+"."+img.extension}/>
                                </div>
                            )
                        })
                }
            </div>
        )
    }

    productInfo(){
        return (
            <Col sm="6" md="6" xs="12" lg="6" className="view-product-info">
                Product : {this.state.productCode}
            </Col>
        );
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="view-selected-product">
                    <Row className="view-product-row">
                        {this.selectedImageSection()}
                        {this.productInfo()}
                    </Row>
                </div>
            </div>
        )
    }
}

export default ViewIndex;