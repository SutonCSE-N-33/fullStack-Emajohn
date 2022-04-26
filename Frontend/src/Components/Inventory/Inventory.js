import React from 'react';

const Inventory = () => {
    const handleProduct = () => {
        const products = {};
        fetch('http://localhost:5000/addProducts',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(products)
        })
        .then(function(res){ console.log(res) })
        
    }
    return (
        <div>
            <button onClick={handleProduct}>AddProduct</button>
        </div>
    );
};

export default Inventory;