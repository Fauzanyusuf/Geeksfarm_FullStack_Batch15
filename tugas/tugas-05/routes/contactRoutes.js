const express = require("express");
const { body } = require("express-validator");
const { readData } = require("../utils/fileUtils");
const controller = require("../controllers/contactController");

const router = express.Router();

const validationRules = [
  body("name").notEmpty().withMessage("Name cannot be empty."),
  body("phone")
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number.")
    .custom(async (value, { req }) => {
      const contacts = await readData();
      const { id } = req.params;
      const isDuplicate = contacts.some(
        (contact, index) =>
          contact.phone === value && (id === undefined || index != id)
      );
      if (isDuplicate) {
        throw new Error("Phone number is already in use.");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("Invalid email.")
    .custom(async (value, { req }) => {
      const contacts = await readData();
      const { id } = req.params;
      const isDuplicate = contacts.some(
        (contact, index) =>
          contact.email === value && (id === undefined || index != id)
      );
      if (isDuplicate) {
        throw new Error("Email is already in use.");
      }
      return true;
    }),
];

router.get("/", controller.showContacts);
router.post("/add", validationRules, controller.addContact);
router.post("/edit/:id", validationRules, controller.updateContact);
router.post("/delete/:id", controller.deleteContact);

module.exports = router;
