import fs from 'fs';
import path from 'path';

function replaceInDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      // Replace <Link to="..."> with <a href="...">
      if (content.includes('<Link ')) {
        content = content.replace(/<Link\s+to=({[^}]+}|"[^"]+"|'[^']+')([^>]*)>/g, '<a href=$1$2>');
        content = content.replace(/<\/Link>/g, '</a>');
        changed = true;
      }
      
      // Remove import { Link } from 'react-router-dom';
      if (content.includes('react-router-dom')) {
        content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"];?\\n?/g, (match, p1) => {
          const imports = p1.split(',').map(i => i.trim());
          if (imports.includes('Link') && imports.length === 1) {
            return '';
          }
          const remaining = imports.filter(i => i !== 'Link');
          if (remaining.length > 0) {
            return `import { ${remaining.join(', ')} } from 'react-router-dom';\n`;
          }
          return '';
        });
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated Links in ${fullPath}`);
      }
    }
  }
}

replaceInDir('./src');
console.log('Link replacement complete!');
