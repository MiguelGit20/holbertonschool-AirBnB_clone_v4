$(function () {
  const dic = [];
  $('input[data-id]').change(function () {
      if (this.checked) {
          const name = $(this).attr('data-name');
          dic.push($(this).attr('data-id'));
          const span = "<span id='" + name + "'>" + name + '</span>';
          $('.amenities h4').append(span);
        } else {
            const name = $(this).attr('data-name');
            dic.pop($(this).attr('data-id'));
            $(`#${name}`).remove();
        }
        console.log(dic);
  });
});
