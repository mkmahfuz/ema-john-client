import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState({});

    useEffect(()=>{
        const url = `http://localhost:5000/product/${productKey}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data[0]); // or we can set the server side res.send(docs[0])
        })

    },[productKey])
   // const product = fakeData.find(pd => pd.key === productKey);
    
    return (
        <div>
            <h1>Your Product Details.</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;