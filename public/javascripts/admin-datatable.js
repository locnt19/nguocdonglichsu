$(document).ready(function () {
  $('#table_users').DataTable({
    order: [],
    columnDefs: [{ orderable: false, targets: [0] }]
  });
  $('#table_baithi').DataTable({
    order: [],
    columnDefs: [{ orderable: false, targets: [0] }]
  });
  $('#table_xephang_users').DataTable({
    order: [],
    columnDefs: [{ orderable: false, targets: [0] }]
  });
  $('#table_section1_list').DataTable();
  $('#table_section2_list').DataTable();
  $('#table_section3_list').DataTable();
  $('#table_section4_list').DataTable();
});
