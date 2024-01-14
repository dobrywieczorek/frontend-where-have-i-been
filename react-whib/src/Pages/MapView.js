import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import './modalStyle.css';
import '../css/SearchControl.css'
import MapSearchControl from './MapSearchControl';

import PinEditModal from '../components/PinEditModal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);
    const [newPinData, setNewPinData] = useState({
        pin_name: '',
        description: '',
        favourite: false,
        latitude: 0,
        longitude: 0,
        user_id: 0,
        category: 'widok',
    });
    const [oldPin, setOldPin] = useState({
        pin_name: '',
        description: '',
        favourite: false,
        latitude: 0,
        longitude: 0,
        user_id: 0,
        category: '',
    });
    
    useEffect(() => {
        if (!mapInitialized) {
            const map = L.map('mapContainer').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);

            setThisMap(map);
            map.zoomControl.setPosition('topright');

            fetchMapPins(map);

            if (token) {
                map.on('click', (e) => {
                    const { lat, lng } = e.latlng;
                    setNewPinData(prevData => ({
                        ...prevData,
                        latitude: lat,
                        longitude: lng
                    }));
                    setFormOpen(true);
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

    useEffect(() => {
        setNewPinData({ ...newPinData, user_id: userId });
    }, [userId]);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewPinData({ ...newPinData, [name]: newValue });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if(!newPinData.pin_name || !newPinData.description) {
            toast.error("Nie podano nazwy lub opisu!");
            return ;
        }
        addPin();
        setNewPinData({ pin_name: '', description: '', category: '', latitude: 0, longitude: 0, favourite: false });
    };
    
    window.handleEdit = async (pinn) => {
        const pin = pins.find(p => p.id === pinn);
        if (pin) {
            setFormOpen(false);
            setOldPin(pin);
            setModalOpen(true);
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
                <button onclick="window.handleEdit(${pin.id})">Edytuj pinezkę</button><br>
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
            toast("Pinezka została usunięta!");
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
            toast("Pinezka została dodana!");
            setFormOpen(false);
        } catch (error) {
            console.error('Error adding pin', error);
        }
    };

    return (
        <div className="relative">
            <ToastContainer hideProgressBar theme="colored" />
            <div id="mapContainer" className="w-full h-full"></div>
            {thisMap && <MapSearchControl map={thisMap} pins={pins} onPinSelect={handlePinSelect} />}
            {isFormOpen && <div className="w-full absolute bottom-0 z-[1000] pin-form p-3 grid content-center">
                <div className="flex flex-col items-center">
                    <div className="my-1 w-1/5">
                        <h3 className="text-xl font-bold mt-1.5 ml-3 float-left">Dodawanie pinezki</h3>
                        <span className="text-zinc-400 mr-3 float-right text-3xl font-bold hover:text-black hover:cursor-pointer" onClick={() => {setFormOpen(false)}}>&times;</span>
                    </div>
                    <form onSubmit={handleAddSubmit} className="sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/4 flex flex-col items-center">
                        <input type="text" name="pin_name" className="w-3/4 my-2.5 p-2.5"
                        value={newPinData.pin_name} onChange={handleChange} placeholder="Nazwa" />
                        <textarea name="description" className="w-3/4 my-2.5 p-2.5"
                        value={newPinData.description} onChange={handleChange} placeholder="Opis"></textarea>
                        <p className="mt-2.5">Kategoria</p>
                        <select name="category"  className="w-3/4 mb-2.5 mt-1 p-2.5 items-center" value={newPinData.category}
                        onChange={handleChange}>
                            <option value="widok">Widok</option>
                            <option value="sklep">Sklep</option>
                            <option value="zabawa">Zabawa</option>
                            <option value="wakacje">Wakacje</option>
                            <option value="inne">Inne</option>
                        </select>
                        <div className="my-2.5">
                            <label htmlFor="favourite" className="mr-4">Ulubione</label>
                            <input
                                type="checkbox"
                                id="favourite"
                                name="favourite"
                                checked={newPinData.favourite}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-2.5">
                            <label>Lokalizacja: </label>
                            <span>{parseFloat(newPinData.latitude).toFixed(3)}, {parseFloat(newPinData.longitude).toFixed(3)}</span>
                        </div>

                        <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 rounded my-2.5 w-3/4">
                            Dodaj Pinezkę
                        </button>
                    </form>
                </div>
            </div>}
            <PinEditModal
                pinData={newPinData}
                availablePins={pins}
                isOpen={isModalOpen}
                isFormFilled={isFilled}
                setFilled={(filling) => setIsFilled(filling)}
                onClose={() => setModalOpen(false)}
                handleEditChange={handleChange}
                token={localStorage.getItem("access_token")}
                updatePins={(updatedPin) => setPins(pins.map(pin => pin.id === updatedPin.id ? updatedPin : pin))}
                clearCurrentPin={() => setNewPinData({ pin_name: '', description: '', category: '', latitude: 0, longitude: 0, favourite: false })}
                map={thisMap}
                createMarker={addMarker}
                deleteMarker={removeMarker}
                fillingForm={() => setNewPinData(oldPin)}
            />
        </div>
    );
};

export default MapView;
