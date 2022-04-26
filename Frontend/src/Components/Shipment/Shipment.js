import React,{useContext} from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import {userContext} from '../../App';
import { getStoredCart } from '../../utilities/fakedb';
const Shipment = () => {
    const { register, handleSubmit } = useForm();
    const {loggedInUser,setLoggedInUser} = useContext(userContext)

    const onSubmit = (data) =>{
        const savedCart = getStoredCart();
        const orderDetails = {...loggedInUser,product:savedCart,shipment:data,orderTime:new Date()}
        fetch('http://localhost:5000/addOrder',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(orderDetails)
        })
        .then(function(res){ console.log(res) })
        
    }
    
    return (
        <div>
            <h1>This is Shipment page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
      
      <input {...register("firstName")} placeholder="First name" type="text" /><br/>
      <input {...register("lastName")} placeholder="Last name" type="text"/><br/>
      <input {...register("address")} placeholder="address" type="text" /><br/>
      <textarea {...register("aboutYou")} placeholder="About you" />
      
      <input type="submit" />
        </form>
        </div>
    );
};

export default Shipment;