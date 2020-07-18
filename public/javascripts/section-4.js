$(document).ready(function () {
  new dragula({
    isContainer: function (el) {
      return el.classList.contains('dragula-container');
    }
  }).on('drag', function (el) {
    $(el).parents('.dragula-container').find('.anwser').val(null)
    el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el) {
    el.className += ' ex-moved';
    $(el).parents('.dragula-container').find('.anwser').val(el.dataset.anwser)
  }).on('over', function (el, container) {
    container.className += ' ex-over';
  }).on('out', function (el, container) {
    container.className = container.className.replace('ex-over', '');
  })
  $('.no-dragdrop').on('mousedown', function (e) {
    e.preventDefault()
  })
  console.log($('.no-dragdrop'))
})