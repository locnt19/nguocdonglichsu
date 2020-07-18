var counter = {
  end: 20, // Thời gian trả lời mỗi câu hỏi
  sumaryCounter: 0,
  maximumCounter: 180,
  selector_cowndown: $('.time_countdown'),
  selector_summary: $('.time_summary'),
  selector_submit_summary: $('#submit_time_summary')
}

var couterRandom = 4

var listLocations = []

const locations = [
  'Đất Đỏ',
  'Long Điền',
  'Bà Rịa',
  'Vũng Tàu',
  'Côn Đảo',
  'Tân Thành',
  'Châu Đức',
  'Xuyên Mộc'
]

const modal = [
  'datdo',
  'longdien',
  'baria',
  'vungtau',
  'condao',
  'tanthanh',
  'chauduc',
  'xuyenmoc'
]


$(document).ready(function () {

  tabCauHoi('datdo')
  tabCauHoi('longdien')
  tabCauHoi('baria')
  tabCauHoi('vungtau')
  tabCauHoi('condao')
  tabCauHoi('tanthanh')
  tabCauHoi('chauduc')
  tabCauHoi('xuyenmoc')

  var done = 0


  //#region Count timer
  $('.s3_start').click(function () {
    counter.end = 20
    counter.selector_cowndown.text(counter.end)
    clearInterval(counter.ticker)
    startCounter(counter)
  })

  $('.s3_stop').click(function () {
    done++
    var listCheck = $('.star_checkbox:checked')
    if (listCheck.length >= 2) {
      $('.star_checkbox').parents('.custom-checkbox').hide()
      $('#star_conlai').parent().hide()
      // console.log($('.star_checkbox'))
    }
    // console.log(counter.sumaryCounter)
    clearInterval(counter.ticker)
    $(this).parents('.modal_chucnang__wrapper').removeClass('show')
    $('body').removeClass('overflow-hidden')
    // console.log($(this).parents('.modal_chucnang__wrapper').data('modal'));
    removeClassInMap($(this).parents('.modal_chucnang__wrapper').data('modal'))
    // console.log('done: ', done);
    if (done >= 4) {
      $('#luubai').show()
    }
  })
  //#endregion

  //#region random location
  $('.s3_random').click(function () {
    if (couterRandom > 0) {
      var random = randomRange(8)
      listLocations = []
      for (var i = 0; i < random.length; i++) {
        listLocations.push({
          modal: modal[random[i]],
          name: locations[random[i]]
        })
      }
      $('#result_random').text('')
      $('area').click(function (e) {
        e.preventDefault()
      })
      $('area').removeClass('active')
      listLocations.map(i => {
        $('#result_random').append(`<strong class='text-danger mx-2'>${i.name}</strong>`)
        $(`area[data-modal=${i.modal}]`).addClass('active')
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
    $('area:not(.active)').each(function () {
      $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).remove()
    })
    $('area:not(.active)').remove()
    $('area.active').click(function (e) {
      e.preventDefault()
      $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).addClass('show')
      $('body').addClass('overflow-hidden')
      // start couter
      counter.end = 20
      counter.selector_cowndown.text(counter.end)
      clearInterval(counter.ticker)
      startCounter(counter)
      // end couter
    })
  })

  $('area').click(function (e) {
    e.preventDefault()
  })
  //#endregion


  //#region Checkbox
  var star_conlai = 2;
  $('#star_conlai').text(star_conlai);

  // console.log($('.star_checkbox'))
  $('.star_checkbox').change(function () {
    if ($(this).is(':checked')) {
      star_conlai -= 1
      $('#star_conlai').text(star_conlai);
    } else {
      star_conlai += 1
      $('#star_conlai').text(star_conlai);
    }
    // console.log(star_conlai)
  })
  //#endregion

})


//#region function
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

function tabCauHoi(name) {
  var listTab = []
  var curentTab = 0
  $(`.tabs.${name}`).each(function () {
    listTab.push(this.id)
  })
  $(`#${listTab[curentTab]}`).show() // Hiển thị câu hỏi đầu tiên
  $(`.next_question.${name}`).click(function () {
    var listCheck = $('.star_checkbox:checked')
    if (listCheck.length >= 2) {
      $('.star_checkbox').parents('.custom-checkbox').hide()
      // console.log($('.star_checkbox'))
    }
    ++curentTab
    if (curentTab < listTab.length) {
      $(`#${listTab[curentTab - 1]}`).hide()
      $(`#${listTab[curentTab]}`).show()
      $(`.current_question.${name}`).text(curentTab + 1)
    }
    if ((curentTab + 1) == listTab.length) {
      $(`.next_question.${name}`).hide()
      $(`.s3_stop.${name}`).show()
    }
  })
}

function startCounter(counter) {
  counter.ticker = setInterval(function () {
    counter.end--
    counter.sumaryCounter++
    if (counter.end === 0) {
      counter.end = 20
    }
    if (counter.sumaryCounter === counter.maximumCounter) {
      clearInterval(counter.ticker)
      counter.end = 0
    }
    counter.selector_summary.text(counter.sumaryCounter)
    counter.selector_submit_summary.val(counter.sumaryCounter)
    counter.selector_cowndown.text(counter.end)
  }, 1000)
}

function removeClassInMap(name) {
  $(`area[data-modal=${name}]`).unbind('click').click(function (e) {
    e.preventDefault()
  })
}
//#endregion