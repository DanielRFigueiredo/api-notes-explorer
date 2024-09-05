module.exports = {
  jwt: {
    secrete: process.env.AUTH_SECRET || 'default',
    expiresIn: "1d"
  }
}