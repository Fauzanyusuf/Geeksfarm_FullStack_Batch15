const validator = require("validator");

function validateName(name) {
  return validator.isAlphanumeric(name || "", "en-US", { ignore: " " });
}

function validatePhone(phone) {
  return validator.isMobilePhone(phone || "", "id-ID");
}

function validateEmail(email) {
  return validator.isEmail(email || "");
}

module.exports = {
  validateName,
  validatePhone,
  validateEmail,
};
