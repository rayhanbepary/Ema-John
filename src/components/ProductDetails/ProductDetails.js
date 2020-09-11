import React from 'react';
import {useParams} from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
const ProductDetails = () => {

    const {productKey} = useParams();
    console.log(productKey);

    const data = fakeData.find(product => product.key === productKey); 

    return (
        <div>
            <Product showAddToCart={false} product={data}/>
        </div>
    );
};

export default ProductDetails;