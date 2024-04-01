const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const getToken = (req) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return null;
    const token = authHeader.split(" ")[1];
    return token;
  };

  const token = getToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ errors: "Acesso negado! Token não fornecido." });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ status: 401, errors: "Token inválido!" });
  }
};

module.exports = { verifyToken };
