const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://hernexa.com';

const routes = [
  '/',
  '/tools',
  '/due-date-calculator',
  '/conception-calculator',
  '/ovulation-calculator',
  '/pregnancy-weight-gain-calculator',
  '/pregnancy-week-calculator',
  '/period-calculator',
  '/pregnancy-calorie-calculator',
  '/pcos-calculator',
  '/menopause-checker',
  '/time-to-conceive-calculator',
  '/egg-freezing-calculator',
  '/ivf-success-rate-calculator',
  '/embryo-transfer-date-calculator',
  '/miscarriage-risk-calculator',
  '/baby-size-comparator',
  '/fertility-window-calculator',
  '/due-date-by-conception',
  '/menstrual-cycle-length-calculator',
  '/ovulation-pain-calculator',
  '/ovulation-calendar',
  '/period-symptom-tracker',
  '/womens-bmi-calculator',
  '/womens-tdee-calculator',
  '/ideal-body-weight-calculator',
  '/water-intake-calculator',
  '/breast-cancer-risk-calculator',
  '/macros-calculator',
  '/thyroid-risk-calculator',
  '/osteoporosis-risk-calculator',
  '/heart-disease-risk-calculator',
  '/endometriosis-risk-calculator',
  '/epds-screener',
  '/baby-growth-percentile',
  '/category/pregnancy',
  '/category/ovulation',
  '/category/period',
  '/category/nutrition',
  '/category/postpartum',
  '/category/health-risk'
];

const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

routes.forEach(route => {
  // Determine priority and changefreq
  let priority = '0.8';
  let changefreq = 'weekly';
  
  if (route === '/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (route.startsWith('/category/')) {
    priority = '0.9';
    changefreq = 'weekly';
  }

  sitemap += `  <url>\n`;
  sitemap += `    <loc>${DOMAIN}${route}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
  sitemap += `    <priority>${priority}</priority>\n`;
  sitemap += `  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('sitemap.xml generated successfully.');

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robotsTxt);
console.log('robots.txt generated successfully.');
