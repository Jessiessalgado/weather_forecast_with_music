const input = document.getElementById('input-search');
const apiKey = '67dce1b818b119ba688e1c9c8f6cafd0';
const clientID = '38a603aadbc24396872a8420bef93659';
const clientSecret = '49a62902a08848d881681f6147f58d10';
function motionInput(inputValue) {
    const visibility = getComputedStyle(input).visibility;
    inputValue && searchCity(inputValue);
    
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


input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        const valorInput = input.value;
        motionInput(valorInput)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    closeInput();
});

//Key do API para pesquisas das cidades
async function searchCity(city) {
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        if (dados.status === 200) {
            const result = await dados.json()
            showWeatherOnScreen(result);
        } else {
            throw new Error
        }
    } catch {
        alert('A pesquisa por cidade deu errado');
    }
}

function showWeatherOnScreen() {
    document.querySelector('.weather-icon').src = `./assets/${result.weather[0].icon}.png`
    document.querySelector('.name-city').innerHTML = `${result.name}`;
    document.querySelector('.temperature').innerHTML = `${result.main.temp.toFixed(0)}°C`;
    document.querySelector('.maxTemperature').innerHTML = `max: ${result.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperature').innerHTML = `min: ${result.main.temp_min.toFixed(0)}°C`;
}

