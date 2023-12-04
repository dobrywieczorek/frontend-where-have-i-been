import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from '../../node_modules/leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from '../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from '../../node_modules/leaflet/dist/images/marker-shadow.png';

const MapView = () => {
	const [mapInitialized, setMapInitialized] = useState(false);

	const getPinsData = async () => {
		try {
		const access_token = localStorage.getItem('access_token');
		
		const res = await fetch('http://localhost:8000/api/map-pins', {
			method: 'get',
			headers: { Authorization: `Bearer ${access_token}` },
		});
		const json = await res.json();
		return json;
		} catch (err) {
		console.log(err);
		return [];
		}
	};

	useEffect(() => {
		const fetchData = async () => {
		const pinsData = await getPinsData();
		console.log("pinezki: ", pinsData);
		let locations = pinsData.map_pins;

		if (!mapInitialized) {
			const map = L.map('map').setView([51.505, -0.09], 13);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			const customIcon = new L.Icon({
			iconUrl,
			iconRetinaUrl,
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowUrl,
			shadowSize: [41, 41],
			});

			let favourite;
			locations.map((location) => {
				if(location.favourite) {
					favourite = "tak";
				}
				else favourite = "nie";
			L.marker([location.latitude, location.longitude], { icon: customIcon })
				.addTo(map)
				.bindPopup(`Pin name: ${location.pin_name}<br>Ulubiony: ${favourite}
				<br>Description: ${location.description}<br>Latitude: ${location.latitude}
				<br>Longitude: ${location.longitude}`)
				.openPopup();
			});

			setMapInitialized(true);
		}
		};

		fetchData();
	}, [mapInitialized]);

	return <div id="map" style={{ height: '1080px', width: '100%' }} />;
};

export default MapView;
