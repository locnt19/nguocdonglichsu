document.addEventListener('DOMContentLoaded', function () {
  // #region SUMMARY PAGE
  var summaryTime = 10
  var href = $('#link').attr('href')
  ticker = setInterval(function () {
    summaryTime--
    if (summaryTime === 0) {
      clearInterval(ticker)
      summaryTime = 0
      window.location.assign(`${href}`)
    }
    $('#summary_time').text(summaryTime)
  }, 1000)
  // #endregion
})