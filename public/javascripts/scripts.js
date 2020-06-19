document.addEventListener('DOMContentLoaded', function () {
  var message = document.getElementById('server-message') ? document.getElementById('server-message').textContent : null;
  if (message) {
    console.log('raw: %s', message);
    Toastify({
      text: message,
      gravity: 'top',
      position: 'right',
      duration: 3000,
      callback: function () {
        message = null;
        console.log('callback: %s', message);
      }
    }).showToast();
  };

  const $fakeSelectItem = $('.fake__select .dropdown-item');
  $fakeSelectItem.on('click', function () {
    const text = $(this).text();
    $(this).parents('.fake__select').find('input').val(text);
  });
  $('#users_me input').attr('readonly', true);
  $('#users_me button').attr('readonly', true);
  $('#users_me .fake__select .dropdown-menu').addClass('d-none');
  $('#users_me_update').click(function () {
    $(this).addClass('d-none');
    $('#users_me_update_yes').removeClass('d-none');
    $('#users_me_update_no').removeClass('d-none');
    $('#users_me .fake__select .dropdown-menu').removeClass('d-none');
    $('#users_me input').removeAttr('readonly');
    $('#users_me button').removeAttr('readonly');
  })
  $('#users_me_update_no').click(function () {
    $(this).addClass('d-none');
    $('#users_me .fake__select .dropdown-menu').addClass('d-none');
    $('#users_me_update_yes').addClass('d-none');
    $('#users_me_update').removeClass('d-none');
    $('#users_me input').attr('readonly', true);
    $('#users_me button').attr('readonly', true);
  })
  $('#re_password').keyup(function () {
    if ($('#new_password').val() === $(this).val()) {
      $(this).removeClass('is-invalid').addClass('is-valid');
      $('#btn_change_password').removeAttr('disabled');
    } else {
      $(this).addClass('is-invalid');
    }
  })
})