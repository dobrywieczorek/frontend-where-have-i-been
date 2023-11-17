import '../css/Sidebar.css';
import { useState } from 'react';
/*
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer {XO7luuB2o9uqqvuo9Po7IMzhpx8KH7ryksFyTZkTc15c3bbd}' },
    body: JSON.stringify({ name: "kasia", email:'kasia@email.com', password:"Password123"})
};
fetch('http://localhost:8000/api/whoami', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
*/



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