import React from 'react';

const ReviewItems = ({cart,removeProducts}) => {
   let {name,price,quantity,key} = cart
    return (
        <div>
            <h3>{name}</h3>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <button className="button" onClick={() => removeProducts(key)}>Remove</button>
        </div>
    );
};

export default ReviewItems;