import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({product,addCartHandler,showAddToCart}) => {


    const { img, name, seller, price, stock,key } = product;
    return (
        <div className="single-product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <p className="name"><Link to={`/product/${key}`}>{name}</Link></p>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {showAddToCart && <button 
                    className="button" 
                    onClick={() => addCartHandler(product)}
                >
                    <span style={{paddingRight: '10px'}}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </span>
                    add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;