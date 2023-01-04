$(function () {
  const dic = [];
  $('input[data-id]').change(function () {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');
    if (this.checked) {
      dic.push($(this).attr('data-id'));
      const span = "<span id='" + id + "'>" + name + '</span>';
      $('.amenities h4').append(span);
    } else {
      dic.pop($(this).attr('data-id'));
      $(`#${id}`).remove();
    }
    console.log(dic);
  });
});
