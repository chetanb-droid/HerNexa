import fs from 'fs';
import path from 'path';

const map = {
  'pmddscreener.astro': 'pmdd-screener.astro',
  'vbaccalculator.astro': 'vbac-calculator.astro',
  'ivfsuccess-rate-calculator.astro': 'ivf-success-rate-calculator.astro',
  'womens-bmicalculator.astro': 'womens-bmi-calculator.astro',
  'womens-tdeecalculator.astro': 'womens-tdee-calculator.astro',
  'pregnancy-bmicalculator.astro': 'pregnancy-bmi-calculator.astro',
  'bbtanalyzer.astro': 'bbt-analyzer.astro',
  'vaginal-phguide.astro': 'vaginal-ph-guide.astro'
};

for (const [oldName, newName] of Object.entries(map)) {
  const oldPath = path.join('src/pages', oldName);
  const newPath = path.join('src/pages', newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
}
