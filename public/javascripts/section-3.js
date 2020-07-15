$(document).ready(function () {
  //#region Count timer
  var counter = {
    // maximun: listTabs.length * 20,
    maximun: 3000,
    isPaused: false,
    summary: 0, // Tổng thời gian  trả lời câu hỏi
    end: 20, // Thời gian trả lời mỗi câu hỏi
    action_next: $('#time_action_next'),
    innerHTML_end: $('#time_countdown'),
    innerHTML_summary: $('#time_summary'),
    input_summary: $('#submit_time_summary')
  }

  $('#pause').on('click', function () {
    counter.isPaused = true
  })

  $('#restart').on('click', function () {
    counter.end = 20
    counter.innerHTML_end.text(counter.end)
    counter.isPaused = false
  })

  $('#start').click(function () {
    counter.ticker = setInterval(function () {
      if (!counter.isPaused) {
        counter.end--
        counter.summary++
        if (counter.end === 0) {
          counter.end = 20
        }
        if (counter.summary === counter.maximun) {
          clearInterval(counter.ticker)
          counter.end = 0
        }
        counter.innerHTML_summary.text(counter.summary)
        counter.input_summary.val(counter.summary)
        counter.innerHTML_end.text(counter.end)
      }
    }, 1000)
  })
  //#endregion

  //#region random number

  var couterRandom = 4
  var locations = [
    'Đất Đỏ',
    'Long Điền',
    'Bà Rịa',
    'Vũng Tàu',
    'Côn Đảo',
    'Tân Thành',
    'Châu Đức',
    'Xuyên Mộc'
  ]
  $('#random').click(function () {
    if (couterRandom > 0) {
      var random = randomRange(8)
      var result = []
      for (var i = 0; i < random.length; i++) {
        result.push(locations[random[i]])
      }
      // $('#value_random').val(random)
      $('#result_random').text(result)
      couterRandom--
      $('#random_conlai').text(couterRandom)
      if (couterRandom === 0) {
        $('#random').attr('disabled', true)
      }
    }
  })

  const randomRange = length => {
    const results = []
    const possibleValues = Array.from({ length }, (value, i) => i)
    for (let i = 0; i < 4; i += 1) {
      const possibleValuesRange = length - (length - possibleValues.length)
      const randomNumber = Math.floor(Math.random() * possibleValuesRange)
      const normalizedRandomNumber = randomNumber !== possibleValuesRange ? randomNumber : possibleValuesRange
      const [nextNumber] = possibleValues.splice(normalizedRandomNumber, 1)
      results.push(nextNumber)
    }
    return results
  }
  //#endregion
})