import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Product = (props) => {

   
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className='product'>
            <div >
            <img src={img}  alt="" srcset="" />
            </div>
            <div className='product-details'>
            <h4 className='product-name'><Link to={`/product/`+key}>{name}</Link></h4>
            <b/>
            <p><small>by: {seller}</small></p>
            <p><small>Price: {price}</small></p>
            <p><small>Only {stock} left in Stock - Order Soon</small></p>
           {
               props.showAddToCart &&  <button className='mainButton' onClick={() =>props.handleProduct(props.product)}>
               <FontAwesomeIcon className='cart' icon={faCartShopping} />
               Add to Cart</button>
           }
            </div>
        </div>
        
    );
};

export default Product;