import '../css/Sidebar.css';
import { useState } from 'react';

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
            </ul>            
        </div>
    )
}
export default Sidebar