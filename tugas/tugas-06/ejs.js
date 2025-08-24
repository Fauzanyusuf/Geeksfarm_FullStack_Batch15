const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("layout", "./layout/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.render("index", { title: "Homepage", name: "Fauzan Yusuf" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.use("/contact", contactRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Halaman tidak ditemukan" });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
