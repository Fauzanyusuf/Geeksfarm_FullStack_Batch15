const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", { nama: "Fauzan Yusuf", title: "Homepage" });
});
app.get("/contact", (req, res) => {
  contacts = [
    {
      name: "Fauzan Yusuf",
      phone: "0812690785",
    },
    {
      name: "Ajax Stroberi",
      phone: "0837564569",
    },
  ];
  res.render("contact", { contacts, title: "Contact Page" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const category = req.query.category;
  category
    ? res.send(`Product ID: ${productId}, Category: ${category}`)
    : res.send(`Product ID: ${productId}`);
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
