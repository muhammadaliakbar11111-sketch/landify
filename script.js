// CUSTOMIZE BEFORE PUBLISHING:
const WHATSAPP_NUMBER = "923001234567"; // Replace with your WhatsApp number, country code included, no + sign.
const CURRENCY = "Rs. ";

const products = [
  {id:1,name:"The Heritage Loafer",category:"men",price:8500,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=800&q=85"},
  {id:2,name:"Everyday Leather Sandal",category:"sandals",price:5200,tag:"HANDMADE",image:"https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=85"},
  {id:3,name:"Classic Artisan Oxford",category:"men",price:9800,tag:"SMALL BATCH",image:"https://images.unsplash.com/photo-1614252369475-531863a6226b?auto=format&fit=crop&w=800&q=85"},
  {id:4,name:"The Sunday Mule",category:"women",price:6900,tag:"NEW",image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85"},
  {id:5,name:"Soft Step Khussa",category:"women",price:5900,tag:"HAND FINISHED",image:"https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=85"},
  {id:6,name:"City Walk Sandal",category:"sandals",price:4800,tag:"EVERYDAY",image:"https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=85"},
  {id:7,name:"The Workshop Derby",category:"men",price:9200,tag:"TIMELESS",image:"https://images.unsplash.com/photo-1614252369475-531863a6226b?auto=format&fit=crop&w=800&q=85"},
  {id:8,name:"Luna Leather Flat",category:"women",price:6400,tag:"COMFORT FIT",image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85"}
];
let cart = [];
const grid = document.getElementById("productGrid");
const money = n => CURRENCY + n.toLocaleString("en-PK");
function renderProducts(filter="all"){
  grid.innerHTML = "";
  products.filter(p=>filter==="all" || p.category===filter).forEach(p=>{
    const card=document.createElement("article"); card.className="product-card";
    card.innerHTML=`<div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="add-button" aria-label="Add ${p.name} to bag">+</button></div><div class="product-info"><h3>${p.name}</h3><div class="product-meta"><span>Handmade footwear</span><strong>${money(p.price)}</strong></div></div>`;
    card.querySelector("button").addEventListener("click",()=>addToCart(p.id)); grid.appendChild(card);
  });
}
function addToCart(id){const p=products.find(x=>x.id===id);const found=cart.find(x=>x.id===id);if(found)found.qty++;else cart.push({...p,qty:1});renderCart();showToast("Added to your bag");}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);
  document.getElementById("cartSubtotal").textContent=money(cart.reduce((s,p)=>s+p.price*p.qty,0));
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML='<p class="empty-cart">Your bag is waiting for something lovely.</p>';return;}
  box.innerHTML=cart.map(p=>`<div class="cart-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>Qty: ${p.qty} · ${money(p.price*p.qty)}</small></div><button class="remove-item" data-id="${p.id}">Remove</button></div>`).join("");
  box.querySelectorAll(".remove-item").forEach(b=>b.addEventListener("click",()=>{cart=cart.filter(p=>p.id!==Number(b.dataset.id));renderCart();}));
}
function toggleCart(open){document.getElementById("cartDrawer").classList.toggle("show",open);document.getElementById("cartOverlay").classList.toggle("show",open);}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");b.classList.add("active");renderProducts(b.dataset.filter);}));
document.getElementById("cartOpen").addEventListener("click",()=>toggleCart(true));
document.getElementById("cartClose").addEventListener("click",()=>toggleCart(false));
document.getElementById("cartOverlay").addEventListener("click",()=>toggleCart(false));
document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(!cart.length){showToast("Your bag is empty");return;}
  if(WHATSAPP_NUMBER==="923001234567"){showToast("Please add your WhatsApp number in script.js first");return;}
  const lines=cart.map(p=>`${p.name} x ${p.qty} — ${money(p.price*p.qty)}`).join("\n");
  const total=cart.reduce((s,p)=>s+p.price*p.qty,0);
  const message=`Hello CraftStep! I'd like to place an order:\n${lines}\nTotal: ${money(total)}\n\nPlease confirm sizes, availability and delivery.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");
});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thank you! Connect this form to an email service to collect subscribers.";e.target.reset();});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
