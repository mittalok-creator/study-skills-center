import { chromium } from 'playwright';

const routes = ['/', '/about/', '/courses/', '/mads/', '/grades/', '/faculty/',
  '/gallery/', '/achievements/', '/events/', '/testimonials/', '/blog/', '/faq/',
  '/admissions/', '/fees/', '/contact/', '/courses/class-9-10/'];

const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
});

let bad = 0;
for (const route of routes) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 120)));
  await p.goto('http://localhost:4321' + route, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1800);

  // Scroll the whole page slowly so every ScrollTrigger fires.
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h + 2000; y += 400) {
    await p.evaluate((v) => window.scrollTo(0, v), y);
    await p.waitForTimeout(70);
  }
  await p.waitForTimeout(1500);

  const hidden = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('[data-reveal],[data-stagger]>*,[data-char],[data-hero-item],.hero-card')) {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) < 0.9) {
        out.push((el.tagName + '.' + (el.className || '').toString().slice(0, 40)).slice(0, 70));
      }
    }
    return out;
  });

  const status = hidden.length === 0 && errs.length === 0 ? 'OK  ' : 'FAIL';
  if (status === 'FAIL') bad++;
  console.log(`${status} ${route.padEnd(26)} hidden=${hidden.length} errors=${errs.length}`);
  if (hidden.length) console.log('       ', hidden.slice(0, 4));
  if (errs.length) console.log('       ', errs.slice(0, 2));
  await p.close();
}
console.log(bad === 0 ? '\nAll routes clean.' : `\n${bad} route(s) with problems.`);
await b.close();
