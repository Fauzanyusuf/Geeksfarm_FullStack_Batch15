const { getValidatedInput, closeInput } = require("./utils/inputValidator");
const { initDataFile, readData, saveData } = require("./utils/fileUtils");
const {
  validateName,
  validatePhone,
  validateEmail,
} = require("./utils/validators");

async function main() {
  await initDataFile();

  const name = await getValidatedInput(
    "Siapa nama kamu? ",
    validateName,
    "Masukkan nama dengan format yang benar."
  );

  const phone = await getValidatedInput(
    "Apa nomor telepon kamu? ",
    validatePhone,
    "Masukkan nomor telepon dengan format yang benar."
  );

  const email = await getValidatedInput(
    "Apa alamat email kamu? ",
    validateEmail,
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
