const fs = require('fs');
const dir = './src/assets';
const files = fs.readdirSync(dir);
for (const file of files) {
  const stats = fs.statSync(`${dir}/${file}`);
  console.log(`${file}: ${stats.size} bytes`);
}
