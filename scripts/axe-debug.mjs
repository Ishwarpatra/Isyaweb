import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('http://localhost:4173/blog/1', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(2000);

const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
  .analyze();

results.violations.forEach(v => {
  console.log(`\n[${v.impact}] ${v.id}: ${v.description}`);
  v.nodes.forEach((n, i) => {
    console.log(`  Node ${i+1}:`);
    console.log(`  Snippet: ${n.html}`);
    console.log(`  Target: ${n.target}`);
    console.log(`  Fix: ${n.failureSummary}`);
  });
});

await browser.close();
