async function login(event) {
    try{
    event.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
let logindetails = {
    email : email,
    password: password
}
console.log(logindetails);
const data=await axios.post('http://localhost:3000/users/login',logindetails)

   if(data.status==200){
    alert(data.data.message)
   }
   else{
    alert(data.data.message)
   } 
}
   catch(err){
    document.body.innerHTML+=`<div style="color:red;">${err.message}</div>:`
alert(err);
   }
}

