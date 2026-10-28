/* ===== STORE SETTINGS ===== */
const STORE = { name: "UrbanThread", base: "https://abishekwabi.github.io/urbanthread-store", email: "support@urbanthread.example" };

/* To use online image links (ImgBB / Cloudinary), paste the direct URL here.
   Leave "" to use the local image files in the main folder. */
const IMG = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" };

const P = (id, name, cat, mrp, price, desc, features, specs, reviews) => ({
  id, name, cat, mrp, price, desc, features, specs, reviews,
  slug: `product${id}.html`,
  img: IMG[id] || `p${id}.webp`,
  thumb: IMG[id] || `p${id}-s.webp`
});

const PRODUCTS = [
  P(1, "Brown Knit Oversized Polo T-Shirt", "T-Shirts", 1299, { S: 549, M: 574, L: 599, XL: 629 },
    "A relaxed, drop-shoulder polo in a textured brown knit with cream and black tipping on the collar, sleeves and hem. Smart enough for a cafe, easy enough for every day.",
    ["Textured waffle-knit fabric", "Open V-neck collar with contrast tipping", "Oversized drop-shoulder fit", "Breathable and soft on skin", "Ribbed striped hem and cuffs"],
    { Fabric: "Cotton blend knit", Fit: "Oversized", Sleeve: "Half sleeve", Colour: "Brown", Care: "Machine wash cold, do not bleach" },
    [["Karthik R", 5, "Looks premium", "The knit texture looks much better in person. Oversized fit is exactly what I wanted.", "12 Oct 2026"],
     ["Vignesh S", 4, "Good for the price", "Soft fabric and the tipping looks neat. Order one size down if you like a regular fit.", "03 Oct 2026"],
     ["Arun M", 5, "Got compliments", "Wore it twice already, colour has not faded after the first wash.", "21 Sep 2026"]]),
  P(2, "Grey Washed Baggy Cargo Jeans", "Jeans", 2199, { S: 899, M: 929, L: 949, XL: 979 },
    "Streetwear-ready baggy jeans in a faded charcoal wash with a big side cargo pocket and an elastic drawstring waist for all-day comfort.",
    ["Acid-wash charcoal denim", "Large flap cargo pocket", "Elastic waist with drawstring", "Wide straight leg", "Heavy, durable denim"],
    { Fabric: "100% cotton denim", Fit: "Baggy / wide leg", Rise: "Mid rise", Colour: "Charcoal grey", Waist: "S 28 / M 30 / L 32 / XL 34", Care: "Wash inside out" },
    [["Dinesh K", 5, "Super comfortable", "Elastic waist is a lifesaver. The wash looks exactly like the photos.", "15 Oct 2026"],
     ["Praveen J", 4, "Nice but long", "Great quality denim. I'm short, so I had to get the hem altered.", "29 Sep 2026"],
     ["Sathish B", 5, "Worth it", "Pocket is deep enough for a phone and wallet. Fits true to size.", "10 Sep 2026"]]),
  P(3, "Beige Plaid Cotton Casual Shirt", "Shirts", 1499, { S: 649, M: 674, L: 699, XL: 729 },
    "A soft brushed-cotton shirt in warm beige and cream checks. Wear it buttoned for college or open over a plain tee for the weekend.",
    ["Brushed cotton feels soft", "Classic spread collar", "Full sleeves with roll-up tabs", "Curved hem, wear tucked or untucked", "Neutral colours match anything"],
    { Fabric: "Brushed cotton", Fit: "Regular", Sleeve: "Full sleeve", Colour: "Beige / cream", Pattern: "Plaid check", Care: "Machine wash, warm iron" },
    [["Manoj P", 5, "Perfect neutral shirt", "Goes with jeans and chinos both. Fabric is warm but not heavy.", "18 Oct 2026"],
     ["Ganesh L", 4, "Good stitching", "Buttons are strong and checks line up well on the front.", "05 Oct 2026"],
     ["Hari N", 4, "Nice colour", "Slightly lighter than the photo but still great.", "24 Sep 2026"]]),
  P(4, "Sage Green Plaid Shirt", "Shirts", 1399, { S: 579, M: 604, L: 629, XL: 659 },
    "A fresh sage-green check shirt that looks sharp over a white tee. Light, airy and easy to style through summer.",
    ["Lightweight breathable weave", "Soft pastel green check", "Relaxed everyday fit", "Pearl-finish buttons", "Pairs well with white tees"],
    { Fabric: "Cotton poplin", Fit: "Relaxed", Sleeve: "Full sleeve", Colour: "Sage green", Pattern: "Plaid check", Care: "Machine wash cold" },
    [["Surya T", 5, "Fresh look", "Colour is lovely and very light to wear in the heat.", "20 Oct 2026"],
     ["Naveen D", 5, "Great with white tee", "Exactly like the picture. Fit is a bit loose, which I like.", "08 Oct 2026"],
     ["Bala V", 3, "Okay", "Good shirt, but the fabric wrinkles easily. Needs ironing.", "30 Sep 2026"]]),
  P(5, "Maroon Waffle-Knit Polo T-Shirt", "T-Shirts", 1199, { S: 499, M: 524, L: 549, XL: 579 },
    "A rich maroon polo with an open collar and contrast cream cuffs. The waffle texture adds depth and keeps it breathable.",
    ["Waffle-knit texture", "Cream contrast collar and cuffs", "Open V placket, no buttons to fuss over", "Regular comfortable fit", "Deep colour that hides creases"],
    { Fabric: "Cotton blend", Fit: "Regular", Sleeve: "Half sleeve", Colour: "Maroon", Care: "Machine wash cold, dry in shade" },
    [["Rahul C", 5, "Love the colour", "Deep maroon looks classy. Collar stays flat after washing.", "17 Oct 2026"],
     ["Immanuel A", 4, "Comfortable", "Feels soft and breathable, good for long days.", "02 Oct 2026"],
     ["Jegan R", 5, "Value for money", "Looks like a much costlier polo. Will buy another colour.", "14 Sep 2026"]]),
  P(6, "Brown Washed Wide-Leg Jeans", "Jeans", 2399, { S: 929, M: 954, L: 979, XL: 1009 },
    "Vintage brown-wash wide-leg jeans with distressed detailing on the pocket and a clean straight drop. Pair with white sneakers for an easy street look.",
    ["Vintage brown wash", "Distressed pocket detail", "Wide-leg loose fit", "Five-pocket classic styling", "Sturdy cotton denim"],
    { Fabric: "100% cotton denim", Fit: "Loose / wide leg", Rise: "Mid rise", Colour: "Washed brown", Waist: "S 28 / M 30 / L 32 / XL 34", Care: "Wash separately first" },
    [["Gokul S", 5, "Unique colour", "Nobody else has this shade. Denim feels thick and good quality.", "19 Oct 2026"],
     ["Ashwin G", 4, "Stylish", "Looks great with white sneakers. Waist runs slightly big.", "06 Oct 2026"],
     ["Kishore M", 5, "Loved it", "Fit is relaxed without being too baggy. Delivery was quick.", "26 Sep 2026"]])
];
if (typeof module !== "undefined") module.exports = { STORE, PRODUCTS };
