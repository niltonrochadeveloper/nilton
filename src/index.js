require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
