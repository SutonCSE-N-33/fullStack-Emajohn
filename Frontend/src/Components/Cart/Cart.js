import React from 'react';
import { Link } from 'react-router-dom';

const Cart = props => {
     const cart = props.cart;
     
     const total = cart.reduce((total,product)=>total + product.price * product.quantity || 1,0);
     let shipping = 0;
     if(total > 35){
         shipping = 0;
     }else if(total > 15){
         shipping = 4.99;
     }else if(total > 5){
         shipping = 11.55;
     }

     const tax = (total / 10);

     const grandTotal = total + shipping + tax;

     const formatNumber = num =>{
         const precision = num.toFixed(2);
         return Number(precision);
     }
     
    //  let total = 0;
    //  for(let i=0; i<cart.length; i++){
    //      const product = cart[i];
    //      total = total + product.price;
    //  }
    return (
        <div>
            <h4>Order Summary: </h4>
            <p>Items Ordered: {cart.length}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax: {formatNumber(tax)}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
              {props.children}
        </div>
    );
};

export default Cart;