const verifyForm = document.querySelector("form") as HTMLFormElement;

verifyForm.addEventListener("submit",async(event)=>{
  event.preventDefault();
  const verify = {
    otp:(verifyForm[0] as HTMLInputElement).value
  }
  const options:object = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(verify)
  }
  const verifyUser = await fetch(`https://prodmart-backend.onrender.com/api/verifyuser/`,options);
  if(verifyUser.status===200){
    alert(`Email Verified`);
    window.location.href="login.html";
    sessionStorage.removeItem("email");
  }else if(verifyUser.status===404){
    alert(`Invalid otp!!`);
  }
});