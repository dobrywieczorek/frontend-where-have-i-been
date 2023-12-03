import '../css/Sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import homeIcon from '../img/home-128.png';
import mapIcon from '../img/map-128.png';
import profileIcon from '../img/profile-128.png';
import { UserContext } from './AuthContext';

function Sidebar(){
    //var access_token = localStorage.getItem('access_token');
    var access_token = useContext(UserContext);

    const [isActive, setActive] = useState(false)

    function toggleOpen(){
        setActive(!isActive)
    }

    return(
        <div className={`Sidebar ${isActive ? 'open' : ''} `}>
            <div id="hamburger" className={isActive ? 'open' : null} onClick={toggleOpen}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div>
            <div id='sidebar-menu' className={isActive ? 'menu-open' : null}>
                <NavLink className='navlink' title='Home' to="/"><img src={homeIcon} /></NavLink>
                <NavLink className='navlink' title='Map' to="/map"><img src={mapIcon} /></NavLink>
                {access_token ? 
                    <NavLink className='navlink' title='Profile' to="/profile"><img src={profileIcon} /></NavLink>
                     : <NavLink className='navlink' title='Log into your account' to="/login">Log in</NavLink>
                }
            </div>         
            </div>   
        </div>
    )
}
export default Sidebar