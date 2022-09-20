async function expenseDetails(event){
event.preventDefault();

let expenseDetails = {
    amount: document.getElementById("expenseamount").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    userId:1
  };
console.log(expenseDetails);
const token=localStorage.getItem('token')
const data=await axios.post("http://localhost:3000/expense/addexpense", expenseDetails,{headers:{"Authorization": token}})
if(data.status===201){
    console.log(data.data);
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
    console.log(token)
    axios.get("http://localhost:3000/expense/getexpense",{headers: {"Authorization": token}} )
    .then(response=>{
        console.log(response)
        response.data.expenses.forEach(expense=>{
            addonScreen(expense)
        })
    })
   })

   function deleteUser(expenseid){
    const token=localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/deleteuser/${expenseid}`,{headers: {"Authorization": token}}).then(()=>{
        removeuserfromScreen(expenseid);
        console.log('done')
    })

   }
   function removeuserfromScreen(expenseid){
const expenseElemid=`expense-${expenseid}`
document.getElementById(expenseElemid).remove();
   }