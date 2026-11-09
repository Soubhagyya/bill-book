const fs = require('fs');
const vm = require('vm');
const path = require('path');

const billingCode = fs.readFileSync(path.join(__dirname, 'js', 'billing.js'), 'utf8');

const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(billingCode + '\nthis.BillingEngine = BillingEngine;', sandbox);
const Engine = sandbox.BillingEngine;

console.log('=== VERIFYING 5 HAND-CALCULATED BILLS ===\n');

// Bill 1: (From PDF Preview) Rice 2kg @ 60, Oil 1L @ 165
const bill1Items = [
  { name: 'Rice', quantity: 2, price: 60 },
  { name: 'Sunflower Oil', quantity: 1, price: 165 }
];
const b1 = Engine.calculateTotals(bill1Items, 'flat', 0, 0);
console.log('Bill 1 -> Subtotal:', b1.subtotal, 'Total:', b1.grandTotal, 'Expected: 285');
if (b1.grandTotal !== 285) throw new Error('Bill 1 mismatch');

// Bill 2: Atta 5kg @ 44, Sugar 2kg @ 42, Discount flat ₹14
const bill2Items = [
  { name: 'Atta', quantity: 5, price: 44 }, // 220
  { name: 'Sugar', quantity: 2, price: 42 }  // 84 -> 304 - 14 = 290
];
const b2 = Engine.calculateTotals(bill2Items, 'flat', 14, 0);
console.log('Bill 2 -> Subtotal:', b2.subtotal, 'Discount:', b2.discountAmount, 'Total:', b2.grandTotal, 'Expected: 290');
if (b2.grandTotal !== 290) throw new Error('Bill 2 mismatch');

// Bill 3: Toor Dal 3kg @ 140, Tea 2 @ 120, Discount 5%, Tax 5%
// Subtotal = 420 + 240 = 660. Discount 5% = 33. Taxable = 627. Tax 5% = 31.35. Exact = 658.35 -> Rounded = 658
const bill3Items = [
  { name: 'Toor Dal', quantity: 3, price: 140 },
  { name: 'Tea', quantity: 2, price: 120 }
];
const b3 = Engine.calculateTotals(bill3Items, 'percent', 5, 5);
console.log('Bill 3 -> Subtotal:', b3.subtotal, 'Discount:', b3.discountAmount, 'Tax:', b3.taxAmount, 'Total:', b3.grandTotal, 'Expected: 658');
if (b3.grandTotal !== 658) throw new Error('Bill 3 mismatch');

// Bill 4: Milk 4L @ 66, Salt 2kg @ 25, Biscuits 5 @ 30, Flat discount 24, Tax 12%
// Subtotal = 264 + 50 + 150 = 464. Discount 24 -> Taxable = 440. Tax 12% = 52.8. Exact = 492.8 -> Rounded = 493
const bill4Items = [
  { name: 'Milk', quantity: 4, price: 66 },
  { name: 'Salt', quantity: 2, price: 25 },
  { name: 'Biscuits', quantity: 5, price: 30 }
];
const b4 = Engine.calculateTotals(bill4Items, 'flat', 24, 12);
console.log('Bill 4 -> Subtotal:', b4.subtotal, 'Discount:', b4.discountAmount, 'Tax:', b4.taxAmount, 'Total:', b4.grandTotal, 'Expected: 493');
if (b4.grandTotal !== 493) throw new Error('Bill 4 mismatch');

// Bill 5: Turmeric 4 @ 55, Rice 10kg @ 60, Discount 10%, Tax 18%
// Subtotal = 220 + 600 = 820. Discount 10% = 82 -> Taxable = 738. Tax 18% = 132.84. Exact = 870.84 -> Rounded = 871
const bill5Items = [
  { name: 'Turmeric', quantity: 4, price: 55 },
  { name: 'Rice', quantity: 10, price: 60 }
];
const b5 = Engine.calculateTotals(bill5Items, 'percent', 10, 18);
console.log('Bill 5 -> Subtotal:', b5.subtotal, 'Discount:', b5.discountAmount, 'Tax:', b5.taxAmount, 'Total:', b5.grandTotal, 'Expected: 871');
if (b5.grandTotal !== 871) throw new Error('Bill 5 mismatch');

console.log('\n--- ALL 5 BILL CALCULATIONS VERIFIED 100% ACCURATELY! ---');
