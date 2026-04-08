const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  let modified = false;

  // 1. Add CTA
  if (!content.includes('Next Step CTA') && content.includes('results={results && (')) {
    const relatedMatch = content.match(/relatedTools={\[\s*{\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"/);
    if (relatedMatch) {
      const nextName = relatedMatch[1];
      const nextPath = relatedMatch[2];

      const ctaBlock = `
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our ${nextName}.</p>
            </div>
            <Link to="${nextPath}" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              ${nextName} &rarr;
            </Link>
          </div>`;

      if (content.includes('</motion.div>\n      )}')) {
        content = content.replace('</motion.div>\n      )}', ctaBlock + '\n        </motion.div>\n      )}');
        modified = true;
      } else if (content.includes('</div>\n      )}')) {
        content = content.replace('</div>\n      )}', ctaBlock + '\n        </div>\n      )}');
        modified = true;
      }
    }
  }

  // 2. Add Link import if needed
  if (modified && !content.includes('import { Link }')) {
    // Insert after the first import
    const importMatch = content.match(/import.*?;/);
    if (importMatch) {
      content = content.replace(importMatch[0], importMatch[0] + "\nimport { Link } from 'react-router-dom';");
    } else {
      content = "import { Link } from 'react-router-dom';\n" + content;
    }
  }

  if (modified) {
    fs.writeFileSync(path.join(pagesDir, file), content);
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} files with CTAs.`);
