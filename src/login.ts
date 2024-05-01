const loginForm = document.querySelector("form") as HTMLFormElement;

loginForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const email = (loginForm[0] as HTMLInputElement).value;
    const password = (loginForm[1] as HTMLInputElement).value;
    if (email.includes("admin@gmail.com")) {
      const userInfo = {
        email: email,
        password: password
      }
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      }
      const user = await fetch(`https://prodmart-backend.onrender.com/api/login`, options);
      if(user.status===200){
      alert(`Login succcesfully!`);
      sessionStorage.setItem("admin", "true");
      window.location.href = "../admin/admin.html";
      }else if(user.status===400){
        alert(`Invalid password!`);
      }
    }
    else {
      const userInfo = {
        email: email,
        password: password
      }
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      }
      const user = await fetch(`https://prodmart-backend.onrender.com/api/login`, options);
      if (user.status === 200) {
        const data = await user.json();
        if (data.isUser === true&&data.state===true) {
          alert(`Login successfully!`);
          sessionStorage.setItem("id", data._id);
          window.location.href = "homepage.html";
        } else if(data.isUser===true&&data.state===false) {
          alert(`Contact admin to activate your account!`);
        }else{
          alert(`User not verifed!`);
        }
      } else if (user.status === 404) {
        alert(`User not found!`);
      }
      else if(user.status === 400){
        alert(`Invalid password!`);
      }
    }
  } catch (error) {
    console.log(error);
  }
})
