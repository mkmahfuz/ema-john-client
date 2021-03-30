import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = () => {
        const url = 'http://localhost:5000/addProduct';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData[0])
        })
    }

    const handleAddAllProducts = () => {
        const url = 'http://localhost:5000/addProducts';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
        .then(result=>{
            console.log(result);
        })
    }


    return (
        <div>
            <button onClick={handleAddProduct}>AddProduct</button><br />
            <button onClick={handleAddAllProducts}>Add All Products</button><br />
            

        </div>
    );
};

export default Inventory;