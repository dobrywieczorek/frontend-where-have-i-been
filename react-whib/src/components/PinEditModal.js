import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PinEditModal = ({ pinData, isOpen, isFormFilled, setFilled, onClose, handleEditChange, token, updatePins, clearCurrentPin, map, createMarker, deleteMarker, fillingForm }) => {
    const handleEditSubmit = (e) => {
        e.preventDefault();
        editPin(pinData);
        clearCurrentPin();
    };

    if (!isFormFilled && isOpen) {
        fillingForm();
        setFilled(true);
    }

    const close = () => {
        onClose();
        clearCurrentPin();
        setFilled(false);
    }

    const editPin = async (pinToEdit) => {
        try {
            const res = await fetch(`http://localhost:8000/api/map-pins/${pinToEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pinData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const json = await res.json();
            let updatedPin = json.map_pin;

            deleteMarker(updatedPin.id);
            createMarker(updatedPin, map);
            updatePins(updatedPin.map_pin);
            
            isOpen = false;
            setFilled(false);
        } catch (error) {
            console.error('Error editing pin', error);
        }
        toast("Pinezka została edytowana!");
    }

    if (!isOpen) return null;

    return (
        <div className="fixed z-[1000] left-0 top-0 h-full w-full bg-black/[.50] grid content-center">
            <div className="modal-content py-3 px-6 pin-form mx-auto w-1/5 rounded-md flex flex-col items-center">
                <div>
                    <h3 className="text-xl font-bold mt-2 mb-2" style={{float: "left"}}>Edytowanie pinezki</h3>
                    <span className="text-zinc-400 float-right text-3xl font-bold mt-0.5 hover:text-black hover:cursor-pointer" onClick={close} style={{float: "right"}}>&times;</span>
                </div>
                
                <form className="w-full flex flex-col items-center" onSubmit={handleEditSubmit}>
                    <input type="text" name="pin_name" className="w-full my-2.5 p-2.5" value={pinData.pin_name} onChange={handleEditChange} placeholder="Nazwa" />
                    <textarea name="description" className="w-full my-2.5 p-2.5" value={pinData.description} onChange={handleEditChange} placeholder="Opis"></textarea>
                    
                    <p className="mt-2.5">Kategoria</p>
                    <select name="category" className="w-full mb-2.5 mt-1 p-2.5 items-center" value={pinData.category} onChange={handleEditChange}>
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
                            checked={pinData.favourite}
                            onChange={handleEditChange}
                        />
                    </div>

                    <div className="my-2.5">
                        <label>Lokalizacja:</label><br/>
                        <input type="text" name="latitude" className="w-full" value={pinData.latitude} onChange={handleEditChange} placeholder="latitude" />
                        <input type="text" name="longitude" className="w-full" value={pinData.longitude} onChange={handleEditChange} placeholder="longitude" />
                    </div>

                    <button type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 rounded my-2.5 w-full">Edytuj Pinezkę</button>
                </form>
            </div>
        </div>
    );
};

export default PinEditModal;
