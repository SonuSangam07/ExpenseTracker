const token = localStorage.getItem('token');
const expensecontainer=document.getElementById("expenses")

async function expenseDetails(event){
event.preventDefault();
const expensecontainer=document.getElementById("expenses")

let expenseDetails = {
    amount: document.getElementById("expenseamount").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    
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
    
    const d=document.getElementById('expenses')
    d.classList.add('expensediv')
    const p=`expense-${expense.id}`
    
    
  
   const li= `<li id="${p}" class="expenses"> ${expense.amount}--${expense.description}--${expense.category}
     
     <button onclick = deleteUser('${expense.id}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
      </li>`
d.innerHTML+=li;
   }

// Refreshing the page
   window.addEventListener('DOMContentLoaded',(e)=>{
    const token=localStorage.getItem('token')
    const pagination=document.getElementById("pagination");
    console.log(pagination)
   pagination.innerHTML=""
   const expensecontainer=document.getElementById("expenses")
   expensecontainer.innerHTML=""
   
    axios.get("http://localhost:3000/expense/getexpense/?page=1",{headers: {"Authorization": token}} )
    .then(expenses=>{
        console.log(expenses.data.user);
       if(expenses.data.user.ispremiumuser===true){
        let pop = document.getElementById("pop");
        let btn = `<a href="./premiumexpense.html"id="popbtn">See Premium Facility</a>`;
        pop.innerHTML += btn;
       }
       const pages=expenses.data.obj
        if(pages.currentpage!=1 && pages.previouspage!=1){
            const newpg=document.createElement("a");
            newpg.setAttribute('id','1')
            newpg.setAttribute("class","page")
            newpg.innerText="1";
            pagination.appendChild(newpg)

        }
        if(pages.haspreviouspage){
            const newpg2=document.createElement("a")
            newpg2.setAttribute("class","page")
            newpg2.setAttribute("id",`${pages.previouspage}`)
            newpg2.innerText=`${pages.previouspage}`
            pagination.appendChild(newpg2);
        }

        const newpg1=document.createElement("a")
        newpg1.setAttribute("id",`${pages.currentpage}`)
        newpg1.setAttribute("class","page")
        newpg1.innerText=`${pages.currentpage}`
        pagination.appendChild(newpg1)

        if(pages.hasnextpage){
            console.log("i am has next page>>>>>>>>>>>>>>>>>>>>>>>")
            const newpg3=document.createElement("a")
            newpg3.setAttribute("class","page")
            newpg3.setAttribute("id",`${pages.nextpage}`)
            newpg3.innerText=`${pages.nextpage}`
            pagination.appendChild(newpg3);
        }
        if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
            const newpg4=document.createElement("a")
            newpg4.setAttribute("class","page")
            newpg4.setAttribute("id",`${pages.lastpage}`)
            newpg4.innerText=`${pages.lastpage}`
            pagination.appendChild(newpg4);
        }

        const pageevent=document.getElementById("pagination")
        pageevent.addEventListener("click",(e)=>{
            const pagenation=document.getElementById("pagination");
            if(e.target.className=="page"){
                const UserId=e.target.id
                pagenation.innerHTML=""
                expensecontainer.innerHTML=""
                axios
            .get(`http://localhost:3000/expense/getexpense/?page=${UserId}`,{headers:{"Authorization":token}})
            .then((expenses)=>{
                console.log(expenses.data.obj)
                const pages=expenses.data.obj
                if(pages.currentpage!=1 && pages.previouspage!=1){
                    const newpg=document.createElement("a");
                    newpg.setAttribute('id','1')
                    newpg.setAttribute("class","page")
                    newpg.innerText="1";
                    pagination.appendChild(newpg)
        
                }
                if(pages.haspreviouspage){
                    const newpg2=document.createElement("a")
                    newpg2.setAttribute("class","page")
                    newpg2.setAttribute("id",`${pages.previouspage}`)
                    newpg2.innerText=`${pages.previouspage}`
                    pagination.appendChild(newpg2);
                }
        
                const newpg1=document.createElement("a")
                newpg1.setAttribute("id",`${pages.currentpage}`)
                newpg1.setAttribute("class","page")
                newpg1.innerText=`${pages.currentpage}`
                pagination.appendChild(newpg1)
        
                if(pages.hasnextpage){
                    const newpg3=document.createElement("a")
                    newpg3.setAttribute("class","page")
                    newpg3.setAttribute("id",`${pages.nextpage}`)
                    newpg3.innerText=`${pages.nextpage}`
                    pagination.appendChild(newpg3);
                }
                if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
                    const newpg4=document.createElement("a")
                    newpg4.setAttribute("class","page")
                    newpg4.setAttribute("id",`${pages.lastpage}`)
                    newpg4.innerText=`${pages.lastpage}`
                    pagination.appendChild(newpg4);
                }
                const UserExpenses=expenses.data.expenses;
                console.log(UserExpenses);
                expenses.data.expenses.forEach(expense=>{
                    addonScreen(expense)
                })
              
        
        
            })
            .catch(err=>console.log(err))
        
  
            }
        
        })

       expenses.data.expenses.forEach(expense=>{
            addonScreen(expense)
       })
    })
   })
//deleting the user
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
function download(){
    axios.get('http://localhost:3000/expense/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
       console.log(err);
    });
}

function signout(){
    window.location.replace('/login.html')
}

