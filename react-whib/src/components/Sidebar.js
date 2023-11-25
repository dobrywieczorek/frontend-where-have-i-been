import '../css/Sidebar.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import homeIcon from '../img/home-128.png';
import mapIcon from '../img/map-128.png';
import profileIcon from '../img/profile-128.png';

function Sidebar(){
    const [isActive, setActive] = useState(false)

    function toggleOpen(){
        setActive(!isActive)
    }

    return(
        <div className={`Sidebar ${isActive ? 'open' : ''} `}>
            <div id="nav-icon3" className={isActive ? 'open' : null} onClick={toggleOpen}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div>
            <ul id='sidebar-menu' className={isActive ? 'menu-open' : null}>
                <div><NavLink className='navlink' title='Home' to="/"><img src={homeIcon} /></NavLink></div>
                <div><NavLink className='navlink' title='Map' to="/map"><img src={mapIcon} /></NavLink></div>
                <div><NavLink className='navlink' title='Profile' to="/profile"><img src={profileIcon} /></NavLink></div>
            </ul>         
            </div>   
        </div>
    )
}
export default Sidebar