const { body } = require("express-validator");
const pool = require("./db");

function checkUniqueField(field) {
  return async (value, { req }) => {
    const { id } = req.params;
    const query = id
      ? `SELECT 1 FROM contacts WHERE ${field} = $1 AND id <> $2`
      : `SELECT 1 FROM contacts WHERE ${field} = $1`;
    const params = id ? [value, id] : [value];

    const { rowCount } = await pool.query(query, params);
    if (rowCount > 0) {
      throw new Error(`${field} is already in use.`);
    }
    return true;
  };
}

exports.contactValidationRules = [
  body("name").notEmpty().withMessage("Name cannot be empty."),
  body("phone")
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number.")
    .custom(checkUniqueField("phone")),
  body("email")
    .isEmail()
    .withMessage("Invalid email.")
    .custom(checkUniqueField("email")),
];
