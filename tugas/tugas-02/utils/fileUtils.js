const fs = require("fs").promises;
const path = require("path");

const DATA_FOLDER = path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_FOLDER, "data.json");

async function initDataFile() {
  const dir = path.dirname(DATA_FILE);

  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    console.log(`\nMembuat file baru: ${DATA_FILE}\n`);
  }
}

async function readData() {
  const content = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(content);
}

async function saveData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  initDataFile,
  readData,
  saveData,
};
