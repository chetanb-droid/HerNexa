import fs from 'fs';
import path from 'path';

function removeReactRouter(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeReactRouter(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('react-router-dom')) {
        content = content.replace(/import\s+.*['"]react-router-dom['"];?\\n?/g, '');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

removeReactRouter('./src');
