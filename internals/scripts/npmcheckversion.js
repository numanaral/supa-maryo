const { exec } = require('child_process');
exec('npm -v', (err, stdout) => {
  if (err) throw err;
  if (parseFloat(stdout) < 5) {
    throw new Error(`[ERROR] You need npm version @>=5 but you have ${stdout}`);
  }
});
