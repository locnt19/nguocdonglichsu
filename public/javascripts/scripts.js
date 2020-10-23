$(document).ready(function () {
  toatify();
  fakeSelectElement();
  timeAvailable();
  comingSoon();
  section1();
  section2();
  section3();
  section4();
});

function toatify() {
  //#region Toatify
  var message = document.getElementById('server-message')
    ? document.getElementById('server-message').textContent
    : null;
  if (message) {
    console.log('message: ', message);
    Toastify({
      text: message,
      gravity: 'top',
      position: 'right',
      duration: 2000,
      callback: function () {
        message = null;
        // console.log('callback: %s', message)
      },
    }).showToast();
  }
  //#endregion
}

function fakeSelectElement() {
  //#region FAKE SELECT IN REGISTER, USER/ME PAGE
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
  });
  $('#users_me_update_no').click(function () {
    $(this).addClass('d-none');
    $('#users_me .fake__select .dropdown-menu').addClass('d-none');
    $('#users_me_update_yes').addClass('d-none');
    $('#users_me_update').removeClass('d-none');
    $('#users_me input').attr('readonly', true);
    $('#users_me button').attr('readonly', true);
  });
  $('#re_password').keyup(function () {
    if ($('#new_password').val() === $(this).val()) {
      $(this).removeClass('is-invalid').addClass('is-valid');
      $('#btn_change_password').removeAttr('disabled');
    } else {
      $(this).addClass('is-invalid');
    }
  });
  //#endregion
}

function timeAvailable() {
  var comingSoon = {
    end: $('#index__thoigianconlai').val()
      ? new Date($('#index__thoigianconlai').val())
      : 0,
    day: $('#index__thoigianconlai__dd'),
    hr: $('#index__thoigianconlai__hr'),
    min: $('#index__thoigianconlai__min'),
    sec: $('#index__thoigianconlai__sec'),
  };

  comingSoon.end = Math.floor(comingSoon.end / 1000); // Convert UNIX timestamp + calculate remaining time
  comingSoon.remain = comingSoon.end - Math.floor(Date.now() / 1000);

  if (comingSoon.remain > 0) {
    comingSoon.ticker = setInterval(function () {
      comingSoon.remain--;
      if (comingSoon.remain <= 0) {
        clearInterval(comingSoon.ticker);
        comingSoon.remain = 0;
        // window.location.assign('/exams');
      }
      var secs = comingSoon.remain;
      var days = Math.floor(secs / 86400); // 1 day = 60 secs * 60 mins * 24 hrs
      secs -= days * 86400;
      var hours = Math.floor(secs / 3600); // 1 hr = 60 secs * 60 mins
      secs -= hours * 3600;
      var mins = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;
      // Update HTML
      comingSoon.day.text(days);
      comingSoon.hr.text(hours);
      comingSoon.min.text(mins);
      comingSoon.sec.text(secs);
    }, 1000);
  }
  //#endregion
}

function comingSoon() {
  //#region COMING SOON PAGE
  var comingSoon = {
    end: $('#comingsoon_ok').val() ? new Date($('#comingsoon_ok').val()) : 0,
    day: $('#comingsoon_day'),
    hr: $('#comingsoon_hr'),
    min: $('#comingsoon_min'),
    sec: $('#comingsoon_sec'),
  };

  comingSoon.end = Math.floor(comingSoon.end / 1000); // Convert UNIX timestamp + calculate remaining time
  comingSoon.remain = comingSoon.end - Math.floor(Date.now() / 1000);

  if (comingSoon.remain > 0) {
    comingSoon.ticker = setInterval(function () {
      comingSoon.remain--;
      if (comingSoon.remain <= 0) {
        clearInterval(comingSoon.ticker);
        comingSoon.remain = 0;
        window.location.assign('/exams');
      }
      var secs = comingSoon.remain;
      var days = Math.floor(secs / 86400); // 1 day = 60 secs * 60 mins * 24 hrs
      secs -= days * 86400;
      var hours = Math.floor(secs / 3600); // 1 hr = 60 secs * 60 mins
      secs -= hours * 3600;
      var mins = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;
      // Update HTML
      comingSoon.day.text(days);
      comingSoon.hr.text(hours);
      comingSoon.min.text(mins);
      comingSoon.sec.text(secs);
    }, 1000);
  }
  //#endregion
}

