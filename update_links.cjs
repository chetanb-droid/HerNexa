const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const terms = [
  { term: "due date", path: "/due-date-calculator" },
  { term: "ovulation", path: "/ovulation-calculator" },
  { term: "BMI", path: "/womens-bmi-calculator" },
  { term: "weight gain", path: "/pregnancy-weight-gain-calculator" },
  { term: "menstrual cycle", path: "/period-calculator" },
  { term: "fertile window", path: "/fertility-window-calculator" },
  { term: "basal body temperature", path: "/bbt-analyzer" },
  { term: "PCOS", path: "/pcos-calculator" },
  { term: "postpartum depression", path: "/epds-screener" }
];

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  let modified = false;

  // Find the intro string: intro="some text"
  const introMatch = content.match(/intro="([^"]+)"/);
  if (introMatch) {
    let introText = introMatch[1];
    let originalIntro = introText;

    // Try to replace terms
    for (const { term, path } of terms) {
      // Don't link to the current page
      if (file.toLowerCase().includes(term.toLowerCase().replace(/\s+/g, '-'))) continue;
      
      const regex = new RegExp(`\\b(${term})\\b`, 'i');
      if (regex.test(introText)) {
        introText = introText.replace(regex, `<Link to="${path}" className="text-primary hover:underline font-medium">$1</Link>`);
        // Only do one replacement per intro to keep it clean
        break;
      }
    }

    if (introText !== originalIntro) {
      content = content.replace(`intro="${originalIntro}"`, `intro={<>${introText}</>}`);
      modified = true;
    }
  }

  // Add Link import if needed
  if (modified && !content.includes('import { Link }')) {
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

console.log(`Updated ${updatedCount} files with contextual links.`);
