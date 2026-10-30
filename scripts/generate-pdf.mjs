import puppeteer from "puppeteer";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCREENSHOTS_DIR =
  "C:\\Users\\RAMESHWAR\\.gemini\\antigravity-ide\\brain\\651dd49d-ae83-4f57-ac7f-5758f4f34d35\\screenshots";
const OUTPUT_PDF =
  "C:\\Users\\RAMESHWAR\\.gemini\\antigravity-ide\\brain\\651dd49d-ae83-4f57-ac7f-5758f4f34d35\\Sai_Pooja_Fabrication_Website_Documentation.pdf";

function imgToBase64(filename) {
  const filepath = path.join(SCREENSHOTS_DIR, filename);
  if (!existsSync(filepath)) return null;
  const data = readFileSync(filepath);
  return "data:image/png;base64," + data.toString("base64");
}

const imgs = {
  home: imgToBase64("home.png"),
  about: imgToBase64("about.png"),
  products: imgToBase64("products.png"),
  productPlough: imgToBase64("product-plough.png"),
  fabrication: imgToBase64("fabrication.png"),
  gallery: imgToBase64("gallery.png"),
  contact: imgToBase64("contact.png"),
};

const screenshot = (src, alt, caption) =>
  src
    ? `<div class="screenshot-block">
        <img src="${src}" alt="${alt}" class="screenshot-img"/>
        <p class="screenshot-caption">▲ ${caption}</p>
       </div>`
    : `<div class="screenshot-placeholder">[ Screenshot: ${alt} ]</div>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Sai Pooja Fabrication — Website Documentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --green-900: #1a2e1a;
    --green-800: #1e3a1e;
    --green-700: #245424;
    --green-600: #2d6a2d;
    --green-500: #3a8a3a;
    --green-400: #4caf50;
    --green-100: #e8f5e9;
    --green-50:  #f1f8f1;
    --amber:     #f59e0b;
    --amber-light: #fef3c7;
    --gray-900: #111827;
    --gray-800: #1f2937;
    --gray-700: #374151;
    --gray-600: #4b5563;
    --gray-500: #6b7280;
    --gray-400: #9ca3af;
    --gray-200: #e5e7eb;
    --gray-100: #f3f4f6;
    --gray-50:  #f9fafb;
    --white: #ffffff;
    --red: #dc2626;
  }

  body {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    color: var(--gray-800);
    background: var(--white);
    font-size: 10.5pt;
    line-height: 1.65;
  }

  /* ─── COVER PAGE ─── */
  .cover {
    page-break-after: always;
    background: linear-gradient(160deg, var(--green-900) 0%, var(--green-700) 55%, #2d5a1e 100%);
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px;
    color: var(--white);
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 400px; height: 400px;
    border: 2px solid rgba(255,255,255,0.08);
    border-radius: 50%;
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -120px; left: -120px;
    width: 500px; height: 500px;
    border: 2px solid rgba(255,255,255,0.06);
    border-radius: 50%;
  }
  .cover-badge {
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.85);
    font-size: 8pt;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 6px 18px;
    border-radius: 20px;
    margin-bottom: 36px;
  }
  .cover-icon {
    width: 80px; height: 80px;
    background: rgba(255,255,255,0.15);
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 30px;
    font-size: 40px;
  }
  .cover h1 {
    font-size: 38pt;
    font-weight: 800;
    letter-spacing: -1px;
    text-align: center;
    line-height: 1.15;
    margin-bottom: 8px;
  }
  .cover h1 span { color: var(--amber); }
  .cover .cover-sub {
    font-size: 13pt;
    font-weight: 300;
    color: rgba(255,255,255,0.75);
    text-align: center;
    margin-bottom: 50px;
    letter-spacing: 0.5px;
  }
  .cover-divider {
    width: 60px; height: 3px;
    background: var(--amber);
    margin: 0 auto 50px;
    border-radius: 2px;
  }
  .cover-meta {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    width: 100%;
    max-width: 640px;
  }
  .cover-meta-item {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 16px 20px;
    text-align: center;
  }
  .cover-meta-item .label {
    font-size: 7pt;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 4px;
  }
  .cover-meta-item .value {
    font-size: 9.5pt;
    font-weight: 600;
    color: var(--white);
  }
  .cover-footer {
    position: absolute;
    bottom: 30px;
    font-size: 7.5pt;
    color: rgba(255,255,255,0.4);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* ─── DOCUMENT BODY ─── */
  .doc-body {
    padding: 0 60px;
  }

  /* ─── TABLE OF CONTENTS ─── */
  .toc-page {
    page-break-after: always;
    padding: 60px 0 40px;
  }
  .toc-page h2 {
    font-size: 22pt;
    font-weight: 800;
    color: var(--green-900);
    margin-bottom: 6px;
  }
  .toc-page .toc-sub {
    color: var(--gray-500);
    font-size: 9pt;
    margin-bottom: 36px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--green-100);
  }
  .toc-section { margin-bottom: 6px; }
  .toc-item {
    display: flex;
    align-items: baseline;
    gap: 0;
    padding: 7px 0;
    border-bottom: 1px dotted var(--gray-200);
  }
  .toc-num {
    font-size: 8.5pt;
    font-weight: 700;
    color: var(--green-600);
    width: 28px;
    flex-shrink: 0;
  }
  .toc-title {
    font-size: 9.5pt;
    font-weight: 500;
    color: var(--gray-800);
    flex: 1;
  }
  .toc-item.toc-sub-item .toc-title {
    padding-left: 16px;
    font-weight: 400;
    color: var(--gray-600);
    font-size: 9pt;
  }

  /* ─── SECTION HEADINGS ─── */
  .section {
    page-break-before: always;
    padding-top: 55px;
  }
  .section:first-child { page-break-before: auto; }

  .section-header {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    margin-bottom: 28px;
    padding-bottom: 18px;
    border-bottom: 2px solid var(--green-100);
  }
  .section-number {
    font-size: 10pt;
    font-weight: 800;
    color: var(--white);
    background: var(--green-700);
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .section-title-block h2 {
    font-size: 20pt;
    font-weight: 800;
    color: var(--green-900);
    letter-spacing: -0.5px;
  }
  .section-title-block .section-desc {
    font-size: 9pt;
    color: var(--gray-500);
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  /* ─── SUB-SECTION ─── */
  .subsection {
    margin-bottom: 36px;
  }
  .subsection-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .subsection-badge {
    background: var(--green-900);
    color: var(--white);
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: 1.5px;
    padding: 3px 10px;
    border-radius: 4px;
    text-transform: uppercase;
  }
  h3 {
    font-size: 13pt;
    font-weight: 700;
    color: var(--green-800);
  }
  h4 {
    font-size: 11pt;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 10px;
    margin-top: 18px;
  }
  p { margin-bottom: 10px; color: var(--gray-700); }

  /* ─── CALLOUT BOXES ─── */
  .callout {
    background: var(--green-50);
    border-left: 4px solid var(--green-500);
    border-radius: 0 8px 8px 0;
    padding: 14px 18px;
    margin: 16px 0;
    font-style: italic;
    color: var(--gray-700);
    font-size: 9.5pt;
  }
  .callout-amber {
    background: var(--amber-light);
    border-left-color: var(--amber);
  }
  .callout-dark {
    background: var(--green-900);
    border-left-color: var(--amber);
    color: rgba(255,255,255,0.9);
  }

  /* ─── TABLES ─── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 20px;
    font-size: 9pt;
  }
  thead tr {
    background: var(--green-900);
    color: var(--white);
  }
  thead th {
    padding: 9px 14px;
    text-align: left;
    font-weight: 700;
    font-size: 8pt;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }
  tbody tr:nth-child(even) { background: var(--gray-50); }
  tbody tr:nth-child(odd) { background: var(--white); }
  tbody td {
    padding: 8px 14px;
    border-bottom: 1px solid var(--gray-200);
    color: var(--gray-700);
    vertical-align: top;
  }
  tbody td:first-child { font-weight: 600; color: var(--gray-800); }
  tbody tr:hover { background: var(--green-50); }

  /* ─── SCREENSHOTS ─── */
  .screenshot-block {
    margin: 20px 0 28px;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  .screenshot-img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 480px;
    object-fit: cover;
    object-position: top;
  }
  .screenshot-caption {
    background: var(--gray-800);
    color: rgba(255,255,255,0.75);
    font-size: 8pt;
    padding: 8px 14px;
    letter-spacing: 0.5px;
    font-style: italic;
  }
  .screenshot-placeholder {
    background: var(--gray-100);
    padding: 30px;
    text-align: center;
    color: var(--gray-400);
    font-style: italic;
    border-radius: 8px;
    margin: 16px 0;
  }

  /* ─── PRODUCT CARD ─── */
  .product-card {
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 28px;
    page-break-inside: avoid;
  }
  .product-card-header {
    background: var(--green-900);
    color: var(--white);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-card-header .prod-num {
    font-size: 10pt;
    font-weight: 800;
    opacity: 0.5;
  }
  .product-card-header .prod-name { font-size: 12pt; font-weight: 700; }
  .product-card-header .prod-hindi {
    font-size: 8.5pt;
    opacity: 0.65;
    margin-top: 2px;
  }
  .product-card-header .prod-badge {
    background: var(--amber);
    color: var(--gray-900);
    font-size: 7.5pt;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
  }
  .product-card-body { padding: 18px 20px; }
  .product-tagline {
    font-style: italic;
    color: var(--gray-600);
    font-size: 9.5pt;
    margin-bottom: 14px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--gray-100);
  }
  .product-meta-row {
    display: flex;
    gap: 16px;
    margin-bottom: 14px;
  }
  .product-meta-pill {
    background: var(--green-50);
    border: 1px solid var(--green-100);
    color: var(--green-800);
    font-size: 8pt;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 0.3px;
  }
  .product-meta-pill.amber {
    background: var(--amber-light);
    border-color: #fde68a;
    color: #92400e;
  }

  /* ─── FEATURES GRID ─── */
  .features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 12px;
  }
  .feature-item {
    background: var(--gray-50);
    border-left: 3px solid var(--green-500);
    padding: 10px 14px;
    border-radius: 0 6px 6px 0;
  }
  .feature-num {
    font-size: 7pt;
    font-weight: 800;
    color: var(--green-600);
    letter-spacing: 1px;
    margin-bottom: 3px;
  }
  .feature-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 3px;
  }
  .feature-desc { font-size: 8pt; color: var(--gray-600); }

  /* ─── PROCESS STEPS ─── */
  .process-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }
  .process-step {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 18px 0;
    border-bottom: 1px solid var(--gray-100);
    position: relative;
  }
  .process-step:last-child { border-bottom: none; }
  .step-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 48px;
  }
  .step-circle {
    width: 40px; height: 40px;
    background: var(--green-700);
    color: var(--white);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 9pt;
    font-weight: 800;
    flex-shrink: 0;
  }
  .step-line {
    width: 2px;
    flex: 1;
    background: var(--green-100);
    margin-top: 6px;
    min-height: 30px;
  }
  .step-content { flex: 1; }
  .step-tag {
    font-size: 7pt;
    font-weight: 700;
    color: var(--green-600);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .step-title {
    font-size: 11pt;
    font-weight: 700;
    color: var(--gray-900);
    margin-bottom: 5px;
  }
  .step-desc { font-size: 9pt; color: var(--gray-600); }

  /* ─── CAPABILITY CARDS ─── */
  .capability-card {
    background: linear-gradient(135deg, var(--green-50) 0%, var(--white) 100%);
    border: 1px solid var(--green-100);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 18px;
    page-break-inside: avoid;
  }
  .capability-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  }
  .capability-num {
    width: 36px; height: 36px;
    background: var(--green-900);
    color: var(--white);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 9pt;
    font-weight: 800;
    flex-shrink: 0;
  }
  .capability-title {
    font-size: 11pt;
    font-weight: 700;
    color: var(--green-900);
  }
  .capability-tag {
    margin-left: auto;
    background: var(--amber-light);
    color: #92400e;
    font-size: 7.5pt;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .capability-desc { font-size: 9pt; color: var(--gray-700); margin-bottom: 12px; }
  .highlights-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    list-style: none;
  }
  .highlights-list li {
    font-size: 8.5pt;
    color: var(--gray-700);
    padding-left: 16px;
    position: relative;
  }
  .highlights-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--green-500);
    font-weight: 700;
  }

  /* ─── INFO BOXES ─── */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    margin: 18px 0;
  }
  .info-box {
    background: var(--green-900);
    color: var(--white);
    border-radius: 10px;
    padding: 18px;
    text-align: center;
  }
  .info-box .ib-icon { font-size: 22pt; margin-bottom: 8px; }
  .info-box .ib-value { font-size: 11pt; font-weight: 700; margin-bottom: 4px; }
  .info-box .ib-label {
    font-size: 7.5pt;
    color: rgba(255,255,255,0.6);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* ─── FAQ ─── */
  .faq-item {
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    page-break-inside: avoid;
  }
  .faq-q {
    background: var(--gray-50);
    padding: 12px 16px;
    font-weight: 600;
    font-size: 9.5pt;
    color: var(--gray-800);
    border-bottom: 1px solid var(--gray-200);
  }
  .faq-q::before { content: 'Q  '; color: var(--green-600); font-weight: 800; }
  .faq-a {
    padding: 12px 16px;
    font-size: 9pt;
    color: var(--gray-700);
    line-height: 1.6;
  }
  .faq-a::before { content: 'A  '; color: var(--amber); font-weight: 800; }

  /* ─── CONTACT ─── */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 18px;
  }
  .contact-card {
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .contact-icon {
    font-size: 20pt;
    width: 40px;
    text-align: center;
  }
  .contact-label { font-size: 7.5pt; color: var(--gray-500); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 3px; }
  .contact-value { font-size: 10pt; font-weight: 600; color: var(--gray-800); }

  /* ─── PAGE FOOTER ─── */
  @page {
    size: A4;
    margin: 0;
  }
  @media print {
    .section { page-break-before: always; }
    .cover { height: 297mm; }
  }

  /* ─── TECH STACK ─── */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 16px 0;
  }
  .tech-card {
    background: var(--gray-900);
    color: var(--white);
    border-radius: 10px;
    padding: 16px;
    text-align: center;
  }
  .tech-card .tech-icon { font-size: 20pt; margin-bottom: 8px; }
  .tech-card .tech-name { font-size: 10pt; font-weight: 700; margin-bottom: 4px; }
  .tech-card .tech-desc { font-size: 8pt; color: rgba(255,255,255,0.55); }

  /* ─── HIGHLIGHT BADGE ─── */
  .page-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--green-100);
    color: var(--green-900);
    font-size: 8pt;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 14px;
    letter-spacing: 0.5px;
  }
  .page-url {
    font-family: 'Courier New', monospace;
    background: var(--gray-100);
    color: var(--green-800);
    padding: 3px 10px;
    border-radius: 5px;
    font-size: 9pt;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 10px;
  }
</style>
</head>
<body>

<!-- ═══════════════ COVER PAGE ═══════════════ -->
<div class="cover">
  <div class="cover-badge">Official Documentation — v1.0</div>
  <div class="cover-icon">🏭</div>
  <h1>Sai Pooja<br/><span>Fabrication</span></h1>
  <p class="cover-sub">Agricultural Implements &amp; Heavy Fabrication Engineering</p>
  <div class="cover-divider"></div>
  <div class="cover-meta">
    <div class="cover-meta-item">
      <div class="label">Document Type</div>
      <div class="value">Website Documentation</div>
    </div>
    <div class="cover-meta-item">
      <div class="label">Prepared On</div>
      <div class="value">September 2026</div>
    </div>
    <div class="cover-meta-item">
      <div class="label">Technology</div>
      <div class="value">Next.js 16 · TypeScript</div>
    </div>
  </div>
  <div class="cover-footer">saipoojafabrication.com &nbsp;·&nbsp; Maharashtra, India</div>
</div>

<div class="doc-body">

<!-- ═══════════════ TABLE OF CONTENTS ═══════════════ -->
<div class="toc-page">
  <h2>Table of Contents</h2>
  <p class="toc-sub">Sai Pooja Fabrication — Complete Website Reference</p>

  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">1</span><span class="toc-title">Company Overview</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num"></span><span class="toc-title">Business Profile · Engineering Philosophy · Core Pillars</span></div>
  </div>
  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">2</span><span class="toc-title">Website Pages</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num">2.1</span><span class="toc-title">Home Page</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num">2.2</span><span class="toc-title">About Page</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num">2.3</span><span class="toc-title">Products Page</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num">2.4</span><span class="toc-title">Product Detail Page</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num">2.5</span><span class="toc-title">Fabrication Page</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num">2.6</span><span class="toc-title">Gallery Page</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num">2.7</span><span class="toc-title">Contact Page</span></div>
  </div>
  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">3</span><span class="toc-title">Product Catalogue</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num"></span><span class="toc-title">10 Agricultural Implements — Full Specifications</span></div>
  </div>
  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">4</span><span class="toc-title">Fabrication Capabilities</span></div>
  </div>
  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">5</span><span class="toc-title">Manufacturing Process</span></div>
  </div>
  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">6</span><span class="toc-title">Technical Architecture</span></div>
    <div class="toc-item toc-sub-item"><span class="toc-num"></span><span class="toc-title">Technology Stack · Project Structure · Routing</span></div>
  </div>
  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">7</span><span class="toc-title">SEO &amp; Performance</span></div>
  </div>
  <div class="toc-section">
    <div class="toc-item"><span class="toc-num">8</span><span class="toc-title">Contact Information</span></div>
  </div>
</div>

<!-- ═══════════════ 1. COMPANY OVERVIEW ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">1</div>
    <div class="section-title-block">
      <h2>Company Overview</h2>
      <p class="section-desc">Business Profile · Engineering Philosophy · Core Pillars</p>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-box"><div class="ib-icon">🚜</div><div class="ib-value">10 Products</div><div class="ib-label">Agricultural Implements</div></div>
    <div class="info-box"><div class="ib-icon">⚙️</div><div class="ib-value">35–90+ HP</div><div class="ib-label">Tractor HP Range</div></div>
    <div class="info-box"><div class="ib-icon">🛡️</div><div class="ib-value">1 Year</div><div class="ib-label">Structural Warranty</div></div>
  </div>

  <table>
    <thead><tr><th>Field</th><th>Details</th></tr></thead>
    <tbody>
      <tr><td>Company Name</td><td>Sai Pooja Fabrication</td></tr>
      <tr><td>Tagline</td><td>Agricultural Implements &amp; Heavy Fabrication Engineering</td></tr>
      <tr><td>Location</td><td>Industrial Area, Maharashtra, India</td></tr>
      <tr><td>Operating Hours</td><td>Monday – Saturday: 9:00 AM – 7:00 PM</td></tr>
      <tr><td>Email</td><td>contact@saipoojafabrication.com</td></tr>
      <tr><td>Phone / WhatsApp</td><td>+91 98765 43210</td></tr>
      <tr><td>Tractor HP Range</td><td>35 HP to 90+ HP (CAT-I, CAT-II, CAT-III)</td></tr>
      <tr><td>Warranty</td><td>1 Year Structural Warranty (all products)</td></tr>
    </tbody>
  </table>

  <div class="callout callout-dark">
    "We believe agricultural machinery should be built with the structural resilience of industrial equipment. Every frame, hinge pin, and turnover mechanism is calibrated for maximum field turnaround and minimal downtime."
  </div>

  <h3>Engineering Pillars</h3>
  <table>
    <thead><tr><th>#</th><th>Pillar</th><th>Description</th><th>Tag</th></tr></thead>
    <tbody>
      <tr><td>01</td><td>Practical Field Thinking</td><td>Every implement engineered with insights from actual soil resistance, stubble handling, and tractor drawbar dynamics.</td><td>FIELD TESTED</td></tr>
      <tr><td>02</td><td>Structural Resilience</td><td>Built exclusively with heavy ISMB channels, seamless box sections, and boron steel components.</td><td>HIGH-TENSILE STEEL</td></tr>
      <tr><td>03</td><td>Fabrication Precision</td><td>Multi-pass MIG welding, CNC cut alignment, and stress-relieved joint geometry.</td><td>MIG WELDED SEAMS</td></tr>
      <tr><td>04</td><td>Custom HP Matching</td><td>Calibrated for 35 HP to 90+ HP tractors with standard CAT-II 3-point hitches.</td><td>35–90+ HP TAILORED</td></tr>
    </tbody>
  </table>
</div>

<!-- ═══════════════ 2. WEBSITE PAGES ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">2</div>
    <div class="section-title-block">
      <h2>Website Pages</h2>
      <p class="section-desc">All 7 public pages — structure, sections &amp; screenshots</p>
    </div>
  </div>

  <!-- 2.1 Home -->
  <div class="subsection">
    <div class="subsection-header">
      <div class="subsection-badge">2.1</div>
      <h3>Home Page</h3>
    </div>
    <span class="page-url">http://localhost:3000/</span>
    ${screenshot(imgs.home, "Home Page", "Home Page — Hero, Featured Products, Why Us, Gallery Preview")}
    <p>The Home Page is the primary landing page composed of <strong>9 structured sections</strong>:</p>
    <table>
      <thead><tr><th>#</th><th>Section</th><th>Component</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Hero</td><td>Hero</td><td>Full-screen dark high-contrast visual with main CTA</td></tr>
        <tr><td>2</td><td>Company Intro</td><td>CompanyIntro</td><td>Warm white section introducing Sai Pooja Fabrication</td></tr>
        <tr><td>3</td><td>Featured Products</td><td>FeaturedProducts</td><td>Grid of featured agricultural implements</td></tr>
        <tr><td>4</td><td>Product Spotlight</td><td>FeaturedProduct</td><td>Deep-dive highlight of the Multi-Speed Rotary Tiller</td></tr>
        <tr><td>5</td><td>Why Sai Pooja</td><td>WhyUs</td><td>Key differentiators and engineering strengths</td></tr>
        <tr><td>6</td><td>Fabrication Preview</td><td>FabricationPreview</td><td>Overview of fabrication capabilities</td></tr>
        <tr><td>7</td><td>Field Showcase</td><td>FieldShowcase</td><td>Full-width parallax field imagery</td></tr>
        <tr><td>8</td><td>Gallery Preview</td><td>GalleryPreview</td><td>Visual grid of equipment and workshop shots</td></tr>
        <tr><td>9</td><td>Final CTA</td><td>FinalCta</td><td>Conversion section with contact / enquiry prompt</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 2.2 About -->
  <div class="subsection">
    <div class="subsection-header">
      <div class="subsection-badge">2.2</div>
      <h3>About Page</h3>
    </div>
    <span class="page-url">http://localhost:3000/about</span>
    ${screenshot(imgs.about, "About Page", "About Page — Company Story, Engineering Heritage & Visual Journey")}
    <table>
      <thead><tr><th>#</th><th>Section</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>About Hero</td><td>Full-page hero with company identity</td></tr>
        <tr><td>2</td><td>Who We Are</td><td>Brand statement and core positioning</td></tr>
        <tr><td>3</td><td>Company Story</td><td>Background and manufacturing heritage</td></tr>
        <tr><td>4</td><td>Agriculture + Engineering</td><td>Split statement on the dual expertise</td></tr>
        <tr><td>5</td><td>What We Build</td><td>Showcase of implement categories</td></tr>
        <tr><td>6</td><td>Our Approach</td><td>The 4-pillar manufacturing philosophy</td></tr>
        <tr><td>7</td><td>Visual Story</td><td>Workshop → Machine → Field journey</td></tr>
        <tr><td>8</td><td>Fabrication Preview</td><td>Capability overview</td></tr>
        <tr><td>9</td><td>About CTA</td><td>Contact / enquiry call to action</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 2.3 Products -->
  <div class="subsection">
    <div class="subsection-header">
      <div class="subsection-badge">2.3</div>
      <h3>Products Page</h3>
    </div>
    <span class="page-url">http://localhost:3000/products</span>
    ${screenshot(imgs.products, "Products Page", "Products Page — Full Catalogue with Category Filters")}
    <p>The Products Page displays the complete catalogue of <strong>10 agricultural implements</strong> with category-based filtering.</p>
    <table>
      <thead><tr><th>Filter ID</th><th>Label</th></tr></thead>
      <tbody>
        <tr><td>all</td><td>ALL EQUIPMENT</td></tr>
        <tr><td>tillage</td><td>TILLAGE</td></tr>
        <tr><td>land-preparation</td><td>LAND PREPARATION</td></tr>
        <tr><td>seeding</td><td>SEEDING</td></tr>
        <tr><td>transport</td><td>TRANSPORT</td></tr>
        <tr><td>custom</td><td>CUSTOM</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 2.4 Product Detail -->
  <div class="subsection">
    <div class="subsection-header">
      <div class="subsection-badge">2.4</div>
      <h3>Product Detail Page</h3>
    </div>
    <span class="page-url">http://localhost:3000/products/[slug]</span>
    ${screenshot(imgs.productPlough, "Product Detail — Hydraulic Reversible Plough", "Product Detail — Hydraulic Reversible Plough with Specs, Features & Gallery")}
    <p>Each product detail page includes:</p>
    <table>
      <thead><tr><th>Element</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>Hero Image</td><td>Full-width product visual with tagline and HP badge</td></tr>
        <tr><td>Full Description</td><td>Detailed engineering description</td></tr>
        <tr><td>Specifications</td><td>Technical spec table (6 rows)</td></tr>
        <tr><td>4 Key Features</td><td>Numbered 01–04 engineering highlights</td></tr>
        <tr><td>Applications</td><td>3 primary use cases</td></tr>
        <tr><td>Gallery</td><td>3 images: product + workshop + field</td></tr>
        <tr><td>Related Products</td><td>3 related implements with links</td></tr>
        <tr><td>Navigation</td><td>Previous / Next product navigation</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 2.5 Fabrication -->
  <div class="subsection">
    <div class="subsection-header">
      <div class="subsection-badge">2.5</div>
      <h3>Fabrication Page</h3>
    </div>
    <span class="page-url">http://localhost:3000/fabrication</span>
    ${screenshot(imgs.fabrication, "Fabrication Page", "Fabrication Page — Capabilities, 5-Step Process & Workshop Showcase")}
    <p>The Fabrication Page showcases the company's complete manufacturing capabilities and step-by-step production process, including 4 capability service areas and the full 5-step manufacturing workflow.</p>
  </div>

  <!-- 2.6 Gallery -->
  <div class="subsection">
    <div class="subsection-header">
      <div class="subsection-badge">2.6</div>
      <h3>Gallery Page</h3>
    </div>
    <span class="page-url">http://localhost:3000/gallery</span>
    ${screenshot(imgs.gallery, "Gallery Page", "Gallery Page — 12 Items across Equipment, Fabrication, Workshop & Field categories")}
    <table>
      <thead><tr><th>Category</th><th>Label</th><th>Items</th></tr></thead>
      <tbody>
        <tr><td>all</td><td>ALL VISUALS</td><td>12</td></tr>
        <tr><td>equipment</td><td>EQUIPMENT</td><td>6</td></tr>
        <tr><td>fabrication</td><td>FABRICATION</td><td>3</td></tr>
        <tr><td>workshop</td><td>WORKSHOP</td><td>1</td></tr>
        <tr><td>field</td><td>FIELD TRIALS</td><td>2</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 2.7 Contact -->
  <div class="subsection">
    <div class="subsection-header">
      <div class="subsection-badge">2.7</div>
      <h3>Contact Page</h3>
    </div>
    <span class="page-url">http://localhost:3000/contact</span>
    ${screenshot(imgs.contact, "Contact Page", "Contact Page — Inquiry Form, 4 Inquiry Types & FAQ Section")}
    <table>
      <thead><tr><th>Inquiry Type</th><th>Title</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>product</td><td>Product Enquiry</td><td>Catalogue implements, pricing, HP matching</td></tr>
        <tr><td>custom-fabrication</td><td>Custom Fabrication</td><td>Custom toolbars, furrowers, trailers</td></tr>
        <tr><td>equipment-requirement</td><td>Equipment Requirement</td><td>Farm/fleet sizing based on land &amp; soil type</td></tr>
        <tr><td>general</td><td>General Enquiry</td><td>Workshop visits, spare parts, delivery</td></tr>
      </tbody>
    </table>

    <h4>Frequently Asked Questions</h4>
    <div class="faq-item"><div class="faq-q">What agricultural equipment does Sai Pooja Fabrication manufacture?</div><div class="faq-a">We manufacture a wide range of tractor-mounted agricultural implements including Hydraulic Reversible Ploughs, Rigid Tine Cultivators, Heavy-Duty Rotavators, Seed Cum Fertilizer Drills, Disc Harrows, Furrow Ridgers, Land Levelers, and Hydraulic Tipping Farm Trailers.</div></div>
    <div class="faq-item"><div class="faq-q">Can you fabricate custom implements for non-standard tractor hitches or specific crop spacing?</div><div class="faq-a">Yes. We specialize in custom heavy agricultural fabrication — custom toolbars, modified 3-point hitch geometry (CAT-I, CAT-II), and specialized sugarcane or horticulture furrowing attachments.</div></div>
    <div class="faq-item"><div class="faq-q">How do I determine the right implement size for my tractor horsepower?</div><div class="faq-a">Each implement is engineered for specific tractor power ranges. Check the specifications on each product page or send us your tractor model and horsepower for direct factory recommendations.</div></div>
    <div class="faq-item"><div class="faq-q">Can I visit your fabrication workshop to inspect equipment before ordering?</div><div class="faq-a">Yes, visitors and farmers are welcome during operating hours (Monday–Saturday, 9:00 AM – 7:00 PM). Contact us in advance to ensure the specific implement model is ready for inspection.</div></div>
  </div>
</div>

<!-- ═══════════════ 3. PRODUCT CATALOGUE ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">3</div>
    <div class="section-title-block">
      <h2>Product Catalogue</h2>
      <p class="section-desc">10 Agricultural Implements — Full Specifications</p>
    </div>
  </div>

  <!-- Product 1 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">01</div><div class="prod-name">Hydraulic Reversible Plough</div><div class="prod-hindi">हाइड्रोलिक रिवर्सिबल प्लाउ</div></div>
      <div class="prod-badge">45–75 HP ★ FEATURED</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Precision engineered hydraulic soil inversion plough with wear-resistant boron steel points.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Main Frame</td><td>Heavy Seamless Box Section (100×100×8 mm)</td></tr>
          <tr><td>Turnover Operation</td><td>Dual-Acting Hydraulic Cylinder 180°</td></tr>
          <tr><td>Under-Frame Clearance</td><td>650 mm Minimum</td></tr>
          <tr><td>Mouldboard &amp; Points</td><td>High-Tensile Boron Steel</td></tr>
          <tr><td>Linkage Standard</td><td>CAT-II Three-Point Linkage</td></tr>
          <tr><td>Tillage Depth</td><td>Up to 300 mm</td></tr>
        </tbody>
      </table>
      <div class="features-grid">
        <div class="feature-item"><div class="feature-num">01</div><div class="feature-title">High-Tensile Boron Steel Points</div><div class="feature-desc">Hardened wear points with exceptional abrasion resistance for extended service life in rocky soil.</div></div>
        <div class="feature-item"><div class="feature-num">02</div><div class="feature-title">Dual-Acting Hydraulic Turnover</div><div class="feature-desc">Instant 180° reversal directly from tractor cabin without manual hitching effort.</div></div>
        <div class="feature-item"><div class="feature-num">03</div><div class="feature-title">Reinforced Drawbar &amp; Mast</div><div class="feature-desc">Heavy gusseted CAT-II hitch distributes drawbar load evenly to eliminate frame twist.</div></div>
        <div class="feature-item"><div class="feature-num">04</div><div class="feature-title">Smooth Soil Inversion</div><div class="feature-desc">Curved mouldboard profile buries weeds and crop residue deep beneath the seedbed layer.</div></div>
      </div>
    </div>
  </div>

  <!-- Product 2 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">02</div><div class="prod-name">Heavy Duty Rigid Cultivator</div><div class="prod-hindi">हैवी ड्यूटी कल्टीवेटर (9/11 टाइन)</div></div>
      <div class="prod-badge">35–55 HP ★ FEATURED</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">9-Tine &amp; 11-Tine tractor-mounted heavy cultivator for rapid secondary seedbed preparation.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Main Frame</td><td>Heavy ISMB Steel Channel (75×40 mm)</td></tr>
          <tr><td>Tine Configuration</td><td>9 or 11 Rigid Tines (Staggered)</td></tr>
          <tr><td>Tine Clamps</td><td>Heavy Forged Steel Clamps (Adjustable)</td></tr>
          <tr><td>Shovels</td><td>Reversible High-Carbon Forged Points</td></tr>
          <tr><td>Linkage Standard</td><td>CAT-II Three-Point Hitch</td></tr>
          <tr><td>Working Width</td><td>2000 mm to 2400 mm</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 3 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">03</div><div class="prod-name">Multi-Speed Rotary Tiller (Rotavator)</div><div class="prod-hindi">मल्टी-स्पीड रोटावेटर</div></div>
      <div class="prod-badge">40–65 HP ★ FEATURED</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Heavy-duty gear-drive multi-speed rotary tiller for single-pass seedbed preparation in wet &amp; dry soils.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Transmission</td><td>Heavy-Duty Multi-Speed Gearbox</td></tr>
          <tr><td>Side Drive</td><td>Enclosed Oil-Bath Gear Drive</td></tr>
          <tr><td>Rotor Blades</td><td>L/C Type High-Carbon Boron Steel</td></tr>
          <tr><td>Blade Count</td><td>36 / 42 / 48 Blades</td></tr>
          <tr><td>Working Width</td><td>5 ft to 7 ft (1500–2100 mm)</td></tr>
          <tr><td>Tailgate</td><td>Spring-Loaded Adjustable Floating Board</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 4 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">04</div><div class="prod-name">Tractor-Mounted Tiller</div><div class="prod-hindi">ट्रैक्टर माउंटेड टिलर</div></div>
      <div class="prod-badge">35–50 HP</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Heavy-duty spring-loaded and rigid tiller for versatile inter-cultivation and field preparation.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Frame</td><td>Heavy Seamless Box Section (65×65 mm)</td></tr>
          <tr><td>Tines</td><td>Heavy Forged Spring Steel Tines</td></tr>
          <tr><td>Trip Mechanism</td><td>Dual Heavy Coil Springs per Tine</td></tr>
          <tr><td>Points</td><td>Reversible Boron Steel Points</td></tr>
          <tr><td>Linkage</td><td>Standard CAT-II 3-Point Linkage</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 5 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">05</div><div class="prod-name">Heavy-Duty Mounted Disc Harrow</div><div class="prod-hindi">हैवी डिस्क हैरो</div></div>
      <div class="prod-badge">45–75 HP</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Trailed and mounted disc harrows with boron steel notched discs for heavy trash cutting.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Frame</td><td>Reinforced Heavy Channel (100×50 mm)</td></tr>
          <tr><td>Disc Diameter</td><td>508–560 mm (20–22 inches)</td></tr>
          <tr><td>Disc Count</td><td>12, 14, or 16 Discs (2-Gang)</td></tr>
          <tr><td>Bearing Hubs</td><td>Heavy Sealed Taper Roller Bearing Hubs</td></tr>
          <tr><td>Gang Angle</td><td>Adjustable 0° to 22°</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 6 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">06</div><div class="prod-name">Adjustable 3-Row Furrow Ridger</div><div class="prod-hindi">एडजस्टेबल 3-रो मेड़ बनाने वाला रिजर</div></div>
      <div class="prod-badge">35–50 HP</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Precision row-crop ridger with adjustable wings for cotton, sugarcane, and potato bed forming.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Frame</td><td>Heavy Square Hollow Section (75×75 mm)</td></tr>
          <tr><td>Number of Bottoms</td><td>2 or 3 Furrow Bottoms</td></tr>
          <tr><td>Mouldboard Wings</td><td>Adjustable High-Grade Steel Wings</td></tr>
          <tr><td>Row Width Range</td><td>600–1000 mm (Adjustable)</td></tr>
          <tr><td>Linkage</td><td>CAT-II Three-Point Hitch</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 7 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">07</div><div class="prod-name">Heavy-Duty Tractor Land Leveler</div><div class="prod-hindi">हैवी ड्यूटी लैंड लेवलर (सपाटा)</div></div>
      <div class="prod-badge">35–65 HP</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Heavy-gauge reinforced levelling blade for field grading, farm road maintenance, and soil smoothing.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Mouldboard Width</td><td>6 ft, 7 ft, or 8 ft (1800–2400 mm)</td></tr>
          <tr><td>Mouldboard Sheet</td><td>8 mm Heavy Rolled Structural Plate</td></tr>
          <tr><td>Cutting Edge</td><td>Reversible High-Carbon Steel Blade</td></tr>
          <tr><td>Mast</td><td>Reinforced 3-Point CAT-II Hitch</td></tr>
          <tr><td>Adjustment</td><td>Angle &amp; Tilt Capable (Optional)</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 8 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">08</div><div class="prod-name">Automatic Seed Cum Fertilizer Drill</div><div class="prod-hindi">ऑटोमेटिक सीड कम फर्टिलाइजर ड्रिल</div></div>
      <div class="prod-badge">35–55 HP ★ FEATURED</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Precision multi-crop mechanical seed and fertilizer drill with fluted roller metering.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Number of Rows</td><td>9, 11, or 13 Rows</td></tr>
          <tr><td>Row Spacing</td><td>Adjustable (150–225 mm)</td></tr>
          <tr><td>Metering Mechanism</td><td>Fluted Aluminum Roller Drive</td></tr>
          <tr><td>Hopper Capacity</td><td>50 kg Seed + 50 kg Fertilizer</td></tr>
          <tr><td>Furrow Openers</td><td>Reversible Shoe / Inverted T-Type</td></tr>
          <tr><td>Drive Wheel</td><td>Ground Traction Steel Lugged Wheel</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 9 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">09</div><div class="prod-name">Heavy Duty Tipping Farm Trailer</div><div class="prod-hindi">हाइड्रोलिक टिपिंग फार्म ट्रॉली</div></div>
      <div class="prod-badge">40–75+ HP ★ FEATURED</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Reinforced steel chassis agricultural tipping trailer with heavy telescopic hydraulic ram.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Chassis</td><td>Heavy ISMB Steel Channel (150×75 mm / 200×100 mm)</td></tr>
          <tr><td>Payload Capacity</td><td>3 Tonne to 10 Tonne</td></tr>
          <tr><td>Tipping Ram</td><td>Heavy Single/Twin Multi-Stage Telescopic Ram</td></tr>
          <tr><td>Floor Plate</td><td>3.5–5 mm Heavy Carbon Steel Sheet</td></tr>
          <tr><td>Axle &amp; Bearings</td><td>Solid Steel Axle with Taper Roller Bearings</td></tr>
          <tr><td>Brakes &amp; Hitch</td><td>Heavy Swivel Ring Drawbar Hitch</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product 10 -->
  <div class="product-card">
    <div class="product-card-header">
      <div><div class="prod-num">10</div><div class="prod-name">Custom Engineered Farm Implements</div><div class="prod-hindi">कस्टम फैब्रिकेटेड कृषि उपकरण</div></div>
      <div class="prod-badge">30–90+ HP · CUSTOM</div>
    </div>
    <div class="product-card-body">
      <p class="product-tagline">Tailor-made agricultural attachments and custom machinery fabricated to your exact field specifications.</p>
      <table>
        <thead><tr><th>Specification</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Fabrication Standard</td><td>High-Tensile ISMB / Heavy Tubular Steel</td></tr>
          <tr><td>Welding Process</td><td>Multi-Pass MIG Welding &amp; Ultrasonic Testing</td></tr>
          <tr><td>Hitch Geometry</td><td>Custom CAT-I / CAT-II / CAT-III Hitch</td></tr>
          <tr><td>Customization Options</td><td>Width, Tine Spacing, Blade Material, Hydraulics</td></tr>
          <tr><td>Finishing</td><td>Anti-Corrosion Epoxy Primer &amp; Polyurethane Coat</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══════════════ 4. FABRICATION CAPABILITIES ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">4</div>
    <div class="section-title-block">
      <h2>Fabrication Capabilities</h2>
      <p class="section-desc">4 Core Manufacturing Service Areas</p>
    </div>
  </div>

  <div class="capability-card">
    <div class="capability-header"><div class="capability-num">01</div><div class="capability-title">Agricultural Implement Fabrication</div><span class="capability-tag">PRIMARY IMPLEMENTS</span></div>
    <p class="capability-desc">Full-scale manufacturing of heavy-duty primary &amp; secondary tillage equipment, including hydraulic reversible ploughs, cultivators, and rotary tillers. Every frame is welded using multi-pass MIG processes with heavy reinforcement gussets at critical stress points.</p>
    <ul class="highlights-list"><li>High-tensile boron steel wear parts</li><li>Reinforced CAT-II 3-point mast geometry</li><li>Hydraulic turnover mechanism assembly</li><li>Anti-corrosive epoxy primer coating</li></ul>
  </div>

  <div class="capability-card">
    <div class="capability-header"><div class="capability-num">02</div><div class="capability-title">Custom Heavy Metal Fabrication</div><span class="capability-tag">CUSTOM SOLUTIONS</span></div>
    <p class="capability-desc">Tailor-made agricultural equipment and custom structural steel attachments engineered to specific farming and land preparation requirements. When standard implements cannot meet specific soil textures, sugarcane crop spacing, or tractor hitch dimensions, we custom engineer frames and specialized toolbars.</p>
    <ul class="highlights-list"><li>Custom toolbar widths &amp; tine spacing</li><li>Specialized crop furrowers &amp; bed shapers</li><li>Direct engineer-to-farmer design consultation</li><li>High-load structural reinforcement</li></ul>
  </div>

  <div class="capability-card">
    <div class="capability-header"><div class="capability-num">03</div><div class="capability-title">Tractor-Mounted Implement Assembly</div><span class="capability-tag">3-POINT MOUNTED</span></div>
    <p class="capability-desc">Precision alignment and fabrication of 3-point linkage hitch frames, PTO driveline mountings, and hydraulic cylinder systems. Ensuring perfect alignment of CAT-I, CAT-II geometry to deliver balanced drawbar pull across uneven fields.</p>
    <ul class="highlights-list"><li>Standard CAT-II 3-point linkage geometry</li><li>PTO driveline gear alignment</li><li>Dual-acting hydraulic cylinder mounting</li><li>Heavy pivot pin &amp; bushing fitting</li></ul>
  </div>

  <div class="capability-card">
    <div class="capability-header"><div class="capability-num">04</div><div class="capability-title">Structural Reinforcement &amp; Trailers</div><span class="capability-tag">TRAILERS &amp; REPAIR</span></div>
    <p class="capability-desc">Heavy trailer chassis fabrication, tipping ram mountings, axle assembly, and implement frame rebuilding. Featuring ISMB steel channels, multi-stage hydraulic telescopic rams, and solid axle hub assemblies for heavy bulk hauling.</p>
    <ul class="highlights-list"><li>Heavy ISMB main chassis beams (150×75 mm)</li><li>Multi-stage telescopic hydraulic tipping ram</li><li>Drop-down &amp; detachable corrugated gates</li><li>Solid steel axle with taper roller bearings</li></ul>
  </div>
</div>

<!-- ═══════════════ 5. MANUFACTURING PROCESS ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">5</div>
    <div class="section-title-block">
      <h2>Manufacturing Process</h2>
      <p class="section-desc">5-Step Precision Production Workflow</p>
    </div>
  </div>

  <div class="process-steps">
    <div class="process-step">
      <div class="step-left"><div class="step-circle">01</div><div class="step-line"></div></div>
      <div class="step-content"><div class="step-tag">ANALYSIS</div><div class="step-title">Requirement &amp; Field Context</div><p class="step-desc">Understanding tractor horsepower, soil type, and specific crop tillage requirements. We assess whether the implement will work in heavy black cotton soil, abrasive sandy loam, or stony land — and determine the optimal frame weight and drawbar pull matching.</p></div>
    </div>
    <div class="process-step">
      <div class="step-left"><div class="step-circle">02</div><div class="step-line"></div></div>
      <div class="step-content"><div class="step-tag">ENGINEERING</div><div class="step-title">Structural Layout &amp; Profile Sizing</div><p class="step-desc">Sizing high-tensile steel channels, plate gauges, and pivot clearances. Heavy ISMB channel sections, seamless box tubes, and gusset plates are calibrated for geometric alignment, CAT-II 3-point linkage clearance, and trash clearance between tines.</p></div>
    </div>
    <div class="process-step">
      <div class="step-left"><div class="step-circle">03</div><div class="step-line"></div></div>
      <div class="step-content"><div class="step-tag">CUTTING &amp; FORMING</div><div class="step-title">Heavy Plate &amp; Section Cutting</div><p class="step-desc">Precision profile shearing, plasma cutting, and hydraulic press bending. Structural steel plates and channels are cut with accurate bevels for deep weld penetration. Hydraulic presses form curved mouldboards and reinforced drawbar headstocks.</p></div>
    </div>
    <div class="process-step">
      <div class="step-left"><div class="step-circle">04</div><div class="step-line"></div></div>
      <div class="step-content"><div class="step-tag">WELDING &amp; ASSEMBLY</div><div class="step-title">Multi-Pass Structural Welding</div><p class="step-desc">Heavy MIG welding with multi-pass seams and stress-relieved gusseting. Frames are secured in heavy rigid jigs and welded using multi-pass MIG processes. High-stress joints receive thick gussets and web stiffeners to eliminate weld cracking under heavy pulling.</p></div>
    </div>
    <div class="process-step">
      <div class="step-left"><div class="step-circle">05</div></div>
      <div class="step-content"><div class="step-tag">FINISHING &amp; QA</div><div class="step-title">Priming, Fitting &amp; Quality Check</div><p class="step-desc">Boron wear parts fitting, anti-corrosive priming, and alignment inspection. Hardened boron steel points, hydraulic rams, and gearbox assemblies are mounted. The completed implement is treated with heavy anti-corrosion primer and final industrial polyurethane enamel.</p></div>
    </div>
  </div>
</div>

<!-- ═══════════════ 6. TECHNICAL ARCHITECTURE ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">6</div>
    <div class="section-title-block">
      <h2>Technical Architecture</h2>
      <p class="section-desc">Technology Stack · Project Structure · Routing</p>
    </div>
  </div>

  <div class="tech-grid">
    <div class="tech-card"><div class="tech-icon">⚛️</div><div class="tech-name">Next.js 16</div><div class="tech-desc">App Router · SSR · Static Generation</div></div>
    <div class="tech-card"><div class="tech-icon">🔷</div><div class="tech-name">TypeScript</div><div class="tech-desc">Full type safety across all components</div></div>
    <div class="tech-card"><div class="tech-icon">🎨</div><div class="tech-name">Tailwind CSS</div><div class="tech-desc">Utility-first responsive design system</div></div>
  </div>

  <h4>Technology Stack</h4>
  <table>
    <thead><tr><th>Layer</th><th>Technology</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Framework</td><td>Next.js 16 (App Router)</td><td>Nested layouts, route groups</td></tr>
      <tr><td>Language</td><td>TypeScript</td><td>Strict mode, all components typed</td></tr>
      <tr><td>Styling</td><td>Tailwind CSS</td><td>Custom design tokens</td></tr>
      <tr><td>Rendering</td><td>SSR + Static Generation</td><td>Dynamic pages force-dynamic</td></tr>
      <tr><td>Routing</td><td>App Router with (marketing) group</td><td>Isolates public vs admin routes</td></tr>
    </tbody>
  </table>

  <h4>Website Routing Table</h4>
  <table>
    <thead><tr><th>Route</th><th>Page</th><th>Rendering</th><th>Dynamic</th></tr></thead>
    <tbody>
      <tr><td>/</td><td>Home</td><td>SSR</td><td>force-dynamic</td></tr>
      <tr><td>/about</td><td>About</td><td>SSR</td><td>force-dynamic</td></tr>
      <tr><td>/products</td><td>Product Catalogue</td><td>SSR</td><td>force-dynamic</td></tr>
      <tr><td>/products/[slug]</td><td>Product Detail</td><td>SSR</td><td>Per slug</td></tr>
      <tr><td>/fabrication</td><td>Fabrication</td><td>Static</td><td>—</td></tr>
      <tr><td>/gallery</td><td>Gallery</td><td>SSR</td><td>force-dynamic</td></tr>
      <tr><td>/contact</td><td>Contact</td><td>Static</td><td>—</td></tr>
      <tr><td>/sitemap.xml</td><td>Sitemap</td><td>Auto-generated</td><td>—</td></tr>
      <tr><td>/robots.txt</td><td>Robots</td><td>Auto-generated</td><td>—</td></tr>
    </tbody>
  </table>
</div>

<!-- ═══════════════ 7. SEO & PERFORMANCE ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">7</div>
    <div class="section-title-block">
      <h2>SEO &amp; Performance</h2>
      <p class="section-desc">Metadata · Structured Data · Sitemap · Performance Optimizations</p>
    </div>
  </div>

  <table>
    <thead><tr><th>Feature</th><th>Implementation</th><th>Coverage</th></tr></thead>
    <tbody>
      <tr><td>Title Tags</td><td>Dynamic per-page, keyword-targeted via constructMetadata()</td><td>All pages</td></tr>
      <tr><td>Meta Descriptions</td><td>Unique descriptions for each page via seoKeywordMap</td><td>All pages</td></tr>
      <tr><td>Organization Schema</td><td>OrganizationSchema JSON-LD structured data</td><td>Home page</td></tr>
      <tr><td>LocalBusiness Schema</td><td>LocalBusinessSchema JSON-LD for rich local results</td><td>Home page</td></tr>
      <tr><td>Breadcrumb Schema</td><td>BreadcrumbsJsonLd on interior pages</td><td>About, Products</td></tr>
      <tr><td>Sitemap</td><td>Auto-generated at /sitemap.xml via Next.js sitemap.ts</td><td>All routes</td></tr>
      <tr><td>Robots.txt</td><td>Configured at /robots.txt via robots.ts</td><td>Site-wide</td></tr>
      <tr><td>Canonical URLs</td><td>Set per page to prevent duplicate content</td><td>All pages</td></tr>
      <tr><td>Hindi Product Names</td><td>Dual-language names (English + Hindi) for regional SEO</td><td>All 10 products</td></tr>
      <tr><td>Web App Manifest</td><td>manifest.ts for PWA metadata</td><td>Site-wide</td></tr>
    </tbody>
  </table>

  <div class="callout">
    <strong>Performance:</strong> Next.js SSR delivers fast first-paint with server-rendered HTML for SEO crawlability. The (marketing) route group isolates the public site from admin routes, and automatic per-page JS code splitting via the App Router minimizes JavaScript payload per visit.
  </div>
</div>

<!-- ═══════════════ 8. CONTACT INFORMATION ═══════════════ -->
<div class="section">
  <div class="section-header">
    <div class="section-number">8</div>
    <div class="section-title-block">
      <h2>Contact Information</h2>
      <p class="section-desc">All Channels &amp; Operating Details</p>
    </div>
  </div>

  <div class="contact-grid">
    <div class="contact-card"><div class="contact-icon">📧</div><div><div class="contact-label">Email</div><div class="contact-value">contact@saipoojafabrication.com</div></div></div>
    <div class="contact-card"><div class="contact-icon">📞</div><div><div class="contact-label">Phone</div><div class="contact-value">+91 98765 43210</div></div></div>
    <div class="contact-card"><div class="contact-icon">💬</div><div><div class="contact-label">WhatsApp</div><div class="contact-value">+91 98765 43210</div></div></div>
    <div class="contact-card"><div class="contact-icon">📍</div><div><div class="contact-label">Address</div><div class="contact-value">Industrial Area, Maharashtra, India</div></div></div>
    <div class="contact-card"><div class="contact-icon">🕐</div><div><div class="contact-label">Operating Hours</div><div class="contact-value">Mon–Sat: 9:00 AM – 7:00 PM</div></div></div>
    <div class="contact-card"><div class="contact-icon">🌐</div><div><div class="contact-label">Website</div><div class="contact-value">saipoojafabrication.com</div></div></div>
  </div>

  <div class="callout callout-dark" style="margin-top:30px;">
    Workshop visits welcome during operating hours. Contact us in advance so the specific implement model you wish to inspect is available and ready on the production floor.
  </div>

  <p style="margin-top:40px; text-align:center; color:#9ca3af; font-size:8pt; border-top:1px solid #e5e7eb; padding-top:20px;">
    © 2026 Sai Pooja Fabrication · All Rights Reserved · Industrial Area, Maharashtra, India<br/>
    Document generated from source code and live website content · Version 1.0 · September 2026
  </p>
</div>

</div><!-- /doc-body -->
</body>
</html>`;

(async () => {
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 900 });

  console.log("Loading HTML content...");
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Wait a moment for fonts / layout to stabilize
  await new Promise((r) => setTimeout(r, 2000));

  console.log("Generating PDF...");
  await page.pdf({
    path: OUTPUT_PDF,
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await browser.close();
  console.log("\n✅ PDF saved to:");
  console.log("  " + OUTPUT_PDF);
})();
