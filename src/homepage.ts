const cartLength:{}[] = JSON.parse(localStorage.getItem("cart")??"[]");
const viewCart = document.getElementById("viewcart") as HTMLAnchorElement;
viewCart.textContent=`VIEW CART(${cartLength.length})`;
const search = document.getElementById("search") as HTMLInputElement;
const loader = document.getElementById("loader");
function userLogout():void{
  sessionStorage.removeItem("id");
  window.location.href="../login.html";
}

interface Products{
  id:number;
  title:string;
  thumbnail:string;
  category:string;
}

const getProducts=async()=>{
  const response = await fetch(`https://dummyjson.com/products?limit=100`);
  const data = await response.json();
  const products:Products[] = data.products;
  let product = ``;
  products.forEach(({id,title,thumbnail})=>
    product+=`
  <div class="col-4">
  <div onclick="viewDetail(${id})" class="card" style="width: 18rem;">
  <img class="card-img-top" loading="lazy" height="150px" width="200px" src="${thumbnail}" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">${title}</h6>
  </div>
</div>
</div>
`);
  document.getElementsByClassName("row")[0].innerHTML=product;
  loader?.remove();
}
getProducts();

function viewDetail(id:number){
  window.location.href=`../product/viewdetail.html?id=${id}`;
}

const category = document.getElementsByName("category")[0];
category.addEventListener("change",async(event)=>{
  const value = (event.target as any).value;
  if(value==="CATEGORY"){
    getProducts();
  }else{
  const response = await fetch(`https://dummyjson.com/products?limit=100`);
  if(response.status===200){
  const data = await response.json();
  const products:Products[] = data.products;
  const category:Products[] = products.filter(({category})=>value===category);
  let product = ``;
  category.forEach(({id,title,thumbnail})=>
    product+=`
  <div class="col-4">
  <div onclick="viewDetail(${id})" class="card" style="width: 18rem;">
  <img class="card-img-top" loading="lazy" height="150px" width="200px" src="${thumbnail}" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">${title}</h6>
  </div>
</div>
</div>
`);
  document.getElementsByClassName("row")[0].innerHTML=product;
}else if(response.status===404){
  alert(`Data not found!`);
}}});

search.addEventListener("keyup",async(event)=>{
  const value = (event.target as any).value;
  const response = await fetch(`https://dummyjson.com/products?limit=100`);
  if(response.status===200){
    const data = await response.json();
    const products:Products[] = data.products;
    const search:Products[] = products.filter(({title})=>title.toLowerCase().includes(value.toLowerCase()));
    let product = ``;
  search.forEach(({id,title,thumbnail})=>
    product+=`
  <div class="col-4">
  <div onclick="viewDetail(${id})" class="card" style="width: 18rem;">
  <img class="card-img-top" loading="lazy" height="150px" width="200px" src="${thumbnail}" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">${title}</h6>
  </div>
</div>
</div>
`);
  document.getElementsByClassName("row")[0].innerHTML=product;
  }
  else if(response.status===404){
    alert(`Data not found!`);
  }
})
