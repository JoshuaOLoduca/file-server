const readline = require('readline');

const handleUserInput = function(data, conn) {
  if (data === '\u0003') {
    process.exit();
  }
  conn.write(data);
};

const setupInput = function(conn) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const stdin = process.stdin;
  rl.resume();
  rl.question("Dir of File", data => handleUserInput(data, conn));
  return stdin;
};

module.exports = setupInput;