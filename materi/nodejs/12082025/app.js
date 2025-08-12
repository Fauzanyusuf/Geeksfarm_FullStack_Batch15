const validator = require("validator");

const isEmail = validator.isEmail("fauzanyusuf20@gmail.com");
const isPhone = validator.isMobilePhone("+628126907082", "id-ID");

console.log(isEmail);
console.log(isPhone);
