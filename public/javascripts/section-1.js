$(document).ready(function () {
  var listTabs = []
  $('.question__wrapper .tabs').each(function () {
    listTabs.push(this.id)
  })

  // console.log(listTabs)

  $(`#${listTabs[0]}`).show() // Hiển thị câu hỏi đầu tiên

  var nextQuestion = 1

  var counter = {
    maximun: listTabs.length * 20,
    summary: 0, // Tổng thời gian  trả lời câu hỏi
    end: 20, // Thời gian trả lời mỗi câu hỏi
    action_next: $('#time_action_next'),
    innerHTML_end: $('#time_countdown'),
    innerHTML_summary: $('#time_summary'),
    input_summary: $('#submit_time_summary')
  }

  // console.log(counter)

  $('#time_action_next').click(function () {
    if (nextQuestion < listTabs.length) {
      // console.log(nextQuestion)
      counter.end = 20 // reset thời gian trả lời 1 câu hỏi
      counter.innerHTML_end.text(counter.end)
      $(`#${listTabs[nextQuestion - 1]}`).hide()
      $(`#${listTabs[nextQuestion]}`).show()
      nextQuestion++
      $('#current_question').text(nextQuestion)
    }
    if (nextQuestion === listTabs.length) {
      // console.log(nextQuestion)
      $(this).hide()
      $('#time_action_submit').removeClass('d-none')
    }
  })

  if (counter.end > 0) {
    counter.ticker = setInterval(function () {
      counter.end--
      counter.summary++
      if (counter.end === 0) {
        if (nextQuestion < listTabs.length) {
          counter.end = 20 // reset thời gian trả lời 1 câu hỏi
          $(`#${listTabs[nextQuestion - 1]}`).hide()
          $(`#${listTabs[nextQuestion]}`).show()
          nextQuestion++
          $('#current_question').text(nextQuestion)
        } else { clearInterval(counter.ticker) }
      }
      if (counter.summary === counter.maximun) {
        clearInterval(counter.ticker)
        counter.end = 0
      }
      counter.innerHTML_summary.text(counter.summary)
      counter.input_summary.val(counter.summary)
      counter.innerHTML_end.text(counter.end)
    }, 1000)
  }
})