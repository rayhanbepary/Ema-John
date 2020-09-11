import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total,currentPrice) => total + currentPrice.price * currentPrice.quantity,0 );

    let shipping = 12.99;
    if(totalPrice === 0){
        shipping = 0;
    }else if(totalPrice > 1000){
        shipping = 0;
    }else if(totalPrice > 400){
        shipping = 8.95;
    }
    let tax = totalPrice / 10;
    
    const formateNum = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const grandTotal = ( totalPrice + shipping + tax );
     
    return (
        <div>
            <h3>Order summery</h3>
            <p>Items ordered: {cart.length}</p>
            <p>Total Price: {formateNum(totalPrice)}</p>
            <p>Tax: {formateNum(tax)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Order Total: {formateNum(grandTotal)}</p>
            {props.children}
        </div>
    );
};

export default Cart;