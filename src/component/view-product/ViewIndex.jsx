import React, {Component} from 'react';
import './style/ViewIndex.css';
import {findOneByProductCode} from "../../api/ProductApi";
import {ProductNullException} from "../../exception/Exceptions";
import ReactImageMagnify from "react-image-magnify";
import NavigationBar from "../common/navbar/NavigationBar";
import {Col, Row} from "reactstrap";
import ViewLightBox from "./ViewLightBox";
import Footer from "../common/footer/Footer";

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
            selectedImage:{},
            openLightbox:false
        };

        this.closeImageLightbox = this.closeImageLightbox.bind(this);
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
                console.log("sd",result);
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

    openImageLightbox(e){
        e.preventDefault();
        this.setState({
           openLightbox:true
        });
    }

    closeImageLightbox(){
        this.setState({
            openLightbox:false
        });
    }

    selectedImageSection(){
        let image=this.state.selectedImage;
        let src = 'data:' + image.type + ';base64,' + image.image;
        return (
          <Col sm="7" md="7" xs="12" lg="7" className="view-product-image">
              <Row>
                  <Col sm="12" md="2" lg="2" xs="12" className="view-product-image-lists-col">
                      {this.imageListSection()}
                  </Col>
                  <Col sm="12" md="10" lg="10" xs="12" className="view-product-image-col">
                      <div className="view-product-image-col-div" onClick={e=>this.openImageLightbox(e)}>
                          <ReactImageMagnify imageClassName="view-product-image-small"
                                             enlargedImageClassName="view-product-image-container"
                                             enlargedImageContainerClassName="view-product-image-large"
                                             {...{
                                                 smallImage: {
                                                     alt: image.name+"."+image.extension,
                                                     isFluidWidth: true,
                                                     src: src,
                                                 },
                                                 largeImage: {
                                                     alt: image.name+"."+image.extension,
                                                     src: src,
                                                     width: 1200,
                                                     height: 1900,
                                                 },
                                                 shouldUsePositiveSpaceLens: true,
                                                 enlargedImageContainerDimensions: {
                                                     width: '100%',
                                                     height: '100%'
                                                 },
                                             }}
                          />
                      </div>
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
                                <div className="view-product-img-lists" key={img.name} onClick={(e)=>{this.handleImageSelect(e,img)}}>
                                    <img src={src} alt={img.name+"."+img.extension}/>
                                </div>
                            )
                        })
                }
            </div>
        )
    }

    handleImageSelect(e,selectedImage){
        e.preventDefault();
        this.setState({selectedImage});
    }

    sizeLists(){
        let size=this.state.size;
        if(size.length >0){
            return size.map((s)=>{
                return (s.id === size[size.length-1].id)?(<b key={s.id}>{s.size}</b>):(<b key={s.id}>{s.size+", "}</b>)
            })
        }
        else{
            return null;
        }
    }

    productInfo(){
        return (
            <Col sm="5" md="5" xs="12" lg="5" className="view-product-info">
                <div className="view-product-details">
                    <p><b>Black Woolen Jacket</b></p>
                    <p>Product : {this.state.productCode}</p>
                    <p>Size Available : {this.sizeLists()}</p>
                </div>
            </Col>
        );
    }

    render() {
        return (
            <div>
                <NavigationBar props={this.props}/>
                <div className="view-selected-product">
                    <Row className="view-product-row">
                        {this.selectedImageSection()}
                        {this.productInfo()}
                    </Row>
                    {this.state.openLightbox?
                        (
                            <ViewLightBox
                                openLightbox={this.state.openLightbox}
                                images={this.state.images}
                                currentImage={this.state.selectedImage}
                                closeLighbox={this.closeImageLightbox}
                            />
                        ):null}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ViewIndex;