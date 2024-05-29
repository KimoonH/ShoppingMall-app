import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'
import { productAction } from '../redux/actions/productAction';
import { fetchDetailProducts } from '../redux/reducers/productSlice';

const ProductDetail = () => {
    const [btnActive, setBtnActive] = useState(null);
    const toggle = (event) => {
        console.log("toggle", event.target.value)
        setBtnActive(event.target.value);
        console.log("btnActive", btnActive);
        return event.target.value;
    }

    let { id } = useParams(); // parameter로 넘겨준 id값을 알 수 있음.
    // const[product, setProduct] = useState(null); // 여기에 api로부터 받아온 data 저장해둘거야.

    // @@@ redux @@@
    const product = useSelector((state) => state.product.selectedItem);
    const dispatch = useDispatch();

    const getProductDetail = async () => {
        // let url = `https://my-json-server.typicode.com/Gogumi33/React-h-m-shopping/products/${id}`;
        // let response = await fetch(url);
        // let data = await response.json();
        // console.log(data);
        //setProduct(data);

        // dispatch(productAction.getProductDetail(id)); // 더 간단히 변경
        dispatch(fetchDetailProducts(id));
    }
    useEffect(() => {
        getProductDetail();
    }, []);

    return (
        <Container>
            <Row>
                <Col xs={12} md={6} className="product-img">
                    <img src={product?.img} />
                </Col>
                <Col xs={12} md={6} className="product-info">
                    <div>{product?.title}</div>
                    <div>₩{product?.price}</div>
                    <div className="new-product">{product?.new == true ? "신제품" : ""}</div>

                    <Dropdown className="drop-down">
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className="drop-down">
                            사이즈 선택
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product?.size.length > 0 &&
                                product.size.map((item) => (
                                    <Dropdown.Item href="#/action-1">{item}</Dropdown.Item>
                                ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="secondary" className="add-button">
                        바로 주문하러 가기
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDetail
