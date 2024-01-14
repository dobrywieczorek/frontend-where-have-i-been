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
            text: "Wprowadzenie: Witamy w samouczku mapy!",
            image: tutorialImage1
        },
        {
            text: "Przewodnik po interfejsie: Poznaj przyciski zoom, pasek wyszukiwania i inne narzędzia.",
            image: tutorialImage1
        },
        {
            text: "Dodawanie pinezki: Kliknij na mapie i wypełnij formularz, aby dodać pinezkę.",
            image: tutorialImage1
        },
        {
            text: "Wyszukiwanie i nawigacja: Użyj paska wyszukiwania, by znaleźć pinezkę.",
            image: tutorialImage1
        },
        {
            text: "Usunięcie pinezki: Kliknij pinezkę, a następnie 'Usuń', aby ją usunąć.",
            image: tutorialImage1
        },
        {
            text: "Zakończenie samouczka: Dziękujemy za korzystanie z naszej strony!",
            image: tutorialImage1
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
                <p>{tutorialSteps[step].text}</p>
                <img src={tutorialSteps[step].image} alt={`Step ${step + 1}`} />
                <div>
                    {step > 0 && <button onClick={prevStep}>Poprzedni</button>}
                    {step < tutorialSteps.length - 1 ? (
                        <button onClick={nextStep}>Następny</button>
                    ) : (
                        <button onClick={() => setIsVisible(false) & setStep(0)}>Zakończ</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
