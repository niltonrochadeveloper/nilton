const jwt = require("jsonwebtoken");

const user = {
  name: "admin",
  email: "admin@spsgroup.com.br",
  type: "admin",
  password: "1234",
};

const userController = {
  users: (req, res) => {
    res.status(200).json({
      status: 200,
      result: {
        user: user,
      },
    });
  },
  findUser: (req, res) => {
    const { email } = req.params;
    if (email === user.email) {
      res.status(200).json({
        status: 200,
        result: user,
      });
    } else {
      res.status(401).json({
        status: 401,
        errors: {
          message: "usuário não existe",
        },
      });
    }
  },
  create: (req, res) => {
    const { name, email, password } = req.body;

    const errors = [];

    if (!name || typeof name === "undefined" || name.length === 0) {
      errors.push("Campo Name não pode ser vazio!");
    }
    if (!email || typeof email === "undefined" || email.length === 0) {
      errors.push("Campo Email não pode ser vazio!");
    }
    if (!email.includes("@")) {
      errors.push("Email inválido!");
    }
    if (!password || typeof password === "undefined" || password.length === 0) {
      errors.push("Campo Password não pode ser vazio!");
    }

    if (errors.length > 0) {
      return res.status(401).json({
        status: 401,
        errors,
      });
    } else {
      return res.status(200).json({
        status: 200,
        result: {
          user: {
            name: req.body.name,
            email: req.body.email,
            type: "user",
            password: "**********",
          },
        },
      });
    }
  },
  remove: (req, res) => {
    const { email } = req.params;
    if (email === user.email) {
      res.status(200).json({
        status: 200,
        result: `${email} deletado`,
      });
    } else {
      res.status(401).json({
        status: 401,
        errors: {
          message: "Email não existe",
        },
      });
    }
  },
  update: (req, res) => {
    const { id } = req.params;
    const { name, email, type, password } = req.params;
    if (id === user.id) {
      res.status(200).json({
        status: 200,
        result: {
          user: {
            name: name ? name : "admin",
            email: email ? email : "admin@spsgroup.com.br",
            type: type ? type : "admin",
            password: password ? password : "1234",
          },
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        errors: {
          message: "Email não existe",
        },
      });
    }
  },
};

module.exports = {
  userController,
};
