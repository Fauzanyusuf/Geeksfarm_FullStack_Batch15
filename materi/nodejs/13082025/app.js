const readline = require("readline");
const validator = require("validator");
const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "data");
const filePath = path.join(dirPath, "data.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (ask) => {
  return new Promise((res) => {
    rl.question(ask, (answer) => {
      res(answer);
    });
  });
};

const main = async () => {
  let name, phone, email;

  do {
    name = await question("Siapa namamu? ");
    if (!validator.isAlphanumeric(name, "en-US", { ignore: " " })) {
      console.log("Masukkan nama dengan format yang benar");
    }
  } while (!validator.isAlphanumeric(name, "en-US", { ignore: " " }));

  do {
    phone = await question("Apa nomor teleponmu? ");
    if (!validator.isMobilePhone(phone, "id-ID")) {
      console.log("Masukkan nomor telepon dengan format yang benar");
    }
  } while (!validator.isMobilePhone(phone, "id-ID"));

  do {
    email = await question("Apa alamat emailmu? ");
    if (!validator.isEmail(email)) {
      console.log("Masukkan alamat email dengan format yang benar");
    }
  } while (!validator.isEmail(email));

  const data = { name, phone, email };

  console.log(
    `Hello ${data.name}, nomor teleponmu ${data.phone} dan alamat emailmu ${data.email}`
  );

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  let jsonFileData = [];

  try {
    const file = fs.readFileSync(filePath, "utf-8");
    jsonFileData = JSON.parse(file);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File data/data.json belum ada, membuat file baru...");
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      jsonFileData = [];
    } else {
      throw error;
    }
  }

  jsonFileData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(jsonFileData, null, 2));

  rl.close();
};

main();
