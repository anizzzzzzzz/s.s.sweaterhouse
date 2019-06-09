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
                title="Add Product"
                visible={this.props.modalVisible}
                onCancel={()=>this.props.handleModalVisible(false)}
                onOk={()=>this.props.handleModalVisible(false)}
            >
                <AddProduct/>
            </Modal>
        );
    }
}

export default AddProductModal;