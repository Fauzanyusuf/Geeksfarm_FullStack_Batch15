const { validationResult } = require("express-validator");
const pool = require("../utils/db");

function getContacts() {
  return pool.query("SELECT * FROM contacts ORDER BY id ASC");
}

async function showContacts(req, res, next) {
  try {
    const contacts = await getContacts();
    res.status(200).json(contacts.rows);
  } catch (err) {
    next(err);
  }
}

async function addContact(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, phone, email } = req.body;
    const newContact = await pool.query(
      "INSERT INTO contacts (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, email]
    );
    res.status(201).json({
      message: "Contact added successfully.",
      contact: newContact.rows[0],
    });
  } catch (err) {
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, phone, email } = req.body;
    const updatedContact = await pool.query(
      "UPDATE contacts SET name = $1, phone = $2, email = $3 WHERE id = $4 RETURNING *",
      [name, phone, email, id]
    );
    if (updatedContact.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json({
      message: "Contact updated successfully.",
      contact: updatedContact.rows[0],
    });
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (err) {
    next(err);
  }
}

module.exports = { showContacts, addContact, updateContact, deleteContact };
