import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'
import orderPic from '../../images/orderPic.png';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';


const Shipment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const onSubmit = data => {
        // console.log("form submitted", data);
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();

        // new 6
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('Yourder order placed successfully');
                }
            })
    };

    // let thankyou;
    // if (orderPlaced) {
    //     thankyou = <img src={orderPic} alt="" />
    // }

    return (
        <div>
            {
                <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        name="name"
                        defaultValue={loggedInUser.name}
                        placeholder="Your Name"
                        type="text"
                        {...register("name", { required: true })}

                    />
                    {errors.name && <p className='error'>This is required</p>}

                    <input
                        name="email"
                        defaultValue={loggedInUser.email}
                        placeholder="Your Email"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className='error'>This is required</p>}

                    <input
                        name="address"
                        placeholder="Your Address"
                        type="address"
                        {...register("address", { required: true })}
                    />
                    {errors.address && <p className='error'>This is required</p>}

                    <input
                        name="phone"
                        placeholder="Your Phone Number"
                        type="tel"
                        {...register("phone", { required: true })}
                    />
                    {errors.phone && <p className='error'>This is required</p>}

                    <input type="submit" />
                </form>
            }
        </div>
    );
};

export default Shipment;