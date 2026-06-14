import fs from 'fs';
import path from 'path';

const reactPagesDir = path.join(process.cwd(), 'src/react-pages');
const astroPagesDir = path.join(process.cwd(), 'src/pages');

if (!fs.existsSync(astroPagesDir)) {
  fs.mkdirSync(astroPagesDir, { recursive: true });
}

function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const files = fs.readdirSync(reactPagesDir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const name = file.replace('.tsx', '');
    
    // We map react component name to URL slug
    // E.g., DueDateCalculator -> due-date-calculator
    let slug = toKebabCase(name);
    
    if (name === 'Home') slug = 'index';
    if (name === 'HealthTools') slug = 'tools';
    
    // some special cases based on App.tsx:
    if (name === 'DueDateByConceptionCalculator') slug = 'due-date-by-conception';
    if (name === 'ChineseGenderPredictor') slug = 'chinese-gender-predictor'; // normally fine
    
    const astroContent = `---
import Layout from '../layouts/Layout.astro';
import PageComponent from '../react-pages/${file}';
---

<Layout>
  <PageComponent client:load />
</Layout>
`;

    fs.writeFileSync(path.join(astroPagesDir, `${slug}.astro`), astroContent);
    console.log(`Generated src/pages/${slug}.astro`);
  }
}

console.log('Astro pages generation complete!');
