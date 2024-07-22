// Get the parent folder path
var rootPath = window.location.pathname;
rootPath = rootPath.substring(0, rootPath.lastIndexOf('/'));

// Translation depending of the browser language
var translateTo = navigator.language || navigator.userLanguage;
var defaultLanguage = translateTo;

// Get the button img for translation
var switchLanguageImg = document.getElementById('switchLanguageImg');

var jsonData = null;

// Function to translate the page depending of the language
function translateLanguage(language) {
    if (language === 'fr-FR') {
        document.getElementById('title').innerHTML = 'PROGRAMMEUR GAMEPLAY';
        document.getElementById('warning').innerHTML = '/!\\ Le site est actuellement en cours de création. /!\\';

        // Translate the content
        document.querySelector('#the-blue-path .description').innerHTML = jsonData.projects[0].fr;
        document.querySelector('#bet-n-die .description').innerHTML = jsonData.projects[1].fr;

        if (defaultLanguage === 'en-US') {
            switchLanguageImg.src = rootPath + '/flags/US.png';
        }
        else {
            switchLanguageImg.src = rootPath + '/flags/EN.png';
        }
    }
    else {
        document.getElementById('title').innerHTML = 'GAMEPLAY PROGRAMMER';
        document.getElementById('warning').innerHTML = '/!\\ The site is currently under construction. /!\\';

        // Translate the content
        document.querySelector('#the-blue-path .description').innerHTML = jsonData.projects[0].en;
        document.querySelector('#bet-n-die .description').innerHTML = jsonData.projects[1].en;
        switchLanguageImg.src = rootPath + '/flags/FR.png';
    }
}

function switchLanguage() {
    if (translateTo === 'fr-FR') {
        if (defaultLanguage === 'en-US') {
            translateTo = 'en-US';
        }
        else {
            translateTo = 'en-EN';
        }
    }
    else {
        translateTo = 'fr-FR';
        switchLanguageImg.src = rootPath + '/flags/FR.png';
    }

    translateLanguage(translateTo);
    console.log(translateTo);
}

// Load the json file
document.addEventListener("DOMContentLoaded", loadJson());

async function loadJson() {
    try {
        // Utiliser fetch pour charger le fichier JSON
        const response = await fetch('data/content.json');

        // Vérifier si la réponse est correcte
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convertir la réponse en JSON
        jsonData = await response.json();

        // Utiliser les données JSON
        translateLanguage(translateTo);
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}
