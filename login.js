async function login(event) {
    event.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
let logindetails = {
    email : email,
    password: password
}
console.log(logindetails);
   
}