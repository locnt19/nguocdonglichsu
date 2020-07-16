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

  $('.s3_pause').on('click', function () {
    counter.isPaused = true
  })

  $('.s3_restart').on('click', function () {
    counter.end = 20
    counter.innerHTML_end.text(counter.end)
    counter.isPaused = false
  })

  $('.s3_start').click(function () {
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
  var modal = [
    'datdo',
    'longdien',
    'baria',
    'vungtau',
    'condao',
    'tanthanh',
    'chauduc',
    'xuyenmoc'
  ]
  $('.s3_random').click(function () {
    if (couterRandom > 0) {
      var random = randomRange(8)
      var result = []
      for (var i = 0; i < random.length; i++) {
        result.push({
          modal: modal[random[i]],
          name: locations[random[i]]
        })
      }
      $('#result_random').text('')
      $('area').click(function (e) {
        e.preventDefault()
      })
      $('area').removeClass('active')
      result.map(i => {
        $(`area[data-modal=${i.modal}]`).addClass('active')
        $(`area[data-modal=${i.modal}].active`).click(function (e) {
          e.preventDefault()
          console.log(this);
          $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).addClass('show')
          $('body').addClass('overflow-hidden')
        })
        $('#result_random').append(`<strong class='text-danger mx-2'>${i.name}</strong>`)
      })
      couterRandom--
      $('#random_conlai').text(couterRandom)
      if (couterRandom === 0) {
        $('#star_conlai').parent().show()
        $('#random_conlai').parent().hide()
        $('.s3_random').hide()
        $('.s3_ok').hide()
        $('#start_text').show()
      }
    }
  })
  $('.s3_ok').click(function () {
    $(this).hide()
    $('#random_conlai').parent().hide()
    $('.s3_random').hide()
    $('#start_text').show()
    $('#star_conlai').parent().show()
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
  $('.sidebar_chucnang__item').click(function () {
    $('.s3_random').attr('disabled', true)
  })
  $('area').click(function (e) {
    e.preventDefault()
  })
  //#endregion


  //#region modal
  $('.modal_chucnang__close').click(function () {
    $(this).parent().removeClass('show')
    $('body').removeClass('overflow-hidden')
  })
  //#endregion
})