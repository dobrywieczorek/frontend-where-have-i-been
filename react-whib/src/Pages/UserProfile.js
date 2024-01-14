import { useContext, useEffect, useState, useRef } from 'react';
import '../css/UserProfile.css';
import cog from '../img/cog.svg';
import { UserContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';

import L from 'leaflet';
import MapSearchControl from './MapSearchControl';
import iconUrl from '../../node_modules/leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from '../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from '../../node_modules/leaflet/dist/images/marker-shadow.png';


function UserProfile(){
    const [userData, setUserData] = useState();
    const [idMatched, setIDMatched] = useState(false);
    //const [friends, setFriends] = useState(null);
    const [isFriend, setisFriend] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userStats, setUserStats] = useState();

    const url = 'http://localhost:8000/api'

    const { token } = useContext(UserContext)
    
    var params = useParams()
    const [profileId, setProfileId] = useState(params.profileId)

    const [thisMap, setThisMap] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false);
    const [pins, setPins] = useState([]);
    const markersRef = useRef({});


        useEffect(() => {
        if(token != null){

            fetchMyData();
            
            //getUserStatistics();

            if (!mapInitialized && !loading && userData) {
                const map = L.map('mapContainer').setView([51.505, -0.09], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap contributors',
                }).addTo(map);
    
                setThisMap(map);
    
                fetchMapPins(map, profileId);
    
    
                setMapInitialized(true);
            }

    }
    }, [token, profileId, loading])
    async function fetchMyData() {
        fetch(`${url}/whoami`, 
        {
            method: 'POST',
            headers: {'Authorization':'Bearer ' + token},
        })
        .then((response)=>{
            response.json().then((data)=>{
                if(profileId == data.id || profileId == 'myprofile' || profileId == null){
                    setIDMatched(true);
                    setUserData(data);
                    setLoading(false);
                    setProfileId(data.id);
                    getUserStatistics();

                }else{
                    fetchUserData();
                    getUserStatistics();
                    checkFriendship();
                }
            })
        })
    };

    function getUserStatistics(){
        fetch(`${url}/getUserStats?user_id=${profileId}`, {
            method: 'GET'
        }).then((response)=>{
            response.json().then((data)=>{
                setUserStats(data);
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchUserData = async () => {
        fetch(`${url}/getuserbyid?id=${profileId}`, 
        {
            method: 'GET'
        })
            .then((response)=>{
            response.json().then((data)=>{
                if(!data.users.users){
                    console.log('User not found!')
                }else{
                    setUserData(data.users.users)
                }
                setLoading(false)
            }).catch((err)=>console.error(err))
        })
    }
    
    function checkFriendship(){
        fetch(`${url}/getuserfriends`, {
            method: 'GET',
            headers:
            {
                'Authorization':'Bearer ' + token
            }
        }).then((response)=>{
            
            response.json().then((data=>{
                var isFriends = data.friends.find(({friend_with_user_id})=>friend_with_user_id == profileId)
                if(!isFriends){
                    setisFriend(false)
                }else{
                    setisFriend(true)
                }
            }))
        })
    }
    function addFriend(){
        fetch(`${url}/addfriend/?friend_id=${profileId}`, {
            method: 'POST',
            headers: 
            {
                'Authorization':'Bearer ' + token,
            },
        }).then((response)=>{
            response.json().then((data)=>{
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
                setisFriend(false);
            }).catch((err)=>console.log(err))
        })
    }

//map component

const handlePinSelect = (pin) => {
    if (thisMap) {
        thisMap.flyTo([pin.latitude, pin.longitude], 15);
    }
};

    const fetchMapPins = async (startedMap) => {
        try {
            const res = await fetch(`http://localhost:8000/api/map-pins/pins/${profileId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setPins(data.map_pins);
            renderPins(data.map_pins, startedMap);
        } catch (error) {
            console.error('Error fetching pins', error);
        }
    };

    const addMarker = (pin, map) => {
        const customIcon = new L.Icon({
            iconUrl,
            iconRetinaUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl,
            shadowSize: [41, 41],
        });

        let favourite = pin.favourite ? "tak" : "nie";
        const marker = L.marker([pin.latitude, pin.longitude], { icon: customIcon })
            .addTo(map)
            .bindPopup(`<b>Nazwa: ${pin.pin_name}</b><br>
                Opis: ${pin.description}<br>
                Kategoria: ${pin.category}<br>
                Ulubiony: ${favourite}<br>
                `);

        markersRef.current[pin.id] = marker;
    };

    const renderPins = (fetchedPins, startedMap) => {
        fetchedPins.forEach(pin => addMarker(pin, startedMap));
    };
    //end of map component

    return (
        !loading ? 
            userData ? <div className="UserProfile">
                
                <div className="topContainer">
                    <div className="profile-bg"></div>
                    <div className="profile-img">
                    <svg width="130" height="130" viewBox="0 -5 27 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="13.2609" cy="7.57764" r="7.57764" fill="black"/>
                        <path d="M26.5217 30.3106C26.5217 28.5691 26.1787 26.8447 25.5123 25.2358C24.8459 23.627 23.8691 22.1651 22.6377 20.9337C21.4063 19.7023 19.9445 18.7255 18.3356 18.0591C16.7267 17.3927 15.0023 17.0497 13.2609 17.0497C11.5194 17.0497 9.79504 17.3927 8.18615 18.0591C6.57727 18.7255 5.1154 19.7023 3.88402 20.9337C2.65263 22.1651 1.67584 23.627 1.00942 25.2358C0.343002 26.8447 -1.52242e-07 28.5691 0 30.3106L13.2609 30.3106H26.5217Z" fill="black"/>
                    </svg>
                    </div>
                </div>
                <div className='bottomContainer'>
                    <div className="nameHolder">
                        <h1 className="profile-name text-3xl font-bold">{userData.name}</h1>
                        { (!idMatched && !isFriend ) &&
                        <button id='addFriend-btn' className="btn" role="button" onClick={addFriend}><span className="text">Add Friend</span></button>
                        }
                        { (!idMatched && isFriend) &&
                        <button id='deleteFriend-btn' className='btn' role='button' onClick={deleteFriend}><span className="text">Remove Friend</span></button>
                        }
                    </div>
                    <span className="profile-date">Joined: {new Date(userData.created_at).toLocaleDateString()}</span>
                    <p className="profile-description">{userData.description}</p>

                    { userStats ? 
                    <div className='userStats'>
                        <div><span>Pins: </span>{userStats.numberOfPins}</div>
                        <div><span>Friends: </span>{userStats.numberOfFriends}</div>
                        <div><span>Observers: </span>{userStats.numberOfObservers}</div>
                        <div><span>Most used Category: </span>  {userStats.mostUsedPinCategory && userStats.mostUsedPinCategory.category ? userStats.mostUsedPinCategory.category : ''}</div>
                    </div> : null}
                    
                    <div>
            <div id="mapContainer" style={{ height: '600px', width: '100%' }}></div>
            {thisMap && <MapSearchControl map={thisMap} pins={pins} onPinSelect={handlePinSelect} />}

        </div>

                </div>
            </div>
            : <div>User not found!</div>
        : <div>Loading</div>
    );
}

export default UserProfile