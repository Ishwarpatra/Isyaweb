/**
 * axe-audit.js — Run axe-core on multiple pages via @axe-core/playwright
 * Usage: node scripts/axe-audit.js
 */
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

const PAGES = [
  'http://localhost:4173/',
  'http://localhost:4173/register',
  'http://localhost:4173/login',
  'http://localhost:4173/blog',
  'http://localhost:4173/blog/1',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  let totalViolations = 0;
  const report = [];

  for (const url of PAGES) {
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      // Small wait to let React hydrate fully
      await page.waitForTimeout(1500);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
        .analyze();

      const count = results.violations.length;
      totalViolations += count;
      report.push({ url, count, violations: results.violations });

      console.log(`\n${count === 0 ? '✅' : '❌'} ${url} — ${count} violation(s)`);
      if (count > 0) {
        results.violations.forEach(v => {
          console.log(`   [${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
          console.log(`   Affects ${v.nodes.length} node(s) — ${v.helpUrl}`);
        });
      }
    } catch (err) {
      console.log(`⚠️  ${url} — Error: ${err.message}`);
      report.push({ url, count: -1, error: err.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('\n══════════════════════════════════════════');
  console.log(`Pages audited   : ${PAGES.length}`);
  console.log(`Total violations: ${totalViolations}`);
  console.log('══════════════════════════════════════════');
  report.forEach(r => {
    const icon = r.count === 0 ? '✅' : r.count === -1 ? '⚠️ ' : '❌';
    console.log(`  ${icon}  ${r.url}  →  ${r.count === -1 ? r.error : r.count + ' violations'}`);
  });

  process.exit(totalViolations > 0 ? 1 : 0);
})();
