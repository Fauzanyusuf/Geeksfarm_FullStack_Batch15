const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult } = require("express-validator");
const { readData, saveData } = require("./utils/fileUtils");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "./layout/layout");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const contactValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty.")
    .bail()
    .isString()
    .withMessage("The name must be text."),
  body("phone")
    .notEmpty()
    .withMessage("Phone number cannot be empty.")
    .bail()
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number."),
  body("email")
    .notEmpty()
    .withMessage("Email must not be empty.")
    .bail()
    .isEmail()
    .withMessage("Invalid email."),
];

const handleContactAction = async (type, req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { name, phone, email } = req.body;
  const { id } = req.params;

  try {
    const data = await readData();

    if (type === "edit") {
      if (data[id] === undefined) {
        return res.status(404).send("Contact not found.");
      }
      data[id] = { name, phone, email };
    } else {
      // type === "add"
      data.push({ name, phone, email });
    }

    await saveData(data);
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send(`An error occurred while ${type}ing a contact.`);
  }
};

app.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage",
    name: "Fauzan Yusuf",
  });
});

app.get("/contact", async (req, res) => {
  try {
    const data = await readData();
    res.render("contact", {
      title: "Contact Page",
      data,
    });
  } catch (err) {
    res.status(500).send("An error occurred while reading the data.");
  }
});

app.post("/contact/add", contactValidation, (req, res) => {
  handleContactAction("add", req, res);
});

app.post("/contact/edit/:id", contactValidation, (req, res) => {
  handleContactAction("edit", req, res);
});

app.post("/contact/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await readData();
    if (data[id] === undefined) {
      return res.status(404).send("Contact not found.");
    }
    data.splice(id, 1);
    await saveData(data);
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting a contact");
  }
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
