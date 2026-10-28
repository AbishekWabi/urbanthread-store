const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const inr=n=>"₹"+Number(n).toLocaleString("en-IN");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const store={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const cart=()=>store.get("ut_cart",[]),wish=()=>store.get("ut_wish",[]);
const byId=id=>PRODUCTS.find(p=>p.id==id),minP=p=>Math.min(...Object.values(p.price)),pct=(m,p)=>Math.round((m-p)/m*100);
const allReviews=p=>[...store.get("ut_rev_"+p.id,[]),...p.reviews.map(([n,r,t,x,d])=>({n,r,t,x,d}))];
const avg=p=>{const a=allReviews(p);return a.reduce((s,x)=>s+x.r,0)/a.length};
const starStr=r=>"★".repeat(r)+"☆".repeat(5-r);

function toast(m){let t=$("#toast");if(!t){t=document.createElement("div");t.id="toast";document.body.append(t)}t.textContent=m;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),2200)}
function badges(){$("#cb").textContent=cart().reduce((s,i)=>s+i.qty,0);$("#wb").textContent=wish().length}

function layout(){
  $("#hdr").innerHTML=`<header><div class="wrap nav"><a class="logo" href="index.html">${STORE.name}</a>
  <ul><li><a href="index.html">Home</a></li><li><a href="index.html#products">Shop</a></li><li><a href="index.html?cat=Shirts#products">Shirts</a></li><li><a href="index.html?cat=T-Shirts#products">T-Shirts</a></li><li><a href="index.html?cat=Jeans#products">Jeans</a></li><li><a href="#contact">Contact</a></li></ul>
  <div class="search"><input id="q" type="search" placeholder="Search for shirts, jeans..." aria-label="Search products"></div>
  <div class="icons"><a class="ic" href="index.html?wish=1#products" title="Wishlist" aria-label="Wishlist">♡<span class="badge" id="wb">0</span></a><a class="ic" href="cart.html" title="Cart" aria-label="Cart">🛍<span class="badge" id="cb">0</span></a></div></div></header>`;
  $("#ftr").innerHTML=`<footer id="contact"><div class="wrap"><div class="fg"><div><h4>${STORE.name}</h4><p>Everyday menswear with simple prices and easy returns. This is a demo store made for a study project.</p></div>
  <div><h4>Shop</h4>${PRODUCTS.map(p=>`<a href="${p.slug}">${p.name}</a>`).join("")}</div>
  <div><h4>Help</h4><a href="cart.html">Your cart</a><a href="#contact">${STORE.email}</a><a href="#contact">7-day easy returns</a><a href="#contact">Cash on delivery</a></div></div>
  <p class="copy">© ${new Date().getFullYear()} ${STORE.name}. All rights reserved. Demo store, no real orders.</p></div></footer>`;
  const q=$("#q");
  q.addEventListener("input",()=>{const t=$("#products");if(t&&$("#grid")){renderGrid(q.value);if(q.value&&t.getBoundingClientRect().top>100)t.scrollIntoView({behavior:"smooth",block:"start"})}});
  q.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=$("#products");if(t)t.scrollIntoView({behavior:"smooth",block:"start"});else location.href="index.html?q="+encodeURIComponent(q.value)+"#products"});
  badges();
}

const card=p=>{const m=minP(p),w=wish().includes(p.id);return `<article class="card"><a href="${p.slug}"><img src="${p.thumb}" alt="${esc(p.name)}" width="400" height="533" loading="lazy" decoding="async"><span class="off">${pct(p.mrp,m)}% OFF</span></a><button class="heart${w?" on":""}" data-w="${p.id}" aria-label="Add to wishlist">${w?"♥":"♡"}</button><div class="ci"><span class="rt">${avg(p).toFixed(1)} ★ | ${allReviews(p).length}</span><h3><a href="${p.slug}">${esc(p.name)}</a></h3><p><b>From ${inr(m)}</b> <s>${inr(p.mrp)}</s></p></div></article>`};
function renderGrid(q="",onlyWish=false,cat=""){
  q=q.toLowerCase().trim();
  const list=PRODUCTS.filter(p=>(!q||(p.name+" "+p.cat).toLowerCase().includes(q))&&(!onlyWish||wish().includes(p.id))&&(!cat||p.cat===cat));
  $("#grid").innerHTML=list.length?list.map(card).join(""):`<p style="grid-column:1/-1;text-align:center;padding:40px">No products found.</p>`;
}

