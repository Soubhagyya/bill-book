# Bill Book (Offline Shop Billing & Bharat UPI QR App)

A production-grade Progressive Web App (PWA) engineered for neighbourhood retail shops and merchants. Works **100% offline in flight mode**, generates real Bharat UPI QR codes, tracks daily sales, and shares receipt cards on WhatsApp.

---

## 🌟 Key Features

1. **Complete Flight-Mode Autonomy:**
   - Full PWA support with service worker caching (`sw.js`).
   - Runs on mobile phones, tablets, or laptops without internet connectivity.

2. **Built-in Catalog & Rapid Billing:**
   - Pre-loaded store catalog (Sharma Stores) with staple provisions (Rice, Oil, Atta, Dal, Sugar, Milk).
   - Quick-add catalog pills, custom item entry, and intuitive `+` / `-` quantity steppers.

3. **Dynamic Offline UPI QR Code Engine:**
   - Bundled zero-dependency JavaScript QR generator (`js/qr-code.js`).
   - Formats official NPCI UPI payment strings (`upi://pay?pa=...&am=...&tn=...`).
   - Pre-fills exact bill amounts in Google Pay, PhonePe, Paytm, and BHIM when scanned.

4. **Taxes, Discounts & Mathematical Accuracy:**
   - Configurable discounts (Flat ₹ or % Percentage).
   - Multi-tier GST tax rates (0%, 5%, 12%, 18%).
   - Verified against 5 hand-calculated test bills with 100% precision.

5. **Visual Receipt Card & WhatsApp Sharing:**
   - Real-time HTML5 Canvas rasterizer that paints an itemized receipt with the embedded QR code.
   - One-click image download for sharing on WhatsApp or printing.

6. **Daily Sales Ledger:**
   - Aggregates daily sales rollups (e.g. `Today Total sales ₹4,860`).
   - Persistent bill log surviving device restarts.

---

## 📂 Project Architecture

```
bill-book/
├── index.html             # Single-page application markup
├── prompts.md             # Iterative development and prompt history
├── README.md              # System documentation & verification
├── test_billing_calc.js   # Automated test: 5 hand-calculated bills
├── manifest.json          # PWA installation manifest
├── sw.js                  # Service worker for offline caching
├── css/
│   └── style.css          # Responsive mobile POS design system
└── js/
    ├── qr-code.js         # Pure vanilla offline QR code generator
    ├── catalog.js         # Shop profile & catalog storage
    ├── billing.js         # Mathematical calculation & daily ledger engine
    └── app.js             # UI controller, WhatsApp integration & canvas rasterizer
```

---

## 🧮 Hand-Calculation Benchmark Verification

Verified via `test_billing_calc.js`:

| Bill # | Items Breakdown | Discount | GST | Calculated Total | Verification Status |
|---|---|---|---|---|---|
| **#101** | Rice 2kg (₹120) + Oil 1L (₹165) | ₹0 | 0% | **₹285** | **PASSED (Exact match to PDF)** |
| **#102** | Atta 5kg (₹220) + Sugar 2kg (₹84) | ₹14 Flat | 0% | **₹290** | **PASSED** |
| **#103** | Toor Dal 3kg (₹420) + Tea 2pk (₹240) | 5% (₹33) | 5% (₹31.35) | **₹658** | **PASSED** |
| **#104** | Milk 4L (₹264) + Salt 2kg (₹50) + Snacks 5pk (₹150) | ₹24 Flat | 12% (₹52.80) | **₹493** | **PASSED** |
| **#105** | Turmeric 4pk (₹220) + Rice 10kg (₹600) | 10% (₹82) | 18% (₹132.84) | **₹871** | **PASSED** |

Execution Command:
```bash
node test_billing_calc.js
```

---

## 🚀 How to Run Locally

Double-click `index.html` or open in any mobile or desktop browser:
```
index.html
```

---

*Authored by Soubhagya for Bharat Space Education Research Centre (BSERC) Internship — Week 2 Submission.*
