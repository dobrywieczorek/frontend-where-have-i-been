import React, { useState } from 'react';
import '../css/TutorialModal.css';
import tutorialImage1 from '../img/home-128.png'


const TutorialModal = ({ isVisible, setIsVisible }) => {
    const [step, setStep] = useState(0);

    if (!isVisible) {
        return null;
    }

    const tutorialSteps = [
        {
            text: "Witamy w samouczku mapy!",
            //image: tutorialImage1
        },
        {
            text: "Porusznie się po mapie: Aby poruszać się po mapie przytrzymaj lewy przycisk myszy i przesuń mapę. Użyj przycisków + i - znajdujących się po górnej lewej stronie mapy aby przybliżyć i oddalić widok. Alternatywnie możesz użyć scroola na myszce.",
            //image: tutorialImage2
        },
        {
            text: "Szukanie pinezek: Pod przyciskami do zmiany przybliżenia mapy znajduje się pole wyszukiania pinezek. Możesz wpisać do niego nazwę bądź kategorie pinezki aby je wyszukać. Kliknij w znalezioną pinezkę aby się do niej przenieść.",
            //image: tutorialImage3
        },
        {
            text: "Dodanie pinezki: Aby dodać pinezkę należy kliknąć wybrane miejsce na mapie i następnie wypełnić formularz.",
            //image: tutorialImage4
        },
        {
            text: "Edytowanie pinezki: Do edycji pinezki wystarczy tylko ją kliknąć, następnie wybrać edytuj i wypełnić formularz nowymi danymi.",
            //image: tutorialImage5
        },
        {
            text: "Usunięcie pinezki: Kliknij pinezkę, a następnie 'Usuń', aby ją usunąć.",
            //image: tutorialImage6
        },
        {
            text: "Zakończenie samouczka: Dziękujemy za korzystanie z naszej strony!",
            //image: tutorialImage7
        }
    ];

    const nextStep = () => {
        if (step < tutorialSteps.length - 1) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setIsVisible(false) & setStep(0)}>&times;</span>
                
                <div className="centered-content">
                    <p>{tutorialSteps[step].text}</p>
                </div>
                <div className="button-container">
                        {step > 0 && <button onClick={prevStep}>Poprzedni</button>}
                        {step < tutorialSteps.length - 1 ? (
                            <button className="next-button" onClick={nextStep}>Następny</button>
                        ) : (
                            <button onClick={() => setIsVisible(false) & setStep(0)}>Zakończ</button>
                        )}
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
