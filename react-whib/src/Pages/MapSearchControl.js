import React, { useState, useEffect } from 'react';
import L from 'leaflet';

const MapSearchControl = ({ map, pins, onPinSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPins, setFilteredPins] = useState([]);

    useEffect(() => {
        if (!map) return;

        const SearchControl = L.Control.extend({
            onAdd: function() {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

                const input = L.DomUtil.create('input', 'search-input', container);
                input.type = 'text';
                input.placeholder = 'Search pin';
                input.oninput = function() {
                    setSearchTerm(input.value);
                };

                const dropdown = L.DomUtil.create('div', 'search-dropdown', container);
                dropdown.style.display = 'none'; // Initially hide the dropdown

                return container;
            }
        });

        const searchControl = new SearchControl({ position: 'topleft' });
        map.addControl(searchControl);

        return () => {
            if (map && searchControl) {
                map.removeControl(searchControl);
            }
        };
    }, [map]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredPins(pins.filter(pin => 
                pin.pin_name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredPins([]);
        }
    }, [searchTerm, pins]);

    useEffect(() => {
        const dropdown = document.querySelector('.search-dropdown');
        if (!dropdown) return;

        if (filteredPins.length > 0 && searchTerm) {
            dropdown.style.display = 'block';
            dropdown.innerHTML = '';
            filteredPins.forEach(pin => {
                const item = L.DomUtil.create('div', 'dropdown-item', dropdown);
                item.innerText = pin.pin_name;
                item.onclick = () => onPinSelect(pin);
            });
        } else {
            dropdown.style.display = 'none';
        }
    }, [filteredPins, onPinSelect, searchTerm]);

    return null;
};

export default MapSearchControl;
