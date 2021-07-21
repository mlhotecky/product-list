import React, {useState} from "react";
import {Col, Row} from "react-flexbox-grid";
import FeatureItem from "./FeatureItem";
import UpdateProductForm from "../forms/UpdateProductForm";
import {useSelector} from "react-redux";
import {localeCurrency, PENDING, UPDATE_PRODUCT} from "../constants";

export default function ProductItem(props) {

    const {img, name, description, features, price, ...item} = props?.item || {};
    const [submit, setSubmit] = useState(false);
    const productStatus = useSelector(state => state.products.productStatus);

    const {status, type} = productStatus || {};

    const handleUpdateProduct = () => {
        setSubmit(!submit);
    }

    return (
        <Col xs={12} sm={12} md={6} className="product-container">
            <Row className="product-card">
                <Col className="product-image" xs={3} sm={3} md={3}>
                    <img src={img} alt="Product"/>
                </Col>
                <Col className="product-info" xs={9} sm={9} md={9}>
                    <Row>
                        <Col md={12}>
                            <h3>{name}</h3>
                        </Col>
                        <Col md={12}>
                            <p>{description}</p>
                        </Col>
                        {
                            features?.length > 0 && features.sort().map((feature, index) =>
                                <FeatureItem key={index} feature={feature}/>)
                        }
                    </Row>
                    <Row>
                        <Col md={12}>
                            <UpdateProductForm
                                submit={submit}
                                item={item}
                            />
                        </Col>
                        <Col md={12} className="product-price">
                            <div>{localeCurrency(price)}</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="product-actions">
                <button
                    type="button"
                    className="product-button"
                    onClick={handleUpdateProduct}
                    disabled={type === UPDATE_PRODUCT && status === PENDING}>
                    Update now
                </button>
            </div>
        </Col>
    )

}