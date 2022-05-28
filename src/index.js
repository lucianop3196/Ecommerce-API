require("dotenv").config();
const cors = require("cors");
var morgan = require("morgan");
const express = require("express");
const ApiRouter = require("./routes/api");
// const handlebars = require("express-handlebars");
// const Handlebars = require('handlebars');
const http = require("http");
const { Server } = require("socket.io");
const MemoryContainer = require("../container/MemoryContainer.js");
const ProductController = require("./controllers/product");

const port = process.env.PORT || 8080;

// --------------------------------------
// server, socket and api instance

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const apiMessages = new MemoryContainer();
const filename = "productos.txt";
// --------------------------------------
// socket configuration, adecuarlo a mi proyecto!!!

io.on("connection", async (socket) => {
  console.log("new user connected");
  // carga inicial de productos
  const { products } = await ProductController.getAll(filename);
  socket.emit("products", products);

  // actualizacion de productos
  socket.on("update", async (product) => {
    await ProductController.save(product, filename);
    const {products} = await ProductController.getAll(filename)
    io.sockets.emit(
      "products",
      products
    );
  });

  // carga inicial de mensajes
  socket.emit("messages", apiMessages.listAll());

  // actualizacion de mensajes
  socket.on("newMessage", async (message) => {
    message.fyh = new Date().toLocaleString();
    await apiMessages.save(message);
    io.sockets.emit("messages", await apiMessages.listAll());
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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
// app.set('views', './views/ejs');
// app.set('view engine', 'ejs');

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

server.listen(port, () => {
  console.info(`Express server listening on port ${port}`);
});
