const fs = require("fs");

// فایل اصلی رو بخون
const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));

// برای همه محصولات اگر inventory نداشتن، اضافه کن
db.products = db.products.map((product) => ({
  ...product,
  inventory: product.inventory || Math.floor(Math.random() * 20) + 1, // عدد تصادفی بین 1 تا 20
}));

// دوباره ذخیره کن
fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf-8");

console.log("✅ همه محصولات inventory گرفتن!");
