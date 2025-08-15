const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../contact.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../about.html"));
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const category = req.query.category;
  category
    ? res.send(`Product ID: ${productId}, Category: ${category}`)
    : res.send(`Product ID: ${productId}`);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
