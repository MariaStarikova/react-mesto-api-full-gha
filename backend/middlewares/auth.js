const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("authorization", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  const token = authorization.replace("Bearer ", "");
  console.log("token", token);

  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  req.user = payload;
  console.log("payload", payload);

  return next();
};
