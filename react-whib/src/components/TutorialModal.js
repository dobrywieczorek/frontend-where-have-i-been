import React, { useState } from 'react';
import L from 'leaflet';
import tutorialImage1 from '../img/home-128.png'
import { useTranslation } from 'react-i18next';


const TutorialModal = ({ isVisible, setIsVisible }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);

    if (!isVisible) {
        return null;
    }

    const tutorialSteps = [
        {
            text: t('tutorial1'),
            //image: tutorialImage1
        },
        {
            text: t('tutorial2'),
            //image: tutorialImage2
        },
        {
            text: t('tutorial3'),
            //image: tutorialImage3
        },
        {
            text: t('tutorial4'),
            //image: tutorialImage4
        },
        {
            text: t('tutorial5'),
            //image: tutorialImage5
        },
        {
            text: t('tutorial6'),
            //image: tutorialImage6
        },
        {
            text: t('tutorial7'),
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-[1000]">
            <div className="relative p-5 bg-white shadow-lg rounded-md text-gray-700 max-w-xl mx-auto">
                <span className="absolute top-0 right-0 p-4" onClick={() => setIsVisible(false) & setStep(0)}>
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
                
                <div className="flex flex-col items-center p-5">
                    <p>{tutorialSteps[step].text}</p>
                    {tutorialSteps[step].image && (
                        <img src={tutorialSteps[step].image} alt="Tutorial Step" className="max-w-full h-auto mt-4" />
                    )}
                </div>
                <div className="flex justify-end items-center mt-5">
                    {step > 0 && 
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={prevStep}>
                            {t('previous')}
                        </button>}
                    {step < tutorialSteps.length - 1 ? (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={nextStep}>
                            {t('next')}
                        </button>
                    ) : (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsVisible(false) & setStep(0)}>
                            {t('end')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default TutorialModal;