function section1() {
  //#region Section 1
  var listTabs = [];
  $('.question__wrapper .tabs').each(function () {
    listTabs.push(this.id);
  });

  // console.log(listTabs)

  $(`#${listTabs[0]}`).show(); // Hiển thị câu hỏi đầu tiên

  var nextQuestion = 1;

  var counter = {
    maximun: listTabs.length * 30, // Maximum time for round 1
    summary: 0, // Tổng thời gian  trả lời câu hỏi
    end: 30, // Thời gian trả lời mỗi câu hỏi
    action_next: $('#time_action_next'),
    innerHTML_end: $('#time_countdown'),
    innerHTML_summary: $('#time_summary'),
    input_summary: $('#submit_time_summary'),
  };

  // console.log(counter)

  $('#time_action_next').click(function () {
    if (nextQuestion < listTabs.length) {
      // console.log(nextQuestion)
      counter.end = 30; // reset thời gian trả lời 1 câu hỏi
      counter.innerHTML_end.text(counter.end);
      $(`#${listTabs[nextQuestion - 1]}`).hide();
      $(`#${listTabs[nextQuestion]}`).show();
      nextQuestion++;
      $('#current_question').text(nextQuestion);
    }
    if (nextQuestion === listTabs.length) {
      // console.log(nextQuestion)
      $(this).hide();
      $('#time_action_submit').removeClass('d-none');
    }
  });

  if (counter.end > 0) {
    counter.ticker = setInterval(function () {
      counter.end--;
      counter.summary++;
      if (counter.end === 0) {
        if (nextQuestion < listTabs.length) {
          counter.end = 30; // reset thời gian trả lời 1 câu hỏi
          $(`#${listTabs[nextQuestion - 1]}`).hide();
          $(`#${listTabs[nextQuestion]}`).show();
          nextQuestion++;
          $('#current_question').text(nextQuestion);
          if (nextQuestion === listTabs.length) {
            // console.log(nextQuestion)
            $('#time_action_next').hide();
            $('#time_action_submit').removeClass('d-none');
          }
        } else {
          clearInterval(counter.ticker);
          if ($(document).has('form[name=exams_section1]').length > 0) {
            document.forms['exams_section1'].submit();
          }
        }
      }
      if (counter.summary === counter.maximun) {
        clearInterval(counter.ticker);
        counter.end = 0;
      }
      counter.innerHTML_summary.text(counter.summary);
      counter.input_summary.val(counter.summary);
      counter.innerHTML_end.text(counter.end);
    }, 1000);
  }
  //#endregion
}

