const { validationResult } = require("express-validator");
const { readData, saveData } = require("../utils/fileUtils");

const getContacts = async () => readData();

exports.showContacts = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.render("contact", {
      title: "Contact",
      data: contacts,
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
      data: contacts,
      notification: {
        type: "danger",
        message: errors.array().map((err) => err.msg),
      },
      prevInput: req.body,
      openModal: "addModal",
    });
  }

  const { name, phone, email } = req.body;
  contacts.push({ name, phone, email });
  await saveData(contacts);

  res.redirect("/contact");
};

exports.updateContact = async (req, res) => {
  const errors = validationResult(req);
  const contacts = await getContacts();
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.render("contact", {
      title: "Contact",
      data: contacts,
      notification: {
        type: "danger",
        message: errors.array().map((err) => err.msg),
      },
      prevInput: req.body,
      id: id,
      openModal: "editModal",
    });
  }

  const { name, phone, email } = req.body;
  if (contacts[id]) {
    contacts[id] = { name, phone, email };
    await saveData(contacts);
  }
  res.redirect("/contact");
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contacts = await getContacts();
    if (contacts[id]) {
      contacts.splice(id, 1);
      await saveData(contacts);
    }
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting a contact.");
  }
};
