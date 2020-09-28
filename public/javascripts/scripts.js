$(document).ready(function () {
  toatify();
  fakeSelectElement();
  comingSoon();
  section1();
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
      duration: 3000,
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
    maximun: listTabs.length * 20,
    summary: 0, // Tổng thời gian  trả lời câu hỏi
    end: 20, // Thời gian trả lời mỗi câu hỏi
    action_next: $('#time_action_next'),
    innerHTML_end: $('#time_countdown'),
    innerHTML_summary: $('#time_summary'),
    input_summary: $('#submit_time_summary'),
  };

  // console.log(counter)

  $('#time_action_next').click(function () {
    if (nextQuestion < listTabs.length) {
      // console.log(nextQuestion)
      counter.end = 20; // reset thời gian trả lời 1 câu hỏi
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
          counter.end = 20; // reset thời gian trả lời 1 câu hỏi
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

function section3() {
  //#region Section 3
  var counter = {
    end: 20, // Thời gian trả lời mỗi câu hỏi
    sumaryCounter: 0,
    maximumCounter: 180,
    selector_cowndown: $('.time_countdown'),
    selector_summary: $('.time_summary'),
    selector_submit_summary: $('#submit_time_summary'),
  };

  var couterRandom = 4;

  var listLocations = [];

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
    counter.end = 20;
    counter.selector_cowndown.text(counter.end);
    clearInterval(counter.ticker);
    startCounter(counter);
  });

  $('.s3_stop').click(function () {
    done++;
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
      counter.end = 20;
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

  function tabCauHoi(name) {
    var listTab = [];
    var curentTab = 0;
    $(`.tabs.${name}`).each(function () {
      listTab.push(this.id);
    });
    $(`#${listTab[curentTab]}`).show(); // Hiển thị câu hỏi đầu tiên
    $(`.next_question.${name}`).click(function () {
      var listCheck = $('.star_checkbox:checked');
      if (listCheck.length >= 2) {
        $('.star_checkbox').parents('.custom-checkbox').hide();
        // console.log($('.star_checkbox'))
      }
      ++curentTab;
      if (curentTab < listTab.length) {
        $(`#${listTab[curentTab - 1]}`).hide();
        $(`#${listTab[curentTab]}`).show();
        $(`.current_question.${name}`).text(curentTab + 1);
      }
      if (curentTab + 1 == listTab.length) {
        $(`.next_question.${name}`).hide();
        $(`.s3_stop.${name}`).show();
      }
    });
  }

  function startCounter(counter) {
    counter.ticker = setInterval(function () {
      counter.end--;
      counter.sumaryCounter++;
      if (counter.end === 0) {
        counter.end = 20;
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
  new dragula({
    isContainer: function (el) {
      return el.classList.contains('dragula-container');
    },
  })
    .on('drag', function (el) {
      $(el).parents('.dragula-container').find('.anwser').val(null);
      el.className = el.className.replace('ex-moved', '');
    })
    .on('drop', function (el) {
      el.className += ' ex-moved';
      $(el)
        .parents('.dragula-container')
        .find('.anwser')
        .val(el.dataset.anwser);
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
}
