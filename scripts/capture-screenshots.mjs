import puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir =
  "C:\\Users\\RAMESHWAR\\.gemini\\antigravity-ide\\brain\\651dd49d-ae83-4f57-ac7f-5758f4f34d35\\screenshots";

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const pages = [
  { name: "home", url: "http://localhost:3000", waitMs: 3000 },
  { name: "about", url: "http://localhost:3000/about", waitMs: 3000 },
  { name: "products", url: "http://localhost:3000/products", waitMs: 3000 },
  {
    name: "product-plough",
    url: "http://localhost:3000/products/heavy-duty-hydraulic-reversible-plough",
    waitMs: 3000,
  },
  {
    name: "fabrication",
    url: "http://localhost:3000/fabrication",
    waitMs: 3000,
  },
  { name: "gallery", url: "http://localhost:3000/gallery", waitMs: 3000 },
  { name: "contact", url: "http://localhost:3000/contact", waitMs: 3000 },
];

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const page of pages) {
    try {
      console.log(`Capturing: ${page.name} (${page.url})`);
      const tab = await browser.newPage();
      await tab.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await tab.goto(page.url, { waitUntil: "networkidle0", timeout: 30000 });
      await new Promise((r) => setTimeout(r, page.waitMs));

      const outputPath = path.join(outputDir, `${page.name}.png`);
      await tab.screenshot({ path: outputPath, fullPage: true });
      console.log(`  ✓ Saved: ${outputPath}`);
      await tab.close();
    } catch (err) {
      console.error(`  ✗ Failed ${page.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log("\nAll screenshots done.");
})();
