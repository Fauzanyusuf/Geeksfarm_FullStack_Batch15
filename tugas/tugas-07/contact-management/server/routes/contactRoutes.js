const express = require("express");
const { contactValidationRules } = require("../utils/contactValidation");
const controller = require("../controllers/contactController");

const router = express.Router();

router.get("/", controller.showContacts);
router.post("/", contactValidationRules, controller.addContact);
router.put("/:id", contactValidationRules, controller.updateContact);
router.delete("/:id", controller.deleteContact);

module.exports = router;
