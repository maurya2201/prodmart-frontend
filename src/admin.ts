function adminLogout():void{
  sessionStorage.removeItem("admin");
  window.location.href="../login.html";
}

interface Userdetails{
  _id:string;
  name:string;
  email:string;
  gender:string;
  mobile:Number;
  isUser:boolean;
  state:boolean;
}

const tableBody = document.querySelector("tbody") as HTMLTableSectionElement;
const getUsers=async()=>{
  const data = await fetch(`https://prodmart-backend.onrender.com/api/user`);
  if(data.status===200){
  const users:Userdetails[] = await data.json();
  let listing:string = ``;
  users.forEach(({_id,name,email,mobile,gender,isUser,state},index)=>
    listing+=`
    <tr>
    <td>${name}</td>
    <td>${email}</td>
    <td>${mobile}</td>
    <td>${gender}</td>
    <td>${isUser?"Yes":"No"}</td>
    <td>
    <span style="display:inline-block">${state?"Active":"Deactive"}</span>
    </td>
    <td>
    <button onclick="changeUserState('${_id}')" type="button" class="btn btn-primary">${state?"Deactivate user":"Activate User"}</button>
    <button onclick="deleteUser('${_id}')" type="button" class="btn btn-danger">Delete</button>
    </td>
    </tr>
    `);
    tableBody.innerHTML=listing;
  } else{
      alert(`Error while fetching data!`);
    }
}
getUsers();

async function deleteUser(id:string):Promise<void>{
  const options = {
    method: 'DELETE',
  }
  await fetch(`https://prodmart-backend.onrender.com/api/user/${id}`,options);
  alert(`User deleted.`);
  getUsers();
}

async function changeUserState(id:string){
  const data = await fetch(`https://prodmart-backend.onrender.com/api/user/${id}`);
  const user = await data.json();
  if(user.state===true){
    const userState = {
      state:false
    }
    const options:object = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userState)
    }
    const data = await fetch(`https://prodmart-backend.onrender.com/api/updatestate/${id}`,options);
    if(data.status===200){
      alert(`User deactivated successfully!`);
      getUsers();
    }
  }else if(user.state===false){
    const userState = {
      state:true
    }
    const options:object = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userState)
    }
    const data = await fetch(`https://prodmart-backend.onrender.com/api/updatestate/${id}`,options);
    if(data.status===200){
      alert(`User activated successfully!`);
      getUsers();
    }
  }
}