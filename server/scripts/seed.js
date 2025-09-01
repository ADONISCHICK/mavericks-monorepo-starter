const fs = require('fs');
const path = require('path');

const categories = [
  "Electronics","Appliances","Computers","Phones","Gaming",
  "Home & Living","Beauty & Personal Care","Health","Sports",
  "Toys","Fashion - Men","Fashion - Women","Automotive","Books","Groceries"
];

const carMakes = [
  { make:"Volkswagen", origin:"Germany" }, { make:"BMW", origin:"Germany" }, { make:"Mercedes-Benz", origin:"Germany" },
  { make:"Toyota", origin:"Japan" }, { make:"Honda", origin:"Japan" }, { make:"Nissan", origin:"Japan" },
  { make:"Ford", origin:"USA" }, { make:"Chevrolet", origin:"USA" }, { make:"Tesla", origin:"USA" },
  { make:"Volvo", origin:"Sweden" }, { make:"Hyundai", origin:"South Korea" }, { make:"Kia", origin:"South Korea" }
];

const sizes = ["XS","S","M","L","XL","XXL"];
const fabrics = ["100% Cotton","Cotton/Poly Blend","Merino Wool","Linen","Denim","Silk"];

function r(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(a){ return a[r(0,a.length-1)]; }
function price(min=10,max=1200){ return +(min + Math.random()*(max-min)).toFixed(2); }

function carSpecs() {
  const { make, origin } = pick(carMakes);
  const model = ["Golf","Polo","Passat","X5","C-Class","Model 3","Model Y","Corolla","Civic","Altima","S60","F-150"][r(0,11)];
  const year = r(2015, 2025);
  const engine = [`${r(1,5)}.${r(0,9)}L`, `${r(100,450)} kW EV`][r(0,1)];
  const horsepower = r(90, 680);
  const torqueNm = r(140, 900);
  const transmission = ["Manual","Automatic","DCT","CVT"][r(0,3)];
  const drivetrain = ["FWD","RWD","AWD"][r(0,2)];
  const fuel = ["Petrol","Diesel","Hybrid","Electric"][r(0,3)];
  const mileageKm = r(0, 190000);
  const color = ["Black","White","Silver","Grey","Blue","Red"][r(0,5)];
  const vin = "WVWZZZ" + r(1000000,9999999);
  const lengthMm = r(4200,5200), widthMm=r(1750,2100), heightMm=r(1380,1700);

  return {
    type: "car",
    make, model, year, origin,
    engine, horsepower, torqueNm, fuel,
    transmission, drivetrain,
    color, mileageKm, vin,
    dimensions: { lengthMm, widthMm, heightMm },
    seats: r(2,7), doors:r(2,5), condition: ["New","Used","Certified Pre-Owned"][r(0,2)],
    warranty: `${r(1,5)} years`,
  };
}

function clothingSpecs() {
  return {
    type: "clothing",
    gender: ["Men","Women","Unisex"][r(0,2)],
    fabric: pick(fabrics),
    fit: ["Slim","Regular","Relaxed","Oversized"][r(0,3)],
    sizes,
    care: ["Machine wash cold","Hand wash","Dry clean only"][r(0,2)],
    origin: ["Italy","Portugal","China","Vietnam","Bangladesh","Turkey","India"][r(0,6)],
  };
}

function electronicsSpecs() {
  return {
    type: "electronics",
    brand: ["Sony","Samsung","Apple","LG","HP","Dell","Lenovo","Asus","Acer"][r(0,8)],
    model: "Model " + r(100,999),
    warrantyMonths: r(12,36),
    batteryMah: r(2000,10000),
    weightKg: +(Math.random()*3+0.2).toFixed(2),
  };
}

function genericSpecs() {
  return {
    type: "generic",
    brand: ["Mavericks","PrimeLab","Nordic","Apex","Nimbus","Zenra"][r(0,5)],
    material: ["Aluminum","ABS","Steel","Bamboo","Glass","Polycarbonate"][r(0,5)],
    origin: ["UK","EU","USA","China","Japan","Korea"][r(0,5)],
  };
}

function productForCategory(cat, idx) {
  const base = {
    id: `p${idx}`,
    title: `${cat} Item ${idx}`,
    price: price(12, 55000),
    currency: "USD",
    category: cat,
    createdAt: Date.now() - r(0,300)*24*3600*1000,
    images: [
      `https://picsum.photos/id/${(100+idx)%1000}/3000/3000`,
      `https://picsum.photos/id/${(101+idx)%1000}/3000/3000`,
      `https://picsum.photos/id/${(102+idx)%1000}/3000/3000`
    ],
    description: `Premium ${cat} item engineered by Mavericks Group with rigorous QA and global warranty.`,
    availability: ["in_stock","limited","backorder","preorder"][r(0,3)]
  };

  if (cat === "Automotive") {
    base.price = price(3500, 120000);
    base.specs = carSpecs();
  } else if (cat.startsWith("Fashion")) {
    base.price = price(9, 400);
    base.specs = clothingSpecs();
  } else if (cat==="Electronics" || cat==="Computers" || cat==="Phones" || cat==="Gaming") {
    base.specs = electronicsSpecs();
  } else {
    base.specs = genericSpecs();
  }

  return base;
}

const total = 2000;
const out = [];
for (let i=1;i<=total;i++){
  const cat = categories[i % categories.length];
  out.push(productForCategory(cat, i));
}

const target = path.join(__dirname, '..', 'data', 'products.json');
fs.mkdirSync(path.dirname(target), { recursive:true });
fs.writeFileSync(target, JSON.stringify(out,null,2));
console.log(`Wrote ${out.length} products to ${target}`);
