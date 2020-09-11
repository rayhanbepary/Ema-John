import React from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import orderFun from '../../images/giphy.gif';

const Review = () => {

    const [cart,setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory();

    const proceedCheckoutHandler = () => {
        history.push('/shipment/');
    }

    const removeProducts = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey );
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKey = Object.keys(saveCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts);
    },[]);
    
    return (
        <div className="cart-container">
            
            <div className="product-container">
                {cart.map(items => <ReviewItems removeProducts={removeProducts} cart={items}></ReviewItems>)}
                { orderPlaced && <img src={orderFun} alt=""/> }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="button" onClick={proceedCheckoutHandler}>Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;