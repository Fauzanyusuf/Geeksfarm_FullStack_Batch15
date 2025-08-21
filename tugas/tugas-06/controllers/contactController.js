const { validationResult } = require("express-validator");
const pool = require("../utils/db");

const getContacts = async () => {
  return pool.query("SELECT * FROM contacts ORDER BY id ASC");
};

exports.showContacts = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.render("contact", {
      title: "Contact",
      data: contacts.rows,
      notification: null,
      prevInput: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while reading the data.");
  }
};

exports.addContact = async (req, res) => {
  const errors = validationResult(req);
  const contacts = await getContacts();

  if (!errors.isEmpty()) {
    return res.render("contact", {
      title: "Contact",
      data: contacts.rows,
      notification: {
        type: "danger",
        message: errors.array().map((err) => err.msg),
      },
      prevInput: req.body,
      openModal: "addModal",
    });
  }
  try {
    const { name, phone, email } = req.body;
    await pool.query(
      "INSERT INTO contacts (name, phone, email) VALUES ($1, $2, $3)",
      [name, phone, email]
    );
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add a contact.");
  }
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  const contacts = await getContacts();

  if (!errors.isEmpty()) {
    return res.render("contact", {
      title: "Contact",
      data: contacts.rows,
      notification: {
        type: "danger",
        message: errors.array().map((err) => err.msg),
      },
      prevInput: req.body,
      id: id,
      openModal: "editModal",
    });
  }

  try {
    const { name, phone, email } = req.body;
    await pool.query(
      "UPDATE contacts SET name = $1, phone = $2, email = $3 WHERE id = $4",
      [name, phone, email, id]
    );
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update contacts.");
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  const contacts = await getContacts();

  try {
    await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting a contact.");
  }
};
