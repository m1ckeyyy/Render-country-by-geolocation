'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const long = document.querySelector('.long');
const lang = document.querySelector('.lang');
///////////////////////////////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.continents}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;
  //console.log(data.flags.svg, data.name.common);
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); //this=request
    console.log(data);

    // Render country
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;
    if (!neighbour) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      console.log(this.responseText);
      const [data2] = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};
// getCountryAndNeighbour('usa');

// 😀 OLD WAY
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
// 😁 NEW WAY - avoid callback hell

// const request = fetch('https://restcountries.com/v3.1/name/poland');
// console.log(request); //Promise {<pending>} (fulfilled )

//Promise exercises
let p = new Promise((res, rej) => {
  //resolve,reject
  let a = 2 + 1;
  if (a == 2) {
    res('sucect');
  } else {
    rej('fail');
  }
});
p.then(data => {
  console.log(data);
}).catch(data => {
  console.log(data);
});

// Promise:
// Definition 1. An object that is used as a placeholder for the future result of asynchronous operation
// Definition 2. A container for an asynchronously delivered value
// Definition 3. A container for a future value

//explanation 🔽 fetching creates a promise, we handle the promise with .then and we return the data as .json() file. This returning proccess is another Promise itself so we handle it with another .then'

const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      //Country 2
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}🤜🏿🤛🏿`);
      renderError(`Something went wrong 😯 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// btn.onclick = function () {
//   getCountryData('slovakia');
// };

//learning more about Promise

/*
//callback hell before fix
const getUserData = callback => {
  setTimeout(() => {
    console.log('1. get user data');
    callback();
  }, 800);
};
const validateData = callback => {
  setTimeout(() => {
    console.log('2. validate');
    callback();
  }, 900);
};
const registerUser = callback => {
  setTimeout(() => {
    console.log('3. register');
    callback();
  }, 400);
};
const sendEmail = callback => {
  setTimeout(() => {
    console.log('4. send email');
    callback();
  }, 200);
};

getUserData(() => {
  validateData(() => {
    registerUser(() => {
      sendEmail(() => console.log('End!'));
    });
  });
});
// getUserData()
// validateData();
// registerUser();
// sendEmail();
*/
// const getUserData = callback => {
//   setTimeout(() => {
//     console.log('1. get user data');
//     callback();
//   }, 800);
// };

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// const whereAmI = function (long, lang) {
//   //Country 1
//   //prettier-ignore
//   fetch(`https://geocode.xyz/${long},${lang}?geoit=json&auth=633526392007411426430x55573`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Location not found, ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data =>{console.log(data, 'You are in ', data.country,', ', data.state);

//     getCountryData(`${data.country}`)
//   }).catch(err=>console.log(err));
// };
// whereAmI(52.508, 13.381);

btn.onclick = function () {
  fetch(
    `https://geocode.xyz/${long.value},${lang.value}?geoit=json&auth=633526392007411426430x55573`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`Location not found, ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      getCountryData(`${data.country}`);
    })
    .catch(err => console.log(err));
};
