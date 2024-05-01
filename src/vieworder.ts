const id = sessionStorage.getItem("id");

interface Order{
  title:string;
  thumbnail:string;
  totalprice:number;
  quantity:number;
}

const viewOrder=async()=>{
  const response = await fetch(`https://prodmart-backend.onrender.com/api/vieworder/${id}`);
  if(response.status===200){
    const data:Order[] = await response.json();
    let order = ``;
    data.forEach(({title,thumbnail,totalprice,quantity})=>
      order+=`
    <div class="col-3">
      <div class="card" style="width: 18rem;">
  <img height="100px" width="200px" src="${thumbnail}" class="card-img-top" alt="${title}">
  <div class="card-body">
    <h6 class="card-title">Name: ${title}</h6>
    <h6 class="card-title">Price: $${totalprice}</h6>
    <h6 class="card-title">Quantity: ${quantity}</h6>
  </div>
</div>
</div>`);
    (document.querySelector(".row") as HTMLDivElement).innerHTML=order;
  }else if(response.status===404){
    alert(`Orders not found!`);
    window.location.href="../homepage.html";
  }
  else{
    alert(`Error while fetching data!`);
  }
}
viewOrder();