import fs from 'fs';
import path from 'path';

const astroPagesDir = path.join(process.cwd(), 'src/pages');

const files = fs.readdirSync(astroPagesDir);

for (const file of files) {
  if (file.endsWith('.astro') && file !== 'index.astro') {
    const astroPath = path.join(astroPagesDir, file);
    const content = fs.readFileSync(astroPath, 'utf8');

    // Extract title from <Layout title="...">
    const titleMatch = content.match(/<Layout[^>]*title="([^"]+)"/);
    const descMatch = content.match(/<Layout[^>]*description="([^"]+)"/);

    if (titleMatch) {
      const title = titleMatch[1];
      const desc = descMatch ? descMatch[1] : '';
      
      const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": title,
        "description": desc,
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };

      const schemaString = JSON.stringify(schema).replace(/\\/g, '\\\\').replace(/"/g, '&quot;');
      
      // Update Layout tag to include schema prop
      // Since it's Astro, we can just pass a string prop like schema="...JSON..."
      // But passing an HTML encoded string via astro prop:
      // Actually, passing `schema={JSON.stringify({...})}` directly as a JS expression in Astro is cleaner!
      
      let newLayoutTag = '';
      if (descMatch) {
          newLayoutTag = `<Layout title="${title}" description="${desc}" schema={JSON.stringify(${JSON.stringify(schema)})}>`;
      } else {
          newLayoutTag = `<Layout title="${title}" schema={JSON.stringify(${JSON.stringify(schema)})}>`;
      }

      // We should match the entire old layout tag:
      // Note: Sometimes <Layout ... > spans multiple lines or has arbitrary order,
      // but in our earlier script we standardized it: <Layout title="..." description="...">
      const oldTagRegex = /<Layout[^>]*>/;
      const updatedContent = content.replace(oldTagRegex, newLayoutTag);
      
      fs.writeFileSync(astroPath, updatedContent);
      console.log(`Added Schema to ${file}`);
    }
  }
}