function reviewsHTML(p){
  const a=allReviews(p),n=a.length,v=avg(p);
  const bars=[5,4,3,2,1].map(s=>{const c=a.filter(x=>x.r===s).length;return `<div class="bar"><span>${s} ★</span><i><b style="width:${c/n*100}%"></b></i><span>${c}</span></div>`}).join("");
  return `<div class="rsum"><div class="big">${v.toFixed(1)}<small> ★</small><p>${n} verified ratings</p></div><div>${bars}</div></div>
  <form id="rf"><h3>Write a review</h3><input name="n" placeholder="Your name" required maxlength="40"><select name="r" aria-label="Rating"><option value="5">★★★★★ Excellent</option><option value="4">★★★★ Good</option><option value="3">★★★ Average</option><option value="2">★★ Poor</option><option value="1">★ Terrible</option></select><input name="t" placeholder="Review title" required maxlength="60"><textarea name="x" rows="3" placeholder="Share your experience with this product" required maxlength="500"></textarea><button class="btn" type="submit">Submit review</button></form>
  ${a.map(x=>`<div class="rv"><div class="h"><span class="s">${x.r} ★</span><b>${esc(x.t)}</b></div><p>${esc(x.x)}</p><small>${esc(x.n)} · ${esc(x.d)} · Verified buyer</small></div>`).join("")}`;
}

function renderProduct(){
  const p=byId(document.body.dataset.id);let size=Object.keys(p.price)[0],qty=1;
  const rel=PRODUCTS.filter(x=>x.id!==p.id).slice(0,4);
  $("#app").innerHTML=`<nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="index.html?cat=${encodeURIComponent(p.cat)}#products">${p.cat}</a> / ${esc(p.name)}</nav>
  <section class="pd"><div class="gal"><img src="${p.img}" alt="${esc(p.name)}" width="800" height="1067" fetchpriority="high" decoding="async"></div>
  <div class="info"><h1>${esc(p.name)}</h1><p class="sub">${p.cat} · ${STORE.name}</p><div class="rate" id="rtop"></div>
  <div class="pr"><span id="pp"></span><s id="pm"></s><em id="po"></em></div><small>Inclusive of all taxes</small>
  <h4>SELECT SIZE</h4><div class="sizes" id="sz">${Object.entries(p.price).map(([s,v])=>`<button data-s="${s}">${s}<small>${inr(v)}</small></button>`).join("")}</div>
  <h4>QUANTITY</h4><div class="qty"><button id="qm" aria-label="Decrease">−</button><span id="qv">1</span><button id="qp" aria-label="Increase">+</button></div>
  <div class="acts"><button class="btn" id="add">Add to cart</button><button class="btn alt" id="buy">Buy now</button></div>
  <h4>CHECK DELIVERY</h4><div class="pin"><input id="pin" inputmode="numeric" maxlength="6" placeholder="Enter pincode"><button id="pinb">Check</button></div><div id="pinmsg"></div>
  <div class="perks"><span>🚚 Free delivery above ₹999</span><span>↩ 7-day easy return</span><span>💵 Cash on delivery available</span><span>🔒 100% secure checkout</span></div></div></section>
  <section class="sec"><h2>Product details</h2><p>${esc(p.desc)}</p></section>
  <section class="sec"><h2>Key features</h2><ul>${p.features.map(f=>`<li>${esc(f)}</li>`).join("")}</ul></section>
  <section class="sec"><h2>Specifications</h2><table class="sp">${Object.entries(p.specs).map(([k,v])=>`<tr><td>${k}</td><td>${esc(v)}</td></tr>`).join("")}</table></section>
  <section class="sec" id="reviews"><h2>Ratings &amp; reviews</h2><div id="revs"></div></section>
  <section class="sec"><h2>You may also like</h2><div class="grid" id="grid">${rel.map(card).join("")}</div></section>`;
  const upd=()=>{const pr=p.price[size];$("#pp").textContent=inr(pr);$("#pm").textContent=inr(p.mrp);$("#po").textContent=`(${pct(p.mrp,pr)}% OFF)`;$("#qv").textContent=qty;$$("#sz button").forEach(b=>b.classList.toggle("on",b.dataset.s===size))};
  const top=()=>{$("#rtop").innerHTML=`${avg(p).toFixed(1)} <span>★</span> | ${allReviews(p).length} ratings`};
  const revs=()=>{$("#revs").innerHTML=reviewsHTML(p);top();$("#rf").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const u=store.get("ut_rev_"+p.id,[]);u.unshift({n:f.get("n").trim(),r:+f.get("r"),t:f.get("t").trim(),x:f.get("x").trim(),d:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})});store.set("ut_rev_"+p.id,u);revs();toast("Thanks! Your review is added")}};
  const addToCart=()=>{const c=cart(),i=c.find(x=>x.id===p.id&&x.size===size);if(i){i.qty+=qty;i.price=p.price[size]}else c.push({id:p.id,size,qty,price:p.price[size]});store.set("ut_cart",c);badges()};
  $("#sz").onclick=e=>{const b=e.target.closest("button");if(b){size=b.dataset.s;upd()}};
  $("#qm").onclick=()=>{if(qty>1){qty--;upd()}};$("#qp").onclick=()=>{if(qty<10){qty++;upd()}};
  $("#add").onclick=()=>{addToCart();toast(`Added: ${p.name} (${size})`)};
  $("#buy").onclick=()=>{addToCart();location.href="cart.html"};
  $("#pinb").onclick=()=>{const v=$("#pin").value.trim(),m=$("#pinmsg");if(!/^[1-9]\d{5}$/.test(v)){m.className="bad";m.textContent="Please enter a valid 6-digit pincode";return}const d=new Date();d.setDate(d.getDate()+4);m.className="ok";m.textContent=`Delivery by ${d.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})} · Cash on delivery available`};
  upd();revs();
}

