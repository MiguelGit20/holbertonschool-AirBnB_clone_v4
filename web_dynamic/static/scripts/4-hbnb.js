// JavaScript Script

function displayLoading () {
// Function that display loading animation while content is ready
  const places = document.querySelector('.places');
  places.innerHTML = '';
  places.setAttribute('id', 'onLoad');
  const loader = document.createElement('div');
  loader.setAttribute('id', 'loading');
  places.appendChild(loader);
}

function hideLoading () {
// Function that hides loading animation
  const places = document.querySelector('.places');
  places.removeAttribute('id');
  places.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function () {
  // Function that makes a POST request to the API to retrieve the places and add them to the page.
  displayLoading();
  fetch('http://127.0.0.1:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: '{}'
  })
    .then(response => response.json())
    .then(response => {
      hideLoading();
      for (const i of response) {
        const newArticle = document.createElement('article');
        newArticle.innerHTML = `
        <div class="title_box">
          <h2>${i.name}</h2>
          <div class="price_by_night">$${i.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${i.max_guest} Guest${i.max_guest > 1 ? 's' : ''}</div>
          <div class="number_rooms">${i.number_rooms} Bedroom${i.number_rooms > 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${i.number_bathrooms} Bathroom${i.number_bathrooms > 1 ? 's' : ''} </div>
          </div>
          <div class="description">${i.description}</div>
          `;
        document.querySelector('.places').appendChild(newArticle);
      }
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // Function that makes a request to the API and checks the status.

  const apiClass = document.querySelector('.api_status');
  fetch('http://127.0.0.1:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        apiClass.classList.add('available');
      } else {
        apiClass.classList.remove('available');
      }
    });
});

// JQuery for veryfing and displaying amenities in the filter Section.

$(function () {
  const idList = [];
  const namesList = [];
  const places = document.querySelector('.places');

  $('input[data-id]').change(function () {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');

    if (this.checked) {
      idList.push(id);
      namesList.push(name);
    } else {
      for (let i = 0; i < namesList.length; i++) {
        if (namesList[i] === name) {
          namesList.splice(i, 1);
          idList.splice(i, 1);
        }
      }
    }
    $('.amenities h4').text(namesList.join(', '));

    const button = document.querySelector('button');
    button.addEventListener('click', function () {
      // Function that adds functionality to the search button in filter Section.
      displayLoading();
      fetch('http://127.0.0.1:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amenities: idList })
      })
        .then(response => response.json())
        .then(response => {
          hideLoading();
          if (response.length === 0) {
            places.setAttribute('id', 'not_places');
            const noPlaces = document.createElement('div');
            noPlaces.innerHTML = `
              <p>No places found with this list of amenities: <b>${namesList.join(', ')}</b>.</p>
            `;
            places.appendChild(noPlaces);
          } else {
            places.removeAttribute('id');
            for (const i of response) {
              const newArticle = document.createElement('article');
              newArticle.innerHTML = `
              <div class="title_box">
                <h2>${i.name}</h2>
                <div class="price_by_night">$${i.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${i.max_guest} Guest${i.max_guest > 1 ? 's' : ''}</div>
                <div class="number_rooms">${i.number_rooms} Bedroom${i.number_rooms > 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${i.number_bathrooms} Bathroom${i.number_bathrooms > 1 ? 's' : ''} </div>
                </div>
                <div class="description">${i.description}</div>
                `;
              document.querySelector('.places').appendChild(newArticle);
            }
          }
        });
    });
  });
});
