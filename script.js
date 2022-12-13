const input = document.getElementById('language-input')
const btn = document.getElementById('search-button')
const NameH3 = document.createElement('h3')
const subregionP = document.createElement('p')
const capitalP = document.createElement('p')
const populationP = document.createElement('p')
const flagImg = document.createElement('img')
const errorH3 = document.createElement('h3')
const searchResultsDiv = document.getElementById('search-result-div')
const countryInfoDiv = document.createElement('div')
countryInfoDiv.setAttribute('id','country-info-div');


btn.addEventListener('click', searchFunction)

function searchFunction(event) {
    event.preventDefault()
    searchResultsDiv.innerHTML = '';
    let url = 'https://restcountries.com/v3.1/lang/'
    fetch(url + input.value.toLowerCase())
        .then(response => {

            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }
            else {
                throw 'datan gick inte att hämta'
            }
        })
        .then(showCountryInfo)
        .catch(showError);
    input.value = ""

}

function showCountryInfo(country) {
    const storePopulationsArray = []
    for (let i = 0; i < country.length; i++) {
       
        countryInfoDiv[i] = document.createElement('div')
        countryInfoDiv[i].setAttribute('id','country-info-div');
        searchResultsDiv.appendChild(countryInfoDiv[i])
        NameH3[i] = document.createElement('h3')
        NameH3[i].innerText = country[i].name.common
        countryInfoDiv[i].appendChild(NameH3[i])
        flagImg[i] = document.createElement('img')
        flagImg[i].src = country[i].flags.png
        countryInfoDiv[i].appendChild(flagImg[i])
        subregionP[i] = document.createElement('p')
        subregionP[i].innerText = 'Subregion: ' + country[i].subregion
        countryInfoDiv[i].appendChild(subregionP[i])
        capitalP[i] = document.createElement('p')
        capitalP[i].innerText = "Capital: " + country[i].capital
        countryInfoDiv[i].appendChild(capitalP[i])
        populationP[i] = document.createElement('p')
        populationP[i].innerText = "Population: " + country[i].population
        countryInfoDiv[i].appendChild(populationP[i])

        storePopulationsArray.push(country[i].population)

    }

const highestPopulation = Math.max(...storePopulationsArray)
const IndexOfHighestPopulation = storePopulationsArray.indexOf(highestPopulation)
countryInfoDiv[IndexOfHighestPopulation].style.backgroundColor = 'green'

}

function showError(error) {
    errorH3.innerText = "Can't find language. Please check spelling and try again."
    searchResultsDiv.appendChild(errorH3)
}

