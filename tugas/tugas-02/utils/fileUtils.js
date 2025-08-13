const fs = require("fs").promises;
const path = require("path");

async function ensureDataFile(filePath) {
  const dir = path.dirname(filePath);

  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
    console.log(`\nMembuat file baru: ${filePath}\n`);
  }
}

module.exports = {
  ensureDataFile,
};
