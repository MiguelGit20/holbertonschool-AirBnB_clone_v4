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

document.addEventListener('DOMContentLoaded', () => {
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
