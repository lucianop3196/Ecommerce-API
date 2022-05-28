const socket = io.connect();

//------------------------------------------------------------------------------------

const formProducts = document.getElementById("formProducts");
formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: formProducts[0].value,
    price: formProducts[1].value,
    quantity: formProducts[2].value,
    thumbnail: formProducts[2].value,
  };
  socket.emit("update", product);
  formProducts.reset();
});

socket.on("products", (products) => {
  makeHtmlTable(products).then((html) => {
    document.getElementById("products").innerHTML = html;
  });
});

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

function makeHtmlTable(products) {
  return fetch("templates/products-table.hbs")
    .then((response) => response.text())
    .then((temp) => {
      const template = Handlebars.compile(temp);
      const html = template({ products });
      return html;
    });
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById("inputUsername");
const inputMessage = document.getElementById("inputMessage");
const btnSubmit = document.getElementById("btnSubmit");

const formMessages = document.getElementById("formMessages");
formMessages.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = { author: inputUsername.value, text: inputMessage.value };
  socket.emit("newMessage", message);
  formMessages.reset();
  inputMessage.focus();
});

socket.on("messages", (messages) => {
  console.log(messages);
  const html = makeHtmlList(messages);
  document.getElementById("messages").innerHTML = html;
});

function makeHtmlList(messages) {
  return messages
    .map((message) => {
      return `
            <div>
                <b style="color:blue;">${message.author}</b>
                [<span style="color:brown;">${message.fyh}</span>] :
                <i style="color:green;">${message.text}</i>
            </div>
        `;
    })
    .join(" ");
}

inputUsername.addEventListener("input", () => {
  const isThereEmail = inputUsername.value.length;
  const isThereText = inputMessage.value.length;
  inputMessage.disabled = !isThereEmail;
  btnSubmit.disabled = !isThereEmail || !isThereText;
});

inputMessage.addEventListener("input", () => {
  const isThereText = inputMessage.value.length;
  btnSubmit.disabled = !isThereText;
});
