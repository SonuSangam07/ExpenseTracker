async function createUser(event) {
    try{
    event.preventDefault()

    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let userDetails = {
        name : name,
        email:email,
        password:password
    }
const response=await axios.post('http://localhost:3000/users/signup',userDetails)

   if(response.status == 201) {
    console.log('done');
    window.location.href='./login.html'
   } else {
    throw new Error ('Failed to Login')
   }
}
catch(err){
console.log(err);
}
}
