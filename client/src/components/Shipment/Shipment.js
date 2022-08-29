import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'
import orderPic from '../../images/orderPic.png';
import { processOrder } from '../../utilities/databaseManager';


const Shipment = () => {
    const { register, handleSubmit, defaultValue, watch, formState: { errors } } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const onSubmit = data => {
        console.log("form submitted", data)
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    };

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={orderPic} alt="" />
    }

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div>
            {
                orderPlaced
                    ? thankyou
                    : <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
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