function section2() {
  let doneSection2 = false;
  let firstQuestion = true;
  let score = 0;
  let showQuestions = false;
  let summaryCorrectAnwsered = 0;
  let summaryWrongAnwsered = 0;
  let questionPending = 0;
  let trueAnwserPending = '';
  let section2IntervalTimer;
  let section2IntervalPendingTimer;
  let summaryTimer = 0;
  let questionPendingTimer = 30;
  let anwserBackGroundIsCorrect = false;
  const timeLimited = 999;
  const $summaryTimer = $('#section2__summaryTimer');
  const $questionPendingTimer = $('#section2__questionPendingTimer');

  section2IntervalTimer = setInterval(() => {
    if (summaryTimer < timeLimited) {
      ++summaryTimer;
      $summaryTimer.text(summaryTimer);
    } else {
      clearInterval(section2IntervalTimer);
      clearInterval(section2IntervalPendingTimer);
      doneSection2 = true;
      hideListQuestion();
      chamDiemThi();
    }
  }, 1000);

  $('.section2__question__card__item').on('click', function () {
    if (!showQuestions && !doneSection2) {
      showQuestions = true;
      if (firstQuestion) {
        firstQuestion = false;
      }
      $(this).addClass('pending'); // add class pending css.
      questionPending = $(this).data('item');
      trueAnwserPending = $(this).data('value');
      $('.section2__question__list').removeClass('d-none');
      $(`.section2__question__item[data-item=${questionPending}]`).removeClass(
        'd-none'
      );
      section2IntervalPendingTimer = setInterval(() => {
        if (questionPendingTimer > 0) {
          --questionPendingTimer;
          $questionPendingTimer.text(questionPendingTimer);
        } else {
          showToast('Time out');
          hideListQuestion();
          checkAnwser(questionPending, false);
          clearIntervalAndResetQuestionPendingTimer();
        }
      }, 1000);
    }
  });

  $('.section2__question__check__result').on('click', function () {
    let anwser = $(
      `input[name=section2__answer${questionPending}]:checked`
    ).val();
    if (anwser === trueAnwserPending) {
      if (questionPending === 9) {
        checkAnwserBackground(true);
      } else {
        checkAnwser(questionPending, true);
      }
      clearIntervalAndResetQuestionPendingTimer();
    } else {
      if (questionPending === 9) {
        checkAnwserBackground(false);
      } else {
        checkAnwser(questionPending, false);
      }
      clearIntervalAndResetQuestionPendingTimer();
    }
    hideListQuestion();
  });

  $('.section2__question__background').on('click', function () {
    if (!firstQuestion && !showQuestions && !doneSection2) {
      showQuestions = true;
      doneSection2 = true;
      questionPending = 9;
      trueAnwserPending = $(this).data('value');
      $('.section2__question__list').removeClass('d-none');
      $(`.section2__question__item[data-item=${questionPending}]`).removeClass(
        'd-none'
      );
      section2IntervalPendingTimer = setInterval(() => {
        if (questionPendingTimer > 0) {
          --questionPendingTimer;
          $questionPendingTimer.text(questionPendingTimer);
        } else {
          showToast('Time out');
          hideListQuestion();
          checkAnwserBackground(false);
          clearIntervalAndResetQuestionPendingTimer();
        }
      }, 1000);
    }
  });

  function showToast(text) {
    Toastify({
      text: text,
      gravity: 'top',
      position: 'right',
      duration: 3000,
    }).showToast();
  }

  function clearIntervalAndResetQuestionPendingTimer() {
    clearInterval(section2IntervalPendingTimer);
    questionPendingTimer = 30;
    $questionPendingTimer.text(questionPendingTimer);
  }

  function checkAnwser(questionPending, isCorrect) {
    if (isCorrect) {
      summaryCorrectAnwsered++;
      showToast('Yeah Awesome!');
      $(`.section2__question__card__item[data-item=${questionPending}]`)
        .removeClass('pending')
        .addClass('correct')
        .off();
    } else {
      summaryWrongAnwsered++;
      showToast('Oh nooo!');
      $(`.section2__question__card__item[data-item=${questionPending}]`)
        .removeClass('pending')
        .addClass('wrong')
        .off();
    }
  }

  function checkAnwserBackground(isCorrect) {
    clearInterval(section2IntervalTimer);
    if (isCorrect) {
      anwserBackGroundIsCorrect = true;
      chamDiemThi(anwserBackGroundIsCorrect);
      $('.section2__question__card__item')
        .css('border', 'none')
        .removeClass('pending wrong')
        .addClass('correct')
        .off();
    } else {
      chamDiemThi();
      $('.section2__question__card__item')
        // .css('border', 'none')
        .removeClass('pending')
        // .addClass('wrong')
        .off();
    }
  }

  function chamDiemThi(anwserBackGroundIsCorrect = false) {
    if (anwserBackGroundIsCorrect) {
      score = 120 - 10 * summaryWrongAnwsered; // => 120 là tổng số điểm của Round 2.
    } else {
      score = 10 * summaryCorrectAnwsered;
    }
    $('#section2__score').val(score);
    $('#section2__summaryTimeeee').val(summaryTimer);
    Toastify({
      text: 'Go to next round after 3 seconds.',
      gravity: 'top',
      position: 'right',
      duration: 2000,
      callback: function () {
        message = null;
      },
    }).showToast();
    setTimeout(() => {
      document.forms['exams_section2'].submit();
    }, 3000);
  }

  function hideListQuestion() {
    showQuestions = false;
    $('.section2__question__list').addClass('d-none');
    $('.section2__question__item').addClass('d-none');
  }
}

