# Engineering Journey & Prompt History: Bill Book

This document records the sequence of development prompts, engineering decisions, and testing iterations followed to build the **Autonomous Offline Bill Book & UPI QR Billing App** for the BSERC Internship (Week 2, Project 7).

---

## Prompt 1: Requirements Breakdown & POS Architecture
> **Prompt:**  
> "I need to build an offline billing app for a neighbourhood store called Bill Book.
> Requirements:
> 1. Shop profile (Sharma Stores) and catalog with pre-set pricing.
> 2. Rapid checkout supporting quantity steppers, discount (flat/percent), and tax (GST).
> 3. Dynamic offline Bharat QR / UPI payment string generator (upi://pay?pa=...&pn=...&am=...).
> 4. Canvas-based receipt card rasterizer exportable directly for WhatsApp.
> 5. Daily sales ledger rollups and bill history surviving restarts.
> 6. Progressive Web App (PWA) installable on mobile phones in flight mode."

**Outcome:**  
Defined modular architecture with `catalog.js`, `billing.js`, and `qr-code.js`.

---

## Prompt 2: Offline UPI QR Code Engine
> **Prompt:**  
> "Implement `js/qr-code.js` with pure vanilla JavaScript without relying on any external CDNs or online QR API servers, since the app must generate valid UPI payment QR codes when offline or in flight mode."

**Outcome:**  
Engineered self-contained Reed-Solomon polynomial QR generator producing standard QR canvases directly in the browser.

---

## Prompt 3: Mathematical Hand-Calculation Verification
> **Prompt:**  
> "Build `test_billing_calc.js` to verify exact calculations for 5 different bills with discounts, taxes, and round-offs matching manual calculations. Ensure Bill 1 matches the preview: Rice 2kg ₹120 + Oil 1L ₹165 = Total ₹285."

**Outcome:**  
Automated test suite confirmed all 5 test bills with 100% precision.

---

## Prompt 4: Canvas Receipt Card & WhatsApp Share
> **Prompt:**  
> "Create a receipt rasterizer that paints the shop header, item table, rollups, and embedded UPI QR code onto an image card for download, along with a pre-formatted WhatsApp text payload."

**Outcome:**  
Delivered `rasterizeReceiptCanvas()` and WhatsApp intent integration.
