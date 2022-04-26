import React, { useState,useEffect } from 'react';  
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';


const Shop = () => {
  const [products,setProduct] = useState([]);
  const [cart,setCart] = useState([]);
 console.log(cart);
  useEffect(()=>{
      fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
          setProduct(data);
      })
  },[])
 
  useEffect(()=>{
        const savedCart = getStoredCart();
        const storeProductKeys = Object.keys(savedCart);
        
            fetch('http://localhost:5000/productsByKeys',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify(storeProductKeys)
             })
             .then(res => res.json())
             .then(data => {
                 const cartData = storeProductKeys.map(key => {
                     const cartProducts = data.find(product => product.key === key)
                     cartProducts.quantity = savedCart[key];
                      return cartProducts;
                 })
                 setCart(cartData);
             })
       
        
  },[]);

  const handleProduct = gainProduct =>{
    
    const sameProduct = cart.find(pd => pd.key === gainProduct.key);
    let count = 1;
    let newCart;
    if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== gainProduct.Key);
        newCart = [...others,sameProduct];
    }else{
        gainProduct.quantity = 1;
        newCart = [...cart,gainProduct];
    }
      setCart(newCart);
      addToDb(gainProduct.key,count);
  }

    return (
        <div className='tween-container'>
            <div className="product-container">
            
                {
                    products.map(product => <Product
                        key = {product.key}
                        showAddToCart={true}
                        handleProduct={handleProduct}
                         product={product}>
                         </Product>)
                }
            
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
               <Link to="/review">
               <button className='mainButton'>Review Order</button>
            </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;