import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import '../css/SearchControl.css'
import MapSearchControl from './MapSearchControl';

import iconUrl from '../../node_modules/leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from '../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from '../../node_modules/leaflet/dist/images/marker-shadow.png';

const MapView = () => {
    const [thisMap, setThisMap] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false);
    const [pins, setPins] = useState([]);
    const [userId, setUserId] = useState(0);
    const token = localStorage.getItem("access_token");
    const markersRef = useRef({});
    const handlePinSelect = (pin) => {
        if (thisMap) {
            thisMap.flyTo([pin.latitude, pin.longitude], 15);
        }
    };

    useEffect(() => {
        if (!mapInitialized) {
            const map = L.map('mapContainer').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);

            setThisMap(map);

            fetchMapPins(map);

            if (token) {
                map.on('click', (e) => {
                    const { lat, lng } = e.latlng;
                    setNewPinData({ ...newPinData, latitude: lat, longitude: lng });
                });
            }
            setMapInitialized(true);
        }
    }, [token]);

    const fetchMapPins = async (startedMap) => {
        try {
            const res = await fetch('http://localhost:8000/api/map-pins', {
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

    const renderPins = (fetchedPins, startedMap) => {
        fetchedPins.forEach(pin => addMarker(pin, startedMap));
    };

    useEffect(() => {
        const getUserId = async () => {
            try {
                const token = localStorage.getItem("access_token");

                if (!token) {
                    console.error("Brak access_token. Użytkownik nie jest zalogowany.");
                    return;
                }

                const res = await fetch("http://localhost:8000/api/whoami", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const user = await res.json();
                const id = user.id;

                setUserId(id);
            } catch (error) {
                console.error("Błąd podczas uzyskiwania identyfikatora użytkownika", error);
            }
        };

        getUserId();
    }, []);

    const [newPinData, setNewPinData] = useState({
        pin_name: '',
        description: '',
        favourite: false,
        latitude: 0,
        longitude: 0,
        user_id: 0,
        category: '',
    });

    useEffect(() => {
        setNewPinData({ ...newPinData, user_id: userId });
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewPinData({ ...newPinData, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPin();
        setNewPinData({ pin_name: '', description: '', category: '', latitude: 0, longitude: 0, favourite: false });
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
                <button onclick="window.deletePin(${pin.id})">Usuń pinezkę</button>`);

        markersRef.current[pin.id] = marker;
    };

    window.deletePin = async (pinId) => {
        try {
            const res = await fetch(`http://localhost:8000/api/map-pins/${pinId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            setPins(pins.filter(pin => pin.id !== pinId));
            removeMarker(pinId);
        } catch (error) {
            console.error('Error deleting pin', error);
        }
    };

    const removeMarker = (pinId) => {
        thisMap.removeLayer(markersRef.current[pinId]);
        delete markersRef.current[pinId];
    };

    const addPin = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/map-pins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPinData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            let json = await res.json();
            const pinToAdd = json.map_pin;
            setPins([...pins, pinToAdd]);
            addMarker(pinToAdd, thisMap);
        } catch (error) {
            console.error('Error adding pin', error);
        }
    };

    return (
        <div>
            <div id="mapContainer" style={{ height: '600px', width: '100%' }}></div>
            {thisMap && <MapSearchControl map={thisMap} pins={pins} onPinSelect={handlePinSelect} />}
            {newPinData.latitude != 0 && <div className="pin-form">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="pin_name" value={newPinData.pin_name} onChange={handleChange} placeholder="Nazwa" />
                    <textarea name="description" value={newPinData.description} onChange={handleChange} placeholder="Opis"></textarea>
                    <p>Kategoria</p>
                    <select name="category" value={newPinData.category} onChange={handleChange}>
                    <option value="widok">Widok</option>
                    <option value="sklep">Sklep</option>
                    <option value="zabawa">Zabawa</option>
                    <option value="wakacje">Wakacje</option>
                    <option value="inne">inne</option>
                    </select>
                    <div className="favourite-checkbox">
                        <label htmlFor="favourite">Ulubione</label>
                        <input
                            type="checkbox"
                            id="favourite"
                            name="favourite"
                            checked={newPinData.favourite}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="location-display">
                        <label>Lokalizacja:</label>
                        <span>{newPinData.latitude.toFixed(3)}, {newPinData.longitude.toFixed(3)}</span>
                    </div>

                    <button type="submit" className="submit-btn">Dodaj Pinezkę</button>
                </form>
            </div>}
        </div>
    );
};

export default MapView;
