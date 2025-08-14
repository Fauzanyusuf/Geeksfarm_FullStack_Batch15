const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const y = yargs(hideBin(process.argv));

y.command({
  command: "add",
  describe: "Menambah data baru",
  builder: {
    name: {
      describe: "Nama",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "Nomor Telepon Seluler",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };
    console.log(contact);
  },
});

y.parse();
