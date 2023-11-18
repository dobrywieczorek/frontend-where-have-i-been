import '../css/Sidebar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar(){
    const [isActive, setActive] = useState(false)

    function toggleOpen(){
        setActive(!isActive)
    }

    return(
        <div className="Sidebar">
            <div id="nav-icon3" className={isActive ? 'open' : null} onClick={toggleOpen}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li><img/>Profile</li>
                <li><img/>Map</li>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/test">Test</Link>
            </ul>            
        </div>
    )
}
export default Sidebar