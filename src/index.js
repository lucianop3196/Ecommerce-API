require("dotenv").config();
const cors = require("cors");
const express = require("express");
const ApiRouter = require('./routes/api');

const port = process.env.PORT || 8080;
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
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
app.use('/', ApiRouter);

app.listen(port, () => {
	console.info(`Express server listening on port ${port}`);
});
