const userId:string|null = sessionStorage.getItem("id");
const updateProfile = document.querySelector("form") as HTMLFormElement;

fetch(`https://prodmart-backend.onrender.com/api/user/${userId}`)
.then((res)=>res.json())
.then((response)=>{
  (updateProfile[0] as HTMLInputElement).value = response.name;
  (updateProfile[1] as HTMLInputElement).value = response.email;
  (updateProfile[2] as HTMLInputElement).value = response.mobile;
});
interface UpdateDetails{
  name:string;
  email:string;
  mobile:number
}
updateProfile.addEventListener("submit",async(event)=>{
try{
  event.preventDefault();
  const details:UpdateDetails = {
    name:(updateProfile[0] as HTMLInputElement).value,
    email:(updateProfile[1] as HTMLInputElement).value,
    mobile:parseInt((updateProfile[2] as HTMLInputElement).value)
  }
  if(isNaN(details.mobile) || details.mobile.toString().length < 10){
    alert(`Please enter valid mobile number please!`);
  }else{
  const options:object = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details)
  }
  const update = await fetch(`https://prodmart-backend.onrender.com/api/user/${userId}`,options);
  if(update.status===200){
    alert(`Profile updated!`);
    window.location.href="../homepage.html";
  }else{
    alert(`Error will updating data.`);
  }
}}catch(error){
  console.log(error);
}});