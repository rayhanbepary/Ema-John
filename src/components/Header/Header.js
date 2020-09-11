import React, { useContext } from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.png';
import { userContext } from '../../App';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <div className="header">
            <img src={logo} alt="ema john"/>
            <nav>
              <Link to="/shop/">Shop</Link>
              <Link to="/review/">Order Review</Link>
              <Link to="/manage/">Manage Inventory</Link> 
              <button onClick={() => setLoggedInUser({})}>Sign out</button> 
            </nav>
        </div>
    );
};

export default Header;