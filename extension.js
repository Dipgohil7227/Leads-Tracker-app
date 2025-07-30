// // chrome://extensions/
// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// const firebaseConfig = {
//     databaseURL: process.env.DATABASE_URL
// }
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app)

// let myLeads = []
// const inputEl = document.getElementById("input-el")
// const inputBtn = document.getElementById("input-btn")
// const ulEl = document.getElementById("ul-el")
// const savetab = document.getElementById("tab-btn")
// const deleteBtn = document.getElementById("delete-btn")

// let getFromLocaleStorage = JSON.parse(localStorage.getItem("myLeads"))
// console.log(getFromLocaleStorage)

// if(getFromLocaleStorage){
//     myLeads = getFromLocaleStorage
//     render(myLeads)
// }
//     savetab.addEventListener("click",function(){

//         chrome.tabs.query({active: true, currentWindow: true},function(tabs){
//             var tab = tabs[0]
//             myLeads.push(tab.url)

//         localStorage.setItem("myLeads",JSON.stringify(myLeads))
//         render(myLeads)
//         })
        
//     })
// function render(leads) {
//     let listItems = ""
//     for (let i = 0; i < leads.length; i++) {
//         listItems += `
//             <li>
//                 <a target='_blank' href='${leads[i]}'>
//                     ${leads[i]}
//                 </a>
//             </li>
//         `
//     }
//     ulEl.innerHTML = listItems  
// }


// deleteBtn.addEventListener("dblclick",function(){
//     console.log("double clicked!")
//     localStorage.clear()
//     myLeads = []
//     render(myLeads)
// })

// inputBtn.addEventListener("click", function() {
//     myLeads.push(inputEl.value)
//     inputEl.value = ""
//     localStorage.setItem("myLeads" , JSON.stringify(myLeads))
//     render(myLeads)
// })

//new code for firebase


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase ,ref , push , onValue, remove} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-631e7-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


onValue(referenceInDB ,function(snapshot){
    const snapshotExist = snapshot.exists()
    // let snapshotval = true
    if(snapshotExist){
        const snapshotValues = snapshot.val()

    const leadsval = Object.values(snapshotValues)
    console.log(leadsval)
    render(leadsval)
    }
    
})

    
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}


deleteBtn.addEventListener("dblclick",function(){
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB ,  inputEl.value)
    inputEl.value = ""

})