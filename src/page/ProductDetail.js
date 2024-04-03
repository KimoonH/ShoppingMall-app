import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDetail } from "../redux/reducers/productSlice";

const ProductDetail = () => {
    const product = useSelector((state) => state.product.selectedItem)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();

    const getProductDetail = () => {
        setLoading(true);
        dispatch(fetchProductsDetail(id))
        setLoading(false);
    };
    useEffect(() => {
        getProductDetail();
    }, []);
    if (loading || product == null) return <h1>Loading</h1>;
    return (
        <Container className="product-detail-card">
            {error ? (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            ) : (
                <Row>
                    <Col xs={12} md={6} className="product-detail-img">
                        <img src={product.img} />
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="product-info">{product.title}</div>
                        <div className="product-info">₩ {product.price}</div>
                        <div className="choice">
                            {product.choice ? "Conscious choice" : ""}
                        </div>
                        <Dropdown className="drop-down">
                            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                사이즈 선택
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {product?.size.length > 0 &&
                                    product.size.map((item) => (
                                        <Dropdown.Item href="#/action-1">{item}</Dropdown.Item>
                                    ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="dark" className="add-button">
                            추가
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProductDetail;
