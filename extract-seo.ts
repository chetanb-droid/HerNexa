import fs from 'fs';
import path from 'path';

const astroPagesDir = path.join(process.cwd(), 'src/pages');
const reactPagesDir = path.join(process.cwd(), 'src/react-pages');

const files = fs.readdirSync(astroPagesDir);

for (const file of files) {
  if (file.endsWith('.astro') && file !== 'index.astro') {
    const astroPath = path.join(astroPagesDir, file);
    let name = file.replace('.astro', '');
    
    // Find matching react component
    let reactFileName = '';
    const reactFiles = fs.readdirSync(reactPagesDir);
    for (const rf of reactFiles) {
      const rfKebab = rf.replace('.tsx', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      if (rfKebab === name || name === 'tools' || name === 'index' || rf.toLowerCase() === name.replace(/-/g, '') + '.tsx') {
        // approximate match
      }
    }
    
    // Actually, we can just read the astro file to find the imported page
    const astroContent = fs.readFileSync(astroPath, 'utf8');
    const match = astroContent.match(/from '\.\.\/react-pages\/([^']+)'/);
    if (match) {
      const reactFile = path.join(reactPagesDir, match[1]);
      if (fs.existsSync(reactFile)) {
        const reactContent = fs.readFileSync(reactFile, 'utf8');
        
        let title = '';
        let description = '';
        
        // Match <CalculatorLayout title="XYZ" description="ABC"
        const titleMatch = reactContent.match(/title="([^"]+)"/);
        const descMatch = reactContent.match(/description="([^"]+)"/);
        
        if (titleMatch) title = titleMatch[1];
        if (descMatch) description = descMatch[1];
        
        // Also check SEO component <SEO title="XYZ" description="ABC"
        if (!title && !description) {
           const seoTitle = reactContent.match(/<SEO[^>]*title=\{?["'\`]([^"'\`]+)["'\`]}?/);
           const seoDesc = reactContent.match(/<SEO[^>]*description=\{?["'\`]([^"'\`]+)["'\`]}?/);
           if (seoTitle) title = seoTitle[1];
           if (seoDesc) description = seoDesc[1];
        }

        if (title) {
          const updatedAstro = astroContent.replace('<Layout>', `<Layout title="${title}" description="${description}">`);
          fs.writeFileSync(astroPath, updatedAstro);
          console.log(`Updated SEO for ${file}`);
        }
      }
    }
  }
}

// Update index.astro
const indexAstroPath = path.join(astroPagesDir, 'index.astro');
if (fs.existsSync(indexAstroPath)) {
  const content = fs.readFileSync(indexAstroPath, 'utf8');
  fs.writeFileSync(indexAstroPath, content.replace('<Layout>', '<Layout title="HerNexa - Home">'));
}
