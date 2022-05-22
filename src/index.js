require("dotenv").config();
const cors = require("cors");
var morgan = require("morgan");
const express = require("express");
const ApiRouter = require("./routes/api");
const handlebars = require("express-handlebars");
const Handlebars = require('handlebars');
const http = require('http');
const { Server } = require("socket.io");

const port = process.env.PORT || 8080;

// --------------------------------------
// server, socket and api instance

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// --------------------------------------
// socket configuration, adecuarlo a mi proyecto!!!

io.on('connection', (socket) => {

  console.log('new user connected')
  // carga inicial de productos
  socket.emit('productos', productosApi.listarAll());

  // actualizacion de productos
  socket.on('update', producto => {
      productosApi.guardar(producto)
      io.sockets.emit('productos', productosApi.listarAll());
  })

  // carga inicial de mensajes
  socket.emit('mensajes', await mensajesApi.listarAll());

  // actualizacion de mensajes
  socket.on('nuevoMensaje', async mensaje => {
      mensaje.fyh = new Date().toLocaleString()
      await mensajesApi.guardar(mensaje)
      io.sockets.emit('mensajes', await mensajesApi.listarAll());
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

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

server.listen(port, () => {
  console.info(`Express server listening on port ${port}`);
});
