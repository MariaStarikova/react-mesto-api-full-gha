const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const routers = require("./routes/index");
const handlerErrors = require("./middlewares/handlerErrors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

 const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://mstar.students.nomoredomainsmonster.ru",
    "https://mstar.students.nomoredomainsmonster.ru"
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization"],
  credentials: true,
};

// const allowedCors = {
//   origin: [
//   "http://mstar.students.nomoredomainsmonster.ru",
//   "https://mstar.students.nomoredomainsmonster.ru",
//   "http://localhost:3000",
//   "http://localhost:3004",
//   "http://localhost:3001"
//   ],
// };

app.use(cors(allowedCors));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routers);

app.use(errorLogger);

app.use(errors());
app.use(handlerErrors);

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log("'соединение с базой установлено");
})
  .catch((err) => {
    console.log(`DB connection error:${err}`);
    console.log("'соединение с базой прервано");
    // process.exit(1);
  });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});


