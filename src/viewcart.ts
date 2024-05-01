interface ViewCart{
  title:string;
  price:number;
  totalprice:number;
  thumbnail:string;
  quantity:number;
}

const viewCartAll:ViewCart[] = JSON.parse(localStorage.getItem("cart")??"[]");
const totalPrice = document.getElementById("totalprice") as HTMLHeadingElement;

function total():void{
  let price = 0;
for(let i=0;i<viewCartAll.length;i++){
  price+=viewCartAll[i].totalprice;
}
  totalPrice.textContent=`Total price:$${price}`;
}
total();

const tableListing = document.querySelector("tbody") as HTMLTableSectionElement;

const viewCarListing=()=>{
  let list = ``;
    viewCartAll.map(({totalprice,title,thumbnail,quantity},index:number)=>
    list+=`
    <tr>
    <td>${title}</td>
    <td><img src="${thumbnail}" height="100px" width="100px"></td>
    <td>$${totalprice}</td>
    <td>
    <button onclick="removeOne(${index})" class="btn btn-info">-</button>
    ${quantity}
    <button onclick="addOne(${index})" class="btn btn-info">+</button>
    </td>
    <td>
    <button onclick="removeItem(${index})" class="btn btn-danger">Remove</button>
    </td>
    </tr>
    `
    );
    tableListing.innerHTML=list
};
viewCarListing();

function addOne(id:number):void{
  viewCartAll[id].quantity++;
  viewCartAll[id].totalprice=viewCartAll[id].totalprice+viewCartAll[id].price;
  localStorage.setItem("cart",JSON.stringify(viewCartAll));
  viewCarListing();
  total();
}

function removeOne(id:number):void{
  if(viewCartAll[id].quantity<=1){
    const deleted:ViewCart[] = viewCartAll.filter((element,index)=>index!=id);
    localStorage.setItem("cart",JSON.stringify(deleted));
    location.reload();
}else{
    viewCartAll[id].quantity--;
    viewCartAll[id].totalprice=viewCartAll[id].totalprice-viewCartAll[id].price;
    localStorage.setItem("cart",JSON.stringify(viewCartAll));
    viewCarListing();
    total();
}}

if(viewCartAll.length===0){
  alert(`Cart is empty`);
  
  setTimeout(()=>{
    window.location.href="../homepage.html";
  });
}

function removeItem(id:number):void{
  const deleted = viewCartAll.filter((element,index)=>index!=id);
  localStorage.setItem("cart",JSON.stringify(deleted));
  alert(`Product removed successfully!`);
  location.reload();
}

async function placeAllOrder(){
  const options:object = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(viewCartAll)
  }
  const placeOrder = await fetch(`https://prodmart-backend.onrender.com/api/order`,options);
  if(placeOrder.status===200){
    localStorage.removeItem("cart");
    alert(`Order placed successfully.`);
    location.reload();
  }else{
    alert(`Error while placing order!`);
  }
}