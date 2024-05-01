const productId = new URLSearchParams(window.location.search);

interface Addtocart{
  uid:string|null;
  title:string;
  quantity:number;
  thumbnail:string;
  totalprice:number;
  price:number;
  id:number;
}

const cart:Addtocart[] = JSON.parse(localStorage.getItem("cart")??"[]");

interface Details{
  title:string;
  price:number;
  thumbnail:string;
  description:string;
}

const viewDetails=async()=>{
  const product = await fetch(`https://dummyjson.com/products/${productId.get("id")}`);
  const details:Details = await product.json();
  const {title,price,thumbnail,description} = details;
  let list = `
  <div class="card" style="width:20rem;">
  <img src="${thumbnail}" class="card-img-top" alt="${title}">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <h5 class="card-title">$${price}</h5>
    <p class="card-text">${description}</p>
    <button onclick="addToCart(${productId.get("id")})" class="btn btn-danger">Add to Cart</button>
    <a href="../homepage.html" class="btn btn-primary">Homepage</a>
  </div>
</div>  
  `;
  document.body.innerHTML=list;
};
viewDetails();

async function addToCart(id:number){
  const data = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await data.json();
  const {title,price,thumbnail} = product;
  const item:Addtocart={
    uid:sessionStorage.getItem("id"),
    id:id,
    title:title,
    price:price,
    totalprice:price,
    thumbnail:thumbnail,
    quantity:1
  }
  const findId = cart.findIndex((element)=>element.id==id);
  if (findId != -1) {
    cart[findId].quantity++;
    cart[findId].totalprice = cart[findId].totalprice + cart[findId].price;
    alert(`Quantity addded successfully!`);
  }else{
    cart.push(item);
    alert(`Item added successfully!`);
  }
  localStorage.setItem("cart",JSON.stringify(cart));
}