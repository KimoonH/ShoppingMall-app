import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { productAction } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reducers/productSlice";


const ProductAll = () => {
    let products = useSelector(state => state.product.products)
    const [query, setQuery] = useSearchParams();
    let [error, setError] = useState("");
    const dispatch = useDispatch();

    const getProducts = () => {
        try {
            let keyword = query.get("q") || "";
            dispatch(fetchProducts(keyword))
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getProducts();
    }, [query]);
    return (
        <Container>
            {error ? (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            ) : (
                <Row>
                    {products.length > 0 &&
                        products.map((item) => (
                            <Col md={3} sm={12} key={item.id}>
                                <ProductCard item={item} />
                            </Col>
                        ))}
                </Row>
            )}
        </Container>
    );
};

export default ProductAll;