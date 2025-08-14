const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt) {
  return new Promise((res) => rl.question(prompt, res));
}

async function getValidatedInput(prompt, validateFunction, errMsg) {
  let value;
  do {
    value = await ask(prompt);
    if (!validateFunction(value)) {
      console.log(errMsg);
    }
  } while (!validateFunction(value));
  return value;
}

function closeInput() {
  rl.close();
}

module.exports = {
  ask,
  getValidatedInput,
  closeInput,
};
