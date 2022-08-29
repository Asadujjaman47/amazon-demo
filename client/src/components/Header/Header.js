import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log("loggedInUser: ", loggedInUser);


    return (
        <div className='header'>
            <img src={logo} alt="" />
            {/* <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Invensory</a>
            </nav> */}
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Orders Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {/* <button onClick={() => setLoggedInUser({})}>Sign out</button> */}
                {/* {
                    loggedInUser.email
                        ? <button onClick={() => setLoggedInUser({})}>Sign out</button>
                        : <button id='signIn' onClick={() => setLoggedInUser({})}><Link to="/login">Sign in</Link></button>
                } */}
                {
                    loggedInUser.email
                        ? <span className='signInout2'>
                            {loggedInUser.name}
                            <button className='signInout' onClick={() => setLoggedInUser({})}>(Sign out)</button></span>
                        : <button className='signInout' onClick={() => setLoggedInUser({})}><Link to="/login">Sign in</Link></button>
                }


            </nav>
        </div>
    );
};

export default Header;