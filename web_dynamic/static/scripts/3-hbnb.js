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
      const divTitleBox = document.createElement("div")
      divTitleBox.classList.add("title_box")

      const divh2 = document.createElement("h2")
      divh2.textContent = i.name
      const divprice = document.createElement("div")
      divprice.classList.add("price_by_night")
      divprice.textContent = "$" + i.price_by_night

      divTitleBox.appendChild(divh2)
      divTitleBox.appendChild(divprice)
      newArticle.appendChild(divTitleBox)

      document.querySelector(".places").appendChild(newArticle);
      
      // const newElement = document.createElement("div");
      // newElement.classList.add("div");
      // newElement.textContent = "soy un div creado con javascript";
      // document.querySelector(".container").appendChild(newElement);
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

