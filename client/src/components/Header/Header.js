import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
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
            </nav>
        </div>
    );
};

export default Header;