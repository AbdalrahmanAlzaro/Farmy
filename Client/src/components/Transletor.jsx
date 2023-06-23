import React, { useEffect } from 'react';

const TranslationPage = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en', // Set the page's default language
                    autoDisplay: false, // Disable automatic translation display
                },
                'google_translate_element'
            );
        };
    }, []);

    const handleLanguageChange = (e) => {
        const targetLanguage = e.target.value;
        window.google.translate.translatePage(targetLanguage); // Translate the page to the selected language
    };

    return (
        <div>

            <div id="google_translate_element" /> {/* Translation container element */}
        </div>
    );
};

export default TranslationPage;
