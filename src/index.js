require("dotenv").config();
const cors = require("cors");
var morgan = require("morgan");
const express = require("express");
const ApiRouter = require("./routes/api");
const handlebars = require("express-handlebars");
const Handlebars = require('handlebars');

const port = process.env.PORT || 8080;
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));

// Descomentar handlebars, o ejs, o pug según el que quiera utilizarse.

// Handlebars --------------------------------------
// app.engine(
//   "hbs",
//   handlebars({
//     extname: ".hbs",
//     defaultLayout: "index.hbs",
//   }),
// );
// Handlebars.registerHelper("inc", function(value, options) {
//   return parseInt(value) + 1;
// });
// app.set("view engine", "hbs");
// app.set("views", "./views/handlebars");

// ejs --------------------------------------
app.set('views', './views/ejs');
app.set('view engine', 'ejs');

// pug --------------------------------------
// app.set("views", "./views/pug");
// app.set("view engine", "pug");

// --------------------------------------

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use("/", ApiRouter);

app.listen(port, () => {
  console.info(`Express server listening on port ${port}`);
});
