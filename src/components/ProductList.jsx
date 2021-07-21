import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../redux/actions/products";
import ContentWrapper from "./ContentWrapper";
import {GET_PRODUCTS, NO_DATA} from "../constants";
import ProductItem from "./ProductItem";
import {Grid, Row} from "react-flexbox-grid";

export default function ProductList() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.products.productList);
    const productStatus = useSelector(state => state.products.productStatus);

    const fetchData = () => {
        dispatch(getAllProducts());
    }


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(productList)

    return (
            <ContentWrapper statusObject={productStatus} forType={GET_PRODUCTS}>
                <Grid>
                    <Row>
                        {
                            productList?.length > 0 ?
                                productList.sort(function(a, b) {return a.id - b.id}).map(item => <ProductItem key={item.id} item={item}/>)
                                : <p>{NO_DATA}</p>
                        }
                    </Row>
                </Grid>
            </ContentWrapper>
    )
}