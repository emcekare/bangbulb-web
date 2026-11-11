/**
 * Klavye erişilebilirliği duman testi.
 *
 * Geçici çalıştırma (statik export bir sunucuda ayakta olmalı):
 *   npx next build && npx serve -l 4321 <out klasörünün ebeveyni>
 *   node e2e/a11y-keyboard.mjs
 *
 * NOT: Bu dosya #15'te @playwright/test formatına taşınacak; şimdilik
 * bağımlılıksız çalışsın diye düz script olarak duruyor.
 */
import { chromium } from "playwright";

const BASE = process.env.E2E_BASE ?? "http://localhost:4321/bangbulb-web/";
const LOADER_MS = 3500;

const results = [];
const check = (name, ok) => results.push([name, ok]);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(LOADER_MS);

/** Bir modalın tüm klavye sözleşmesini doğrular. */
async function testModal(name, open, selector) {
  await open();
  await page.waitForTimeout(400);
  const dialog = page.locator(selector);
  const inside = () =>
    page.evaluate((s) => {
      const el = document.querySelector(s);
      return !!el && el.contains(document.activeElement);
    }, selector);

  check(`${name}: açıldı`, (await dialog.count()) > 0);
  check(
    `${name}: role=dialog + aria-modal`,
    await dialog
      .first()
      .evaluate(
        (e) =>
          e.getAttribute("role") === "dialog" &&
          e.getAttribute("aria-modal") === "true"
      )
  );
  check(
    `${name}: erişilebilir isim var`,
    await dialog
      .first()
      .evaluate(
        (e) => !!(e.getAttribute("aria-label") || e.getAttribute("aria-labelledby"))
      )
  );
  check(`${name}: focus modalın içinde`, await inside());

  let escaped = false;
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press("Tab");
    if (!(await inside())) {
      escaped = true;
      break;
    }
  }
  check(`${name}: focus tuzağı tutuyor`, !escaped);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  check(`${name}: Escape kapattı`, (await page.locator(selector).count()) === 0);
  check(
    `${name}: scroll kilidi çözüldü`,
    await page.evaluate(() => document.body.style.overflow !== "hidden")
  );
}

// --- Works kartı: klavyeyle odaklanıp Enter ile açılmalı ---------------------
const card = page.locator('article.hwork[role="button"]');
await card.scrollIntoViewIfNeeded();
await card.focus();
check(
  "Works kartı odaklanabiliyor",
  await card.evaluate((el) => el === document.activeElement)
);
await testModal(
  "Works modal",
  async () => page.keyboard.press("Enter"),
  '[role="dialog"][aria-modal="true"]'
);
check(
  "Works: focus tetikleyen karta döndü",
  await card.evaluate((el) => el === document.activeElement)
);

// --- Diğer modallar ---------------------------------------------------------
await testModal(
  "ContactModal",
  async () => page.locator(".nav__cta").first().click(),
  '.cmodal[role="dialog"]'
);
await testModal(
  "ClientsModal",
  async () => {
    const btn = page.getByRole("button", { name: /Tüm Referansları Gör/i });
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  },
  '.cmodal--active[role="dialog"]'
);

// --- Sahte linkler: href'siz <a> kalmamalı -----------------------------------
check(
  "href'siz <a> yok",
  (await page.locator("a:not([href])").count()) === 0
);

for (const [name, ok] of results) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
}
await browser.close();
process.exit(results.every(([, ok]) => ok) ? 0 : 1);
