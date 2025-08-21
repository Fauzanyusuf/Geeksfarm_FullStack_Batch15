const express = require("express");
const { body } = require("express-validator");
const pool = require("../utils/db");
const controller = require("../controllers/contactController");

const router = express.Router();

const validationRules = [
  body("name").notEmpty().withMessage("Name cannot be empty."),

  body("phone")
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number.")
    .custom(async (value, { req }) => {
      const { id } = req.params;

      const query = id
        ? "SELECT 1 FROM contacts WHERE phone = $1 AND id <> $2"
        : "SELECT 1 FROM contacts WHERE phone = $1";
      const params = id ? [value, id] : [value];

      const { rowCount } = await pool.query(query, params);

      if (rowCount > 0) {
        throw new Error("Phone number is already in use.");
      }
      return true;
    }),

  body("email")
    .isEmail()
    .withMessage("Invalid email.")
    .custom(async (value, { req }) => {
      const { id } = req.params;

      const query = id
        ? "SELECT 1 FROM contacts WHERE email = $1 AND id <> $2"
        : "SELECT 1 FROM contacts WHERE email = $1";
      const params = id ? [value, id] : [value];

      const { rowCount } = await pool.query(query, params);

      if (rowCount > 0) {
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
