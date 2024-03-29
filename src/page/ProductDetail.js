import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router"


const ProductDetail = () => {
    let { id } = useParams()
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);



    const getProductDetail = async () => {
        let url = `https://my-json-server.typicode.com/KimoonH/ShoppingMall-app/products/${id}`
        let response = await fetch(url)
        let data = await response.json();
        setProduct(data)
    }
    useEffect(() => {
        getProductDetail();
    }, [])

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    return (
        <Container>
            <Row>
                <Col className="product-img">
                    <img src={product?.img} />
                </Col>
                <Col>
                    <div className="mb-3 pro-title">{product?.title}</div>
                    <div className="mb-3">{product?.price.toLocaleString('ko-KR')}원</div>
                    <div className="mb-3">
                        {product?.size.map((size, index) => (
                            <Button
                                key={index}
                                variant={selectedSize === size ? 'dark' : 'outline-dark'}
                                className="mx-2"
                                onClick={() => handleSizeSelection(size)}
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                    <div>
                        <Button variant="dark">구매하기</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDetail
