require("dotenv").config();

const express = require("express");
const cors = require("cors");

const rutas = require("./routes/login");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", rutas);

app.listen(process.env.PORT, () => {
  console.log(`Servidor ejecutandose en puerto ${process.env.PORT}`);
});
