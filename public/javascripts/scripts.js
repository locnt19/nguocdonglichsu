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
  }
})