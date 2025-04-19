import style from '../../Components/style.module.css';

import logo from '../../Images/logo.webp';
import profile from '../../Images/profile.webp';

import { Link } from "react-router-dom";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";


const Footer = () => { 
    return (

        <footer>
            <div>
                <p>Questions? Call <u>1-800-444-5555</u></p>
            </div>

            <article>
                <ul>
                    <li>
                        <HashLink aria-label="Go to the FAQ section." exact="true" smooth to="/#FAQ">
                            <p>FAQ</p>
                        </HashLink>
                    </li>

                    <li>
                        <Link aria-label="Go to the search page." exact="true" to="/search">
                            <p>Search</p>
                        </Link>
                    </li> 
                </ul>
            </article>

            <p>
                FilmFlix is not affiliated with Netflix or any other streaming service or film studio.
                <br></br>
                Made by <Link aria-label="Go to my portfolio website." exact="true" to="https://timothyfrontend.vercel.app/">Timothy S.-Mitchell</Link>.
            </p>

            <select name="lang" id="lang">
                <option value="en"><p>English</p></option>
            </select>        
        </footer>
    );
}

export default Footer;