function renderCart(){
  const c=cart(),box=$("#cartbox");
  if(!c.length){box.innerHTML=`<div class="empty"><h2>Your cart is empty</h2><p>Add something you like.</p><a class="btn" href="index.html#products">Continue shopping</a></div>`;return}
  let sub=0,mrp=0;
  const rows=c.map((i,k)=>{const p=byId(i.id);sub+=i.price*i.qty;mrp+=p.mrp*i.qty;return `<div class="row"><img src="${p.thumb}" alt="${esc(p.name)}" width="100" height="133"><div><h3><a href="${p.slug}">${esc(p.name)}</a></h3><p>Size: ${i.size}</p><p><b style="color:#1c1c1c">${inr(i.price)}</b> <s>${inr(p.mrp)}</s></p><div class="qty"><button data-d="${k}" data-v="-1">−</button><span>${i.qty}</span><button data-d="${k}" data-v="1">+</button></div></div><button class="rm" data-r="${k}" aria-label="Remove">✕</button></div>`}).join("");
  const ship=sub>=999?0:49,tot=sub+ship;
  box.innerHTML=`<div class="cartg"><div><h2 style="margin-bottom:6px">Shopping cart (${c.length})</h2>${rows}</div>
  <aside><div class="box"><h3>PRICE DETAILS</h3><div class="ln"><span>Total MRP</span><span>${inr(mrp)}</span></div><div class="ln"><span>Discount</span><span class="ok">− ${inr(mrp-sub)}</span></div><div class="ln"><span>Delivery</span><span>${ship?inr(ship):"FREE"}</span></div><div class="ln tot"><span>Total amount</span><span>${inr(tot)}</span></div></div>
  <form class="box ck" id="ck"><h3>DELIVERY DETAILS</h3><input name="n" placeholder="Full name" required><input name="p" placeholder="10-digit mobile number" pattern="[6-9][0-9]{9}" required><input name="a" placeholder="Pincode" pattern="[1-9][0-9]{5}" required><textarea name="d" rows="3" placeholder="Full address" required></textarea><label><input type="radio" name="m" value="Cash on delivery" checked style="width:auto"> Cash on delivery</label><label><input type="radio" name="m" value="UPI" style="width:auto"> UPI (demo)</label><button class="btn" type="submit">Place order</button></form></aside></div>`;
  box.onclick=e=>{const d=e.target.closest("[data-d]"),r=e.target.closest("[data-r]");const c=cart();if(d){const i=c[d.dataset.d];i.qty=Math.min(10,Math.max(1,i.qty+ +d.dataset.v))}else if(r)c.splice(r.dataset.r,1);else return;store.set("ut_cart",c);badges();renderCart()};
  $("#ck").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),id="UT"+Date.now().toString().slice(-8);const o=store.get("ut_orders",[]);o.push({id,items:c,total:tot,name:f.get("n"),pay:f.get("m"),date:new Date().toISOString()});store.set("ut_orders",o);store.set("ut_cart",[]);badges();box.innerHTML=`<div class="done"><h2 style="color:#14958f">✔ Order placed!</h2><p>Thank you, ${esc(f.get("n"))}. Your order <b>${id}</b> of ${inr(tot)} is confirmed (${esc(f.get("m"))}).</p><a class="btn" href="index.html">Continue shopping</a></div>`;scrollTo(0,0)};
}

document.addEventListener("click",e=>{const h=e.target.closest(".heart");if(!h)return;const id=+h.dataset.w;let w=wish();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];store.set("ut_wish",w);const on=w.includes(id);h.classList.toggle("on",on);h.textContent=on?"♥":"♡";badges();toast(on?"Added to wishlist":"Removed from wishlist")});
document.addEventListener("DOMContentLoaded",()=>{
  layout();const pg=document.body.dataset.page,u=new URLSearchParams(location.search);
  if(pg==="home"){const q=u.get("q")||"";$("#q").value=q;renderGrid(q,u.has("wish"),u.get("cat")||"")}
  else if(pg==="product")renderProduct();else if(pg==="cart")renderCart();
  const nf=$("#nl");if(nf)nf.onsubmit=e=>{e.preventDefault();e.target.reset();toast("Subscribed! (demo)")};
});
