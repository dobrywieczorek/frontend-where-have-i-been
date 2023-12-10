import { useContext, useEffect, useState } from 'react';
import '../css/UserProfile.css';
import cog from '../img/cog.svg';
import { UserContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';

function UserProfile(){
    const [userData, setUserData] = useState();
    const [myData, setMyData] = useState();
    const [idMatched, setIDMatched] = useState(false);
    const [friends, setFriends] = useState(null);
    const [isFriend, setisFriend] = useState(true)

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
                        //console.log(data.friends[0].friend_with_user_id)
                        setFriends(data.friends)

                        setisFriend(checkIfFriends(data.friends, profileId))
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

    function addFriend(){
        fetch(`${url}/addfriend/?friend_id=${profileId}`, {
            method: 'POST',
            headers: 
            {
                'Authorization':'Bearer ' + token,
            },
        }).then((response)=>{
            response.json().then((data)=>{
                console.log('Friend added:')
                console.log(data)
                setisFriend(true);
            }).catch((err)=>console.log(err))
        })
    }

    function deleteFriend(){
        fetch(`${url}/deletefriend/?friend_id=${profileId}`, {
            method: 'POST',
            headers: 
            {
                'Authorization':'Bearer ' + token,
            },
        }).then((response)=>{
            response.json().then((data)=>{
                console.log('Friend removed:')
                console.log(data)
                setisFriend(false);
            }).catch((err)=>console.log(err))
        })
    }

    function checkIfFriends(friendList, id){

        let friendFound = false;

        friendList.forEach(friend => {
            if(friend.friend_with_user_id == id){
                console.log('found friend')
                friendFound = true;
                return;
            }
            
        }); 
        console.log('friend not found')
        return friendFound;
    }

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
                    { (!idMatched && !isFriend) &&
                    <button className="addFriend-btn" role="button" onClick={addFriend}><span className="text">Add Friend</span></button>
                    }
                    { (!idMatched && isFriend) &&
                    <button className='deleteFriend-btn' role='button' onClick={deleteFriend}> Remove Friend </button>
                    }
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