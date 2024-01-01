import '../css/Sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import homeIcon from '../img/home-128.png';
import mapIcon from '../img/map-128.png';
import profileIcon from '../img/profile-128.png';
import { UserContext } from '../contexts/AuthContext';

function Sidebar(){
    const {token, setToken} = useContext(UserContext)
    const [isActive, setActive] = useState(false)
    const navigate = useNavigate()

    function toggleOpen(){
        setActive(!isActive)
    }

    useEffect(()=>{

    }, [token])

    function logout(){
        setToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        navigate("/home");
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
                {token != null ? 
                <>
                <NavLink className='navlink' title='Profile' to="/profile/myprofile"><img src={profileIcon} /></NavLink> 
                <button onClick={logout}>Logout</button>
                </>
                : <NavLink className='navlink' title='Log into your account' to="/login">Log in</NavLink>
                }
            </div>         
            </div>   
        </div>
    )
}
export default Sidebar