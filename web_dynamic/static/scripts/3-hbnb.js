document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch("http://127.0.0.1:5001/api/v1/places_search/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: `{}`,
  });

  response.json().then(data => {

    for (const i of data) {
      console.log(i.name)
      const newArticle = document.createElement("article");
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
    `
    document.querySelector(".places").appendChild(newArticle);
     
      // const newArticle = document.createElement("article");
      // const divTitleBox = document.createElement("div")
      // divTitleBox.classList.add("title_box")

      // const divh2 = document.createElement("h2")
      // divh2.textContent = i.name
      // const divprice = document.createElement("div")
      // divprice.classList.add("price_by_night")
      // divprice.textContent = "$" + i.price_by_night

      // divTitleBox.appendChild(divh2)
      // divTitleBox.appendChild(divprice)
      // newArticle.appendChild(divTitleBox)

      // document.querySelector(".places").appendChild(newArticle);
    }});

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

$(function () {
  const idList = [];
  const namesList = [];


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
  });
});

