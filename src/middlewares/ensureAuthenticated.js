const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')


function ensureAutehnticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401)
  }

  const [, token] = authHeader.split(" ")


  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secrete);
    req.user = {
      id: Number(user_id)
    }
    return next();
  } catch {
    throw new AppError("JWT Token Inválido", 401)
  }


}

module.exports = ensureAutehnticated;