const forgotPasswordForm = document.querySelector("form") as HTMLFormElement;
const submitEmail = document.getElementById("email") as HTMLButtonElement;
const submitOtp = document.getElementById("otp") as HTMLButtonElement;
const submitPassword = document.getElementById("password") as HTMLButtonElement;
(forgotPasswordForm[0] as HTMLInputElement).setAttribute("type","email");

submitEmail.addEventListener("click",async(event)=>{
  event.preventDefault();
  const email = (forgotPasswordForm[0] as HTMLInputElement).value;
  const userEmail = {
    email:email
  }
  const options:object = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userEmail)
  }
  const sentEmail = await fetch(`https://prodmart-backend.onrender.com/api/forgotpassword`,options);
  if(sentEmail.status===200){
    alert(`Otp sent to your email!`);
    (forgotPasswordForm[0] as HTMLInputElement).value = "";
    (forgotPasswordForm[0] as HTMLInputElement).setAttribute("type","number");
    submitEmail.style.display="none";
    submitOtp.style.display="block";
  }else if(sentEmail.status===404){
    alert(`Email not found!.`);
  }else if(sentEmail.status===400){
    alert(`User not verified!`);
    window.location.href="../login.html";
  }
});
submitOtp.addEventListener("click",async(event)=>{
  const otp = (forgotPasswordForm[0] as HTMLInputElement).value;
  const userOtp = {
    otp:parseInt(otp)
  }
  const options:object = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userOtp)
  }
  const verifyUser = await fetch(`https://prodmart-backend.onrender.com/api/verifyuser/`,options);
  if(verifyUser.status===200){
    alert(`Enter your password again!`);
    const data = await verifyUser.json();
    sessionStorage.setItem("fpid",data);
    (forgotPasswordForm[0] as HTMLInputElement).value = "";
    (forgotPasswordForm[0] as HTMLInputElement).setAttribute("type","password");
    submitOtp.style.display="none";
    submitPassword.style.display="block";
  }else if(verifyUser.status===404){
    alert(`Invalid otp!`);
  }
});

submitPassword.addEventListener("click",async(event)=>{
  event.preventDefault();
  const password = (forgotPasswordForm[0] as HTMLInputElement).value;
  const userPassword = {
    password:password
  }
  const id = sessionStorage.getItem("fpid");
  const options:object = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userPassword)
  }
  const update = await fetch(`https://prodmart-backend.onrender.com/api/updatepassword/${id}`,options);
  if(update.status===200){
    alert(`Password changed successfully!`);
    sessionStorage.removeItem("fpid");
    window.location.href="../login.html";
  }else{
    alert(`Error while updating password!`);
}});