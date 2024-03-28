const jwt = require("jsonwebtoken");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = {
        name: "admin",
        email: "admin@spsgroup.com.br",
        type: "admin",
        password: "1234",
      };

      const correctPassword =
        email === user.email && password === user.password;

      if (!correctPassword)
        return res.status(401).send("E-mail ou senha inválido!");

      const token = await jwt.sign(
        { userEmail: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "60m",
        }
      );

      req.session.isAdmin = true;

      return res.status(200).json({
        status: 200,
        result: {
          user: { name: user.name, email: user.email, type: user.type },
          access_token: token,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    }
  },
  logout: (req, res) => {
    req.session.isAdmin = false;
    req.session.destroy();
    res.status(200).json({
      result: "Usuário desconectado",
    });
  },
};

module.exports = {
  authController,
};
