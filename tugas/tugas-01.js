/*
tugas-01
Buatkan pertanyaan mengenai nama, nomor telepon, dan email menggunakan readline
dan validator module untuk memvalidasi input dari user
menampilkan output nama, nomor telepon, dan email yang sudah sesuai dengan validator
*/

// Memuat atau mengimpor modul ekternal
const readline = require("readline");
const validator = require("validator");

// Inisialisasi readline untuk interaksi dengan user lewat terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
Fungsi untuk mengajukan pertanyaan ke user, validasi jawaban,
mengulang pertanyaan apabila input tidak valid, dan memanggil pertanyaan selanjutnya
*/
function askQuestion(question, validateFunction, err, callback) {
  rl.question(question, (answer) => {
    const input = answer.trim(); // Menghapus spasi di awal dan akhir
    if (validateFunction(input)) {
      // Jika valid maka jalankan callback
      callback(input);
    } else {
      console.log(err); // Jika tidak valid maka tampilkan pesan error
      askQuestion(question, validateFunction, err, callback); // Mengulang pertanyaan
    }
  });
}

askQuestion(
  // 1. Pertanyaan untuk nama
  "Masukkan Nama Anda: ",
  (val) => validator.isAlphanumeric(val, "en-US", { ignore: " " }),
  "Nama hanya boleh berisi huruf dan angka.",
  (name) => {
    askQuestion(
      // 2. Pertanyaan untuk nomor telepon
      "Masukkan Nomor Telepon Anda: ",
      (val) => validator.isMobilePhone(val, "id-ID"),
      "Nomor telepon tidak valid.",
      (phone) => {
        askQuestion(
          // 3. Pertanyaan untuk email
          "Masukkan Email Anda: ",
          validator.isEmail,
          "Email tidak valid.",
          (email) => {
            // Output hasil input user
            console.log(
              `\nHalo ${name}, Nomor teleponmu adalah ${phone} dan emailmu yaitu ${email}`
            );
            rl.close();
          }
        );
      }
    );
  }
);
