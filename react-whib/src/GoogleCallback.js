import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

function GoogleCallback() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {

        fetch(`http://localhost:8000/api/auth/callback${location.search}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setData(data);
            });
    }, []);

    function fetchUserData() {
        fetch(`http://localhost:8000/api/user`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.access_token,
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data);
            });
    }

    if (loading) {
        return <DisplayLoading/>
    } else {
        if (user != null) {
            console.log("jest tutaj token " + user.access_token);
            return <DisplayData data={user}/>
        } else {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("token_type",  data.token_type);
            console.log("jest tutaj token " + data.access_token);
            window.location.href = 'http://localhost:3000';
            return (
                <div>
                    <DisplayData data={data}/>
                </div>
            );
        }
    }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}

function DisplayData(data) {
    return (
        <div>
            <samp>{JSON.stringify(data, null, 2)}</samp>
        </div>
    );
}

export default GoogleCallback;