
$(document).ready(function () {
  $('#table_users').DataTable({
    order: [[2, "asc"]], //asc | 
    // scrollY: 400,
    responsive: true,
    // info: false,
    // paging: false,
    // ordering: false,
    // searching: false,
    columns: [{
      className: 'details-control',
      orderable: false,
      data: null,
      defaultContent: ''
    },
    { data: '#' },
    { data: 'Thời gian' },
    { data: 'Họ tên' },
    { data: 'Điểm' },
    ]
  });
});