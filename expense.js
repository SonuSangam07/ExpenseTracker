const token = localStorage.getItem('token');
async function expenseDetails(event){
event.preventDefault();

let expenseDetails = {
    amount: document.getElementById("expenseamount").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    userId:1
  };

const token=localStorage.getItem('token')
const data=await axios.post("http://localhost:3000/expense/addexpense", expenseDetails,{headers:{"Authorization": token}})
if(data.status===201){
   
      alert(data.data.message)
addonScreen(data.data.expense);
    }
    else{
        alert(data.data)
       } 
       
}
function addonScreen(expense){
    
    const d=document.getElementById('ul')
    const p=`expense-${expense.id}`
  
    const li= `<li id="${p}" class="expenses"> ${expense.amount}--${expense.description}--${expense.category}
     
     <button onclick = deleteUser('${expense.id}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
      </li>`
d.innerHTML=d.innerHTML + li
   }
   window.addEventListener('DOMContentLoaded',()=>{
    const token=localStorage.getItem('token')
   
    axios.get("http://localhost:3000/expense/getexpense",{headers: {"Authorization": token}} )
    .then(response=>{
        
        response.data.expenses.forEach(expense=>{
            addonScreen(expense)
        })
    })
   })

   function deleteUser(expenseid){
    const token=localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/deleteuser/${expenseid}`,{headers: {"Authorization": token}}).then(()=>{
        removeuserfromScreen(expenseid);
       
    })

   }
   function removeuserfromScreen(expenseid){
const expenseElemid=`expense-${expenseid}`
document.getElementById(expenseElemid).remove();
   }
   async function gopremium(event){
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log('!!!!!!!!!!!',response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
            
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
             
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  event.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}