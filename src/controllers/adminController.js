

exports.templateDashboard = (req, res) => {
  res.render('admin/dashboard.pug')
};

exports.templateUsers = (req, res) => {
  res.render('admin/users.pug')
};

exports.templateThoiGianThi = (req, res) => {
  res.render('admin/thoi-gian-thi.pug')
};

exports.setThoiGianThi = async (req, res) => {
  console.log(req.body);
};