function section3() {
  //#region Section 3
  var counter = {
    end: 30, // Thời gian trả lời mỗi câu hỏi
    sumaryCounter: 0,
    maximumCounter: 999,
    selector_cowndown: $('.time_countdown'),
    selector_summary: $('.time_summary'),
    selector_submit_summary: $('#submit_time_summary'),
  };

  var couterRandom = 4;

  var listLocations = [];

  var groupQuestionLocation = [];
  var questionCurrent = 0;

  //#region
  const locations = [
    'Đất Đỏ',
    'Long Điền',
    'Bà Rịa',
    'Vũng Tàu',
    'Côn Đảo',
    'Tân Thành',
    'Châu Đức',
    'Xuyên Mộc',
  ];

  const modal = [
    'datdo',
    'longdien',
    'baria',
    'vungtau',
    'condao',
    'tanthanh',
    'chauduc',
    'xuyenmoc',
  ];

  tabCauHoi('datdo');
  tabCauHoi('longdien');
  tabCauHoi('baria');
  tabCauHoi('vungtau');
  tabCauHoi('condao');
  tabCauHoi('tanthanh');
  tabCauHoi('chauduc');
  tabCauHoi('xuyenmoc');

  var done = 0;

  //#region Count timer
  $('.s3_start').click(function () {
    counter.end = 30;
    counter.selector_cowndown.text(counter.end);
    clearInterval(counter.ticker);
    startCounter(counter);
  });

  $('.s3_stop').click(function () {
    done++;
    questionCurrent = 0;
    var listCheck = $('.star_checkbox:checked');
    if (listCheck.length >= 2) {
      $('.star_checkbox').parents('.custom-checkbox').hide();
      $('#star_conlai').parent().hide();
      // console.log($('.star_checkbox'))
    }
    // console.log(counter.sumaryCounter)
    clearInterval(counter.ticker);
    $(this).parents('.modal_chucnang__wrapper').removeClass('show');
    $('body').removeClass('overflow-hidden');
    // console.log($(this).parents('.modal_chucnang__wrapper').data('modal'));
    removeClassInMap($(this).parents('.modal_chucnang__wrapper').data('modal'));
    // console.log('done: ', done);
    if (done >= 4) {
      $('#luubai').show();
    }
  });
  //#endregion

  //#region random location
  $('.s3_random').click(function () {
    if (couterRandom > 0) {
      var random = randomRange(8);
      listLocations = [];
      for (var i = 0; i < random.length; i++) {
        listLocations.push({
          modal: modal[random[i]],
          name: locations[random[i]],
        });
      }
      $('#result_random').text('');
      $('area').click(function (e) {
        e.preventDefault();
      });
      $('area').removeClass('active');
      listLocations.map(i => {
        $('#result_random').append(
          `<strong class='text-danger mx-2'>${i.name}</strong>`
        );
        $(`area[data-modal=${i.modal}]`).addClass('active');
      });
      couterRandom--;
      $('#random_conlai').text(couterRandom);
      if (couterRandom === 0) {
        $('#star_conlai').parent().show();
        $('#random_conlai').parent().hide();
        $('.s3_random').hide();
        $('.s3_ok').hide();
        $('#start_text').show();
      }
      if (couterRandom < 4) {
        $('.s3_ok').removeClass('d-none');
      }
    }
  });

  $('.s3_ok').click(function () {
    $(this).hide();
    $('#random_conlai').parent().hide();
    $('.s3_random').hide();
    $('#start_text').show();
    $('#star_conlai').parent().show();
    $('area:not(.active)').each(function () {
      $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).remove();
    });
    $('area:not(.active)').remove();
    $('area.active').click(function (e) {
      e.preventDefault();
      $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).addClass(
        'show'
      );
      $('body').addClass('overflow-hidden');
      // start couter
      counter.end = 30;
      counter.selector_cowndown.text(counter.end);
      clearInterval(counter.ticker);
      startCounter(counter);
      // end couter
    });
  });

  $('area').click(function (e) {
    e.preventDefault();
  });
  //#endregion

  //#region Checkbox
  var star_conlai = 2;
  $('#star_conlai').text(star_conlai);

  // console.log($('.star_checkbox'))
  $('.star_checkbox').change(function () {
    if ($(this).is(':checked')) {
      star_conlai -= 1;
      $('#star_conlai').text(star_conlai);
    } else {
      star_conlai += 1;
      $('#star_conlai').text(star_conlai);
    }
    // console.log(star_conlai)
  });
  //#endregion

  const randomRange = length => {
    const results = [];
    const possibleValues = Array.from({ length }, (value, i) => i);
    for (let i = 0; i < 4; i += 1) {
      const possibleValuesRange = length - (length - possibleValues.length);
      const randomNumber = Math.floor(Math.random() * possibleValuesRange);
      const normalizedRandomNumber =
        randomNumber !== possibleValuesRange
          ? randomNumber
          : possibleValuesRange;
      const [nextNumber] = possibleValues.splice(normalizedRandomNumber, 1);
      results.push(nextNumber);
    }
    return results;
  };
  //#endregion

  function tabCauHoi(name) {
    var listTab = [];
    var curentTab = 0;
    questionCurrent = curentTab;
    const temp = {
      name: name,
      id: [],
    };
    $(`.tabs.${name}`).each(function () {
      listTab.push(this.id);
      temp.id.push(this.id);
    });
    groupQuestionLocation.push(temp);
    $(`#${listTab[questionCurrent]}`).show(); // Hiển thị câu hỏi đầu tiên
    $(`.next_question.${name}`).click(function () {
      // start couter
      counter.end = 30;
      counter.selector_cowndown.text(counter.end);
      clearInterval(counter.ticker);
      startCounter(counter);
      // end couter
      var listCheck = $('.star_checkbox:checked');
      if (listCheck.length >= 2) {
        $('.star_checkbox').parents('.custom-checkbox').hide();
        // console.log($('.star_checkbox'))
      }
      ++questionCurrent;
      if (questionCurrent < listTab.length) {
        $(`#${listTab[questionCurrent - 1]}`).hide();
        $(`#${listTab[questionCurrent]}`).show();
        $(`.current_question.${name}`).text(questionCurrent + 1);
      }
      if (questionCurrent + 1 == listTab.length) {
        $(`.next_question.${name}`).hide();
        $(`.s3_stop.${name}`).show();
      }
      // console.log(questionCurrent);
    });
  }
  console.log(groupQuestionLocation);
  function startCounter(counter) {
    counter.ticker = setInterval(function () {
      counter.end--;
      counter.sumaryCounter++;
      if (counter.end === 0) {
        // if ($('.modal_chucnang__wrapper').hasClass('show')) {
        //   const name = $('.modal_chucnang__wrapper.show').data('modal');
        //   for (const item of groupQuestionLocation) {
        //     console.log(item);
        //     if (item.name === name) {
        //       $(`#${item.id[questionCurrent - 1]}`).hide();
        //       $(`#${item.id[questionCurrent]}`).show();
        //       $(`.current_question.${name}`).text(questionCurrent + 1);
        //       break;
        //     }
        //   }
        // }
        counter.end = 30;
        clearInterval(counter.ticker);
      }
      if (counter.sumaryCounter === counter.maximumCounter) {
        clearInterval(counter.ticker);
        counter.end = 0;
      }
      counter.selector_summary.text(counter.sumaryCounter);
      counter.selector_submit_summary.val(counter.sumaryCounter);
      counter.selector_cowndown.text(counter.end);
    }, 1000);
  }

  function removeClassInMap(name) {
    $(`area[data-modal=${name}]`)
      .unbind('click')
      .click(function (e) {
        e.preventDefault();
      });
  }
  //#endregion
}

