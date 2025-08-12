const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Dengan penggunaan nested
rl.question("What is your name? ", (name) => {
  rl.question("What is your number? ", (number) => {
    console.log(`Hello ${name}, your number is ${number}`);
    rl.close();
  });
});
// Nama variabel harus menggunakan bahasa Inggris
// Nama harus seusai dengan value