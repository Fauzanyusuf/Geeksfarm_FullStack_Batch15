const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initDataFile, readData, saveData } = require("./utils/fileUtils");
const {
  validateName,
  validatePhone,
  validateEmail,
} = require("./utils/validators");

const findContactIndex = (data, keyword) =>
  data.findIndex(
    (c) =>
      c.name.toLowerCase() === keyword ||
      c.phone.toLowerCase() === keyword ||
      c.email.toLowerCase() === keyword
  );

const findContact = (data, keyword) =>
  data.find(
    (c) =>
      c.name.toLowerCase() === keyword ||
      c.phone.toLowerCase() === keyword ||
      c.email.toLowerCase() === keyword
  );

const validateAndUpdate = (contact, updates) => {
  if (updates.newName) {
    if (!validateName(updates.newName)) {
      console.error("Nama tidak valid.");
      return false;
    }
    contact.name = updates.newName;
  }
  if (updates.phone) {
    if (!validatePhone(updates.phone)) {
      console.error("Nomor telepon tidak valid.");
      return false;
    }
    contact.phone = updates.phone;
  }
  if (updates.email) {
    if (!validateEmail(updates.email)) {
      console.error("Email tidak valid.");
      return false;
    }
    contact.email = updates.email;
  }
  return true;
};

async function main() {
  await initDataFile();
  const data = await readData();

  yargs(hideBin(process.argv))
    // ADD
    .command({
      command: "add",
      describe: "Menambah data baru",
      builder: {
        name: { demandOption: true, type: "string", describe: "Nama" },
        phone: {
          demandOption: true,
          type: "string",
          describe: "Nomor Telepon",
        },
        email: { demandOption: true, type: "string", describe: "Email" },
      },
      async handler(argv) {
        if (
          !validateName(argv.name) ||
          !validatePhone(argv.phone) ||
          !validateEmail(argv.email)
        ) {
          console.error("Data tidak valid. Pastikan format benar.");
          return;
        }

        data.push({ name: argv.name, phone: argv.phone, email: argv.email });
        await saveData(data);

        console.log(`Data berhasil disimpan untuk ${argv.name}`);
      },
    })

    // LIST
    .command({
      command: "list",
      describe: "Menampilkan semua data",
      async handler() {
        data.length ? console.table(data) : console.log("Data kosong.");
      },
    })

    // DETAIL
    .command({
      command: "detail",
      describe: "Menampilkan detail data berdasarkan kata kunci",
      builder: {
        search: {
          demandOption: true,
          type: "string",
          describe: "Kata kunci pencarian",
        },
      },
      async handler(argv) {
        const keyword = argv.search.toLowerCase();
        const contact = findContact(await readData(), keyword);

        contact ? console.log(contact) : console.log("Data tidak ditemukan");
      },
    })

    // UPDATE
    .command({
      command: "update",
      describe: "Memperbarui data (partial update)",
      builder: {
        keyword: {
          demandOption: true,
          type: "string",
          describe: "Kata kunci pencarian",
        },
        newName: { type: "string", describe: "Nama baru" },
        phone: { type: "string", describe: "Nomor Telepon baru" },
        email: { type: "string", describe: "Email baru" },
      },
      async handler(argv) {
        const keyword = argv.keyword.toLowerCase();
        const index = findContactIndex(data, keyword);

        if (index === -1) return console.log("Data tidak ditemukan");

        if (!validateAndUpdate(data[index], argv)) return;

        await saveData(data);
        console.log("Data berhasil diperbarui!");
      },
    })

    // DELETE
    .command({
      command: "delete",
      describe: "Menghapus data berdasarkan kata kunci (exact match)",
      builder: {
        keyword: {
          demandOption: true,
          type: "string",
          describe: "Kata kunci yang mau dihapus",
        },
      },
      async handler(argv) {
        const keyword = argv.keyword.toLowerCase();
        const index = findContactIndex(data, keyword);

        if (index === -1) return console.log("Data tidak ditemukan");

        data.splice(index, 1);
        await saveData(data);
        console.log("Data berhasil dihapus!");
      },
    })

    .parse();
}

main();
