const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const { readData } = require("../tugas-03/utils/fileUtils");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "./layout/layout");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/", (req, res) => {
  res.render("index", {
    name: "Fauzan Yusuf",
    title: "Homepage",
  });
});

app.get("/contact", async (req, res) => {
  const data = await readData();
  res.render("contact", {
    data,
    title: "Contact Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const category = req.query.category;
  category
    ? res.send(`Product ID: ${productId}, Category: ${category}`)
    : res.send(`Product ID: ${productId}`);
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
