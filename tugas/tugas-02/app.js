const validator = require("validator");
const { getValidatedInput, closeInput } = require("./utils/inputValidator");
const { initDataFile, readData, saveData } = require("./data/data");

async function main() {
  await initDataFile();

  const name = await getValidatedInput(
    "Siapa nama kamu? ",
    (val) => validator.isAlphanumeric(val, "en-US", { ignore: " " }),
    "Masukkan nama dengan format yang benar."
  );

  const phone = await getValidatedInput(
    "Apa nomor telepon kamu? ",
    (val) => validator.isMobilePhone(val, "id-ID"),
    "Masukkan nomor telepon dengan format yang benar."
  );

  const email = await getValidatedInput(
    "Apa alamat email kamu? ",
    (val) => validator.isEmail(val),
    "Masukkan alamat email dengan format yang benar."
  );

  const newData = { name, phone, email };
  console.log(
    `\nHalo ${name}, nomor teleponmu ${phone} dan alamat emailmu ${email}`
  );

  const data = await readData();
  data.push(newData);
  await saveData(data);

  console.log("\nData berhasil disimpan!");
  closeInput();
}

main();
