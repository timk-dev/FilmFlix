import style from '../../Components/style.module.css';

import logo from '../../Images/logo.webp';
import profile from '../../Images/profile.webp';

import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => { 
    return (

        <header>
            <nav>
                <div>
                    <Link aria-label="Go to the home page." exact="true" to="/">
                        <img className={style.logo} loading='lazy' src={logo} width='175px' height='50px' alt='Filmflix logo'>
                        </img>
                    </Link>
                </div>

                <div> 
                    <ul>
                        <li>
                            <Link aria-label="Go to the search page." exact="true" to="/search">
                                <p>Search</p>
                            </Link>
                        </li> 

                        <li className={style.lang}>
                            <select name="lang" id="lang">
                                <option value="en"><p>English</p></option>
                            </select>
                        </li>

                        <li>
                            <Link aria-label="Go to the home page." exact="true" to="/user">
                                <img loading='lazy' src={profile} width='25px' height='25px' alt='Filmflix logo'>
                                </img>
                            </Link>
                        </li>
                    </ul>          
                </div>
            </nav>
        </header>
    );
}

export default Navbar;