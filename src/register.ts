const form = document.querySelector("form") as HTMLFormElement;

interface Newuser {
  name: string;
  email: string;
  password: string;
  mobile:Number;
  gender:String;
  otp: number;
  isUser:Boolean;
  state:Boolean;
}

let userGender:string;
const gender =  document.getElementsByName("gender")[0];
gender.addEventListener('change',(event)=>{
  userGender = (event.target as any).value;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fullName = (form[0] as HTMLInputElement).value;
  const userEmail =  (form[1] as HTMLInputElement).value;
  const userPassword = (form[2] as HTMLInputElement).value;
  const mobile = parseInt((form[3] as HTMLInputElement).value);
  if(userPassword.length<8){
    alert(`Password should of 8 characters or greater than that!`);
  }else if(mobile.toString().length===10 && mobile.toString().length < 10){
    alert(`Please enter valid mobile number please!`);
  }else{
  const user: Newuser = {
    name:fullName,
    email:userEmail,
    password:userPassword,
    mobile:mobile,
    gender:userGender,
    otp: 0,
    isUser: false,
    state:false
  }
  const options:object = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  const newUser = await fetch(`https://prodmart-backend.onrender.com/api/user`,options);
  if(newUser.status===200){
    alert(`Email already exists!`);
  }else{
    alert(`Registered successfully!`);
    sessionStorage.setItem("email",(form[1] as HTMLInputElement).value);
    (form[0] as HTMLInputElement).value="";
    (form[1] as HTMLInputElement).value="";
    (form[2] as HTMLInputElement).value="";
    (form[3] as HTMLInputElement).value="";
    window.location.href="./verifyemail.html";
}}
});
