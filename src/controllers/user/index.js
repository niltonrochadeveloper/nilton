const jwt = require("jsonwebtoken");

const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234",
  },
  {
    id: 2,
    name: "user",
    email: "user@spsgroup.com.br",
    type: "user",
    password: "1234",
  },
];

const userController = {
  users: (req, res) => {
    res.status(200).json({
      status: 200,
      result: {
        users,
      },
    });
  },
  findUser: async (req, res) => {
    const user = users.filter((user) => user.id == req.params.id);
    if (req.params.id && user.length > 0) {
      res.status(200).json({
        status: 200,
        result: {
          user,
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        errors: {
          message: "Id de usuário não existe",
        },
      });
    }
  },
  create: async (req, res) => {
    const { name, email, password } = req.body;

    const errors = [];

    const userExists = users.find((user) => user.email == email);

    if (userExists) {
      errors.push("Email já existe! Tente outro!");
    }
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
      const countUsers = users.length;
      users.push({
        id: countUsers + 1,
        name: req.body.name,
        email: req.body.email,
        type: "user",
        password: password,
      });
      return res.status(200).json({
        status: 200,
        result: {
          user: users[countUsers - 1],
        },
      });
    }
  },
  remove: (req, res) => {
    const userToRemove = users.filter((user) => user.id == req.params.id);
    if (req.params.id >= 0 && userToRemove.length > 0) {
      users.splice(userToRemove, 1);

      res.status(200).json({
        status: 200,
        result: `Usuário deletado com sucesso`,
      });
    } else {
      res.status(401).json({
        status: 401,
        errors: {
          message: "Erro ao tentar deletar usuário!",
        },
      });
    }
  },
  update: (req, res) => {
    const { id } = req.params;
    const { name, email, type, password } = req.body;
    const userToUpdate = users.filter((user) => user.id == req.params.id);
    if (req.params.id >= 0 && userToUpdate.length > 0) {
      if (name) users[id - 1].name = name;
      if (email) users[id - 1].email = email;
      if (type) users[id - 1].type = type;
      if (password) users[id - 1].password = password;

      res.status(200).json({
        status: 200,
        result: {
          user: userToUpdate,
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        errors: {
          message: "Erro ao tentar atualizar usuário!",
        },
      });
    }
  },
};

module.exports = {
  userController,
};
