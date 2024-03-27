import React, { useEffect, useState } from 'react'
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";

const ProductAll = () => {
    const [productList, setProductList] = useState([]);
    const getProducts = async () => {
        let url = `http://localhost:5000/products/`
        let response = await fetch(url)
        let data = await response.json();
        setProductList(data)
    };

    useEffect(() => {
        getProducts()
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    {productList.map((menu) => {
                        <ProductCard item={menu} />
                    })}

                    <Col lg={3}><ProductCard /></Col>
                    <Col lg={3}><ProductCard /></Col>
                    <Col lg={3}><ProductCard /></Col>
                </Row>
            </Container>
            <ProductCard />
        </div>
    )
}

export default ProductAll