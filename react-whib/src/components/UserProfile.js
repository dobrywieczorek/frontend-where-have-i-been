import { useContext, useEffect, useState } from 'react';
import '../css/UserProfile.css';
import cog from '../img/cog.svg';
import { UserContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';

function UserProfile(){
    const [userData, setUserData] = useState();
    const [myData, setMyData] = useState();
    const [idMatched, setIDMatched] = useState(false);
    const url = 'http://localhost:8000/api'

    //curly braces = destructuring
    const { token } = useContext(UserContext)

    let { profileId } = useParams()

    const requestOptions = {
        method: 'POST',
        headers: {'Authorization':'Bearer ' + token},
    };
    
    useEffect(() => {
        if(token != null){
            async function fetchMyData() {
                fetch(`${url}/whoami`, 
                {
                    method: 'POST',
                    headers: {'Authorization':'Bearer ' + token},
                })
                .then((response)=>{
                    response.json().then((data)=>{
                        console.log(data)

                        if(profileId == data.id){
                            console.log('ids match')
                            setIDMatched(true);
                            setUserData(data)
                        }else{
                            fetchUserData()
                        }
                    })
                })
            };

            async function getFriends(){
                fetch(`${url}/getuserfriends`, {
                    method: 'GET',
                    headers: {'Authorization':'Bearer ' + token }
                })
                .then((response)=>{
                    response.json().then((data)=>{
                        console.log('Friends:')
                        console.log(data)
                    })
                })
            }

            const fetchUserData = async () => {
                fetch(`${url}/getuserbyid?id=${profileId}`, 
                {
                    method: 'GET'
                })
                    .then((response)=>{
                    response.json().then((data)=>{
                        setUserData(data.users.users)
                    }).catch((err)=>console.error(err))
                })
            }

            fetchMyData();
            getFriends();
    }
    }, [token])

    return (
        userData ? <div className="UserProfile">
            {idMatched &&
            <div className='settings-dropdown'>
                <img className='settings-icon' src={cog} alt="settings cog wheel"/>
                    <ul className='settings-menu'>
                        <li>Change name</li>
                        <li>Change description</li>
                        <li>Change email</li>
                        <li>Change password</li>
                    </ul>
            </div>
            }
            
            <div className="topContainer">
                <div className="profile-bg"></div>
                <div className="profile-img"><img></img></div>
            </div>
            <div className='bottomContainer'>
                <div className="nameHolder">
                    <h1 className="profile-name">{userData && userData.name}</h1>
                    {/* !idMatched && !userData.friends.includes(profileId) &&
                    <button className="addFriend-btn" role="button"><span className="text">{}Add Friend</span></button>
                    */}
                </div>
                <span className="profile-date">Joined: {userData && userData.created_at}</span>
                <p className="profile-description">{userData && userData.description}</p>
                {/*<section>
                    <h2>Favorite Categories</h2>
                    <p>{userData && userData.categories.map((cat) => {
                        console.log(cat.id);
                        return (
                            <span key={cat.id}><a href="#">{cat.description}</a> </span>
                        )
                    })}</p>
                </section>
                <section>
                    <h2>Pins</h2>
                    <p>{userData && userData.pins.map((pin) => {
                        return (
                            <span key={pin.id}><a href="#">{pin.description}</a> </span>
                        )
                    })}</p>
                </section>
                */}
            </div>
        </div>
        : <div>User not found</div>
    );
}

export default UserProfile