const fs = require("fs").promises;
const { ensureDataFile } = require("./fileUtils");
const path = require("path");

const DATA_FOLDER = path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_FOLDER, "data.json");

async function initDataFile() {
  await ensureDataFile(DATA_FILE);
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
