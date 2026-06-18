import fs from 'fs';
import path from 'path';

const astroPagesDir = path.join(process.cwd(), 'src/pages');
const reactPagesDir = path.join(process.cwd(), 'src/react-pages');

const files = fs.readdirSync(astroPagesDir);

for (const file of files) {
  if (file.endsWith('.astro') && file !== 'index.astro' && file !== 'tools.astro' && !file.startsWith('category')) {
    const astroPath = path.join(astroPagesDir, file);
    const content = fs.readFileSync(astroPath, 'utf8');

    // Find the imported react page
    const match = content.match(/from '\.\.\/react-pages\/([^']+)'/);
    if (match) {
      const reactFile = path.join(reactPagesDir, match[1]);
      if (!fs.existsSync(reactFile)) {
        console.log(`React file missing for ${file}: ${reactFile}. Deleting ${file}`);
        fs.unlinkSync(astroPath);
      }
    }
  }
}
