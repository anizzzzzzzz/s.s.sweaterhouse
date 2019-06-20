import React, {Component} from 'react';
import {Modal} from "antd";
import AddProduct from "./AddProduct";
import './style/AddProductModal.css';

class AddProductModal extends Component {
    render() {
        return (
            <Modal
                width="80%"
                style={{top: 40}}
                title={this.props.productId === undefined ? "Add Product" : "Edit Product"}
                visible={this.props.modalVisible}
                onCancel={()=>
                    this.props.productId === undefined? this.props.handleModalVisible(false) :
                        this.props.handleModalVisible('', '', false)}
                onOk={()=>
                    this.props.productId === undefined ? this.props.handleModalVisible(false) :
                        this.props.handleModalVisible('' , '', false)}
            >
                <AddProduct
                    productId = {this.props.productId !== undefined ? this.props.productId : undefined}
                    productCode = {this.props.productCode !== undefined ? this.props.productCode : undefined}/>
            </Modal>
        );
    }
}

export default AddProductModal;