function resetPassword(event) {
    event.preventDefault()
    console.log(event.target)
  
  const form = new FormData(event.target);

  const userDetails = {
      email: form.get("email"),

  }
  console.log(userDetails)}