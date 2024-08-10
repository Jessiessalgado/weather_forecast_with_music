const input = document.getElementById('input-search');
const apiKey = '67dce1b818b119ba688e1c9c8f6cafd0';
const clientID = '38a603aadbc24396872a8420bef93659';
const clientSecret = '49a62902a08848d881681f6147f58d10';
const ulElement = document.querySelector('.playlist-box');
const liElements = ulElement.querySelectorAll('li');
const videoURls = [
    './video/video1.mp4',
    './video/video2.mp4',
    './video/video3.mp4',
    './video/video4.mp4',
    './video/video5.mp4',
    './video/video6.mp4',
    './video/video7.mp4',
    './video/video8.mp4',
    './video/video9.mp4',
    './video/video10.mp4',
    './video/video11.mp4',
    './video/video12.mp4',
];

function getRandomVideos(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function reloadVideosOnScreen() {
    const videoElement = document.querySelector('.video');
    const videoSource = document.getElementById('video-source');
    const randomVideoURL = getRandomVideos(videoURls);

    if (videoElement && videoSource) {
        videoSource.src = randomVideoURL;
        videoElement.load();
    }
}

function motionInput(inputValue) {
    const visibility = getComputedStyle(input).visibility;
    if (inputValue) searchCity(inputValue);

    visibility === 'hidden' ? openInput() : closeInput();
}

function searchButton() {
    const inputValue = input.value;
    motionInput(inputValue);
}

function closeInput() {
    input.style.visibility = 'hidden';
    input.style.width = '40px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    input.style.transition = 'all 0.5s ease-in-out';
    input.value = "";
}

function openInput() {
    input.style.visibility = 'visible';
    input.style.width = '300px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
    input.style.transition = 'all 0.5s ease-in-out';
    input.value = "";
}

function showEnvelope() {
    document.querySelector('.envelope').style.visibility = 'visible';
    document.querySelector('.box').style.alignItems = 'end';
    document.querySelector('.search').style.position = 'initial';
}

input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        const valorInput = input.value;
        motionInput(valorInput);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    closeInput();
    reloadVideosOnScreen();
});

// Configurando informações meteorológicas
async function searchCity(city) {
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        if (dados.status === 200) {
            const result = await dados.json();
            getTopAlbumsByCountry(result.sys.country);
            showWeatherOnScreen(result);
            showEnvelope();
            reloadVideosOnScreen();
        } else {
            throw new Error;
        }
    } catch {
        alert('A pesquisa por cidade deu errado');        
    }
}

// weather information
function showWeatherOnScreen(result) {
    document.querySelector('.weather-icon').src = `./assets/${result.weather[0].icon}.png`;
    document.querySelector('.name-city').innerHTML = `${result.name}`;
    document.querySelector('.temperature').innerHTML = `${result.main.temp.toFixed(0)}°C`;
    document.querySelector('.maxTemperature').innerHTML = `max: ${result.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperature').innerHTML = `min: ${result.main.temp_min.toFixed(0)}°C`;
}

// Primeiras configurações API do Spotify
async function getAccessToken() {
    const credentials = `${clientID}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
    
async function getTopAlbumsByCountry(country) {
    try {
        const accessToken = await getAccessToken();  
        const currentDate = getCurrentDate();     
        const url = `https://api.spotify.com/v1/browse/featured-playlists?${country}limit=3`;
        const result = await fetch(`${url}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (result.status === 200) {
            const data = await result.json();
            const playlists = data.playlists.items.map(item => ({
                name: item.name,
                image: item.images[0].url
            }));
        
            showMusicOnScreen(playlists);
            return playlists;
        } else {
            throw new Error;
        }
    } catch {
        alert('A pesquisa por música deu errado!');        
    }
}

// Função para mostrar as músicas na tela
function showMusicOnScreen(dados) {
    liElements.forEach((liElement, index) => {
        const imgElement = liElement.querySelector('img');
        const pElement = liElement.querySelector('p');
        imgElement.src = dados[index].image;
        pElement.textContent = dados[index].name;
    });

    document.querySelector('.playlist-box').style.visibility = 'visible';
}
