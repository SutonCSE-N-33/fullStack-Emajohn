import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fakeData from '../../fakeData';
import { clearTheCart, deleteFromDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import image from '../../images/giphy.gif';



const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useNavigate();
    console.log(cart)
   useEffect(()=>{
     const savedCart = getStoredCart();
     const productKeys = Object.keys(savedCart);
     
     fetch('http://localhost:5000/productsByKeys',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(productKeys)
     })
     .then(res => res.json())
     .then(data => {
        const cartData = productKeys.map(key => {
            const cartProducts = data.find(product => product.key === key)
            cartProducts.quantity = savedCart[key];
             return cartProducts;
        })
        setCart(cartData);
     })
   },[]);

   const removeHandleProduct = key => {
      const removeProduct = cart.filter(pd => pd.key !== key);
      setCart(removeProduct);
      deleteFromDb(key);
   }

   const handleCheckOut = () =>{
         history('/shipment');
   }

   let thankyou;
   if(orderPlaced){
           thankyou = <img src={image} alt="" />
   }
   

    return (
       
        <div className='tween-container'>
             <div className="product-container">
            
             {
                 cart.map(pd => <ReviewItem 
                    key={pd.key} removeHandleProduct={removeHandleProduct} 
                    product={pd}>
                    </ReviewItem>)
             }
             {
                 thankyou
             }
             </div>
             <div className="cart-container">
                     <Cart cart={cart}>
                     <button onClick={handleCheckOut} className='mainButton'>Proceed CheckOut</button>
                  
                     </Cart>
             </div>
        </div>
    );
};

export default Review;