import { useContext, useState, useEffect } from "react";
import { UserContext } from "./AuthContext";

function FriendList(){
    const [friends, setFriends] = useState(null)

    var url = 'http://localhost:8000/api'

    const requestOptions = {
        method: 'GET',
        headers: {'Authorization':'Bearer ' + useContext(UserContext)},
    };

    useEffect(()=>{
        const fetchFriendList = async () => {
            const response = await fetch(`${url}/getuserfriends`, requestOptions);
            console.log(response);
            const data = await response.json().catch((err) => console.log(err));
            console.log(data);
            setFriends(data);
        };
        fetchFriendList();
    }, []);

    return(
        <div className="FriendList">
            {friends && 'aaa'}
        </div>
    )
}

export default FriendList;