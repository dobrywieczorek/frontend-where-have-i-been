const PinEditModal = ({ pinData, isOpen, pinToEdit, onClose, handleEditChange, token, updatePins, clearCurrentPin, map, createMarker, deleteMarker }) => {
    const handleEditSubmit = (e) => {
        e.preventDefault();
        editPin(pinData);
        clearCurrentPin();
    };

    const editPin = async (editedPin) => {
        try {
            const res = await fetch(`http://localhost:8000/api/map-pins/${pinToEdit}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedPin),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const updatedPin = await res.json();

            deleteMarker(pinToEdit);
            createMarker(updatedPin.map_pin, map);
            updatePins(updatedPin.map_pin);
            
            isOpen = false;
        } catch (error) {
            console.error('Error editing pin', error);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Edytowanie pinezki</h1>
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleEditSubmit}>
                    <input type="text" name="pin_name" value={pinData.pin_name} onChange={handleEditChange} placeholder="Nazwa" />
                    <textarea name="description" value={pinData.description} onChange={handleEditChange} placeholder="Opis"></textarea>
                    <p>Kategoria</p>
                    <select name="category" value={pinData.category} onChange={handleEditChange}>
                        <option value="widok">Widok</option>
                        <option value="sklep">Sklep</option>
                        <option value="zabawa">Zabawa</option>
                        <option value="wakacje">Wakacje</option>
                        <option value="inne">Inne</option>
                    </select>
                    <div className="favourite-checkbox">
                        <label htmlFor="favourite">Ulubione</label>
                        <input
                            type="checkbox"
                            id="favourite"
                            name="favourite"
                            checked={pinData.favourite}
                            onChange={handleEditChange}
                        />
                    </div>

                    <div className="location-display">
                        <label>Lokalizacja:</label>
                        <input type="text" name="latitude" value={pinData.latitude} onChange={handleEditChange} placeholder="latitude" />
                        <input type="text" name="longitude" value={pinData.longitude} onChange={handleEditChange} placeholder="longitude" />
                    </div>

                    <button type="submit" className="submit-btn">Edytuj Pinezkę</button>
                </form>
            </div>
        </div>
    );
};

export default PinEditModal;
