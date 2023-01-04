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
      idList.pop(id);
      namesList.pop(name);
    }
    $('.amenities h4').text(namesList.join(', '));
  });
});
