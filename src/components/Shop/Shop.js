import React, { useEffect } from 'react';
//import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    //const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    //for getting data from server 
    useEffect(() => {
        const url = 'http://localhost:5000/products';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);

            })
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        //copied from review.js mod-48-5 8min25sec
        //load data from mongo db
        const url = 'http://localhost:5000/productsByKeys';
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                setCart(data);
            })

        //old code
        // if(products.length>0){
        //     const previousCart = productKeys.map( existingKey => {
        //         const product = products.find( pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //     } )
        //     setCart(previousCart);

        // }//old code

    }, []) //dependecy products add kore dite hobe details from mod-48-4,
    //then dependency sorai felsi mod-48-5: 8min25sec

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;