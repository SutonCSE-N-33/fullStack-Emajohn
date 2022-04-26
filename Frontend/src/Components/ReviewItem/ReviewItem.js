import React from 'react';


const ReviewItem = props => {
    const {img,name,quantity,price,key} = props.product;
    return (
        <div className='product'>
                <div className="product-container">
                <img src={img} width="200px" alt="" />
                </div>

                <div className='product-details'>
                <h3 className='product-name'>Name: {name}</h3>
                <p>Quantity: {quantity}</p>
                <p>Price: {price}</p>
                <button onClick={() => props.removeHandleProduct(key)} className='mainButton'>
                Remove
                </button>
                </div>
        </div>
    );
};

export default ReviewItem;