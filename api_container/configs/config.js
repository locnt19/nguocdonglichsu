module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb+srv://admin-steppingback:admin-steppingback@cluster0-mfqk2.gcp.mongodb.net/stepping-back',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