function section4() {
  //#region Dragula plugin
  const dragulaContainer = new dragula({
    isContainer: function (el) {
      return el.classList.contains('dragula-container');
    },
  })
    .on('drag', function (el) {
      el.className = el.className.replace('ex-moved', '');
    })
    .on('drop', function (el) {
      el.className += ' ex-moved';
    })
    .on('over', function (el, container) {
      container.className += ' ex-over';
    })
    .on('out', function (el, container) {
      container.className = container.className.replace('ex-over', '');
    });
  $('.no-dragdrop').on('mousedown', function (e) {
    e.preventDefault();
  });
  //#endregion

  // Change value every 1 seconds
  $('.dragula-container.left').each((index, item) => {
    setInterval(() => {
      if ($(item).children().length > 1) {
        const secondChildren = $(item).children()[1];
        $(item).find('input').val($(secondChildren).data('anwser'));
        $(item).parents('.border.rounded').addClass('border-primary shadow-sm');
      } else {
        $(item).find('input').val(null);
        $(item)
          .parents('.border.rounded')
          .removeClass('border-primary shadow-sm');
      }
    }, 1000);
  });

  // Timer
  const timeLimited = 200;
  let currentTime = 0;
  let stopTimer = false;

  const intervalTimer = setInterval(() => {
    if (stopTimer || currentTime === timeLimited) {
      stopTimer = true;
      clearInterval(intervalTimer);
      dragulaContainer.destroy();
      if ($(document).has('form[name=exams_section4]').length > 0) {
        document.forms['exams_section4'].submit();
      }
    } else {
      currentTime++;
      $('#timer').text(currentTime);
      $('.round__4 #submit_time_summary').val(currentTime);
    }
  }, 1000);

  $('#submitSection4').on('click', e => {
    stopTimer = true;
    clearInterval(intervalTimer);
    dragulaContainer.destroy();
  });
}
