
let token, user;
//BISOGNA CAMBIARE IL MODPLAY PERCHE SENNO PUNTA SEMPRE AL PRIMO ELAMIL DEVO FARE UN MODPLA3 COSI CHATGPT
async function logout(){

    const post = await fetch("http://localhost:3000/logout", {
        method: 'POST',
     headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({token:token}) }).then(res => res.json());
    sessionStorage.clear;
    window.location.replace("/html/main.html");
}

function cerca(){
  element = document.getElementById("modplay").childNodes;
  for (let index = 1; index < element.length; index++) {
    if(!((element[index].childNodes[0].innerHTML.includes(document.getElementById("Artista").value))||(element[index].childNodes[1].childNodes[0].innerHTML.split(": ")[1].includes(document.getElementById("Artista").value)))){
      element[index].style.display="none"
    }else{
      element[index].style.display="block"

    }
 
}
}
async function load() {
    user = sessionStorage.getItem("user");
    token = sessionStorage.getItem("token")
    if(user==null){
        window.location.replace("/html/main.html");
    }
      
    const post = await fetch("http://localhost:3000/cercacanzone", {
        method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token:token}) }).then(res => res.json())
    if(post.res===false){
        if(post.code===400){
          showAlert(post.code+" "+post.status , "danger");
        }else{
          logout()
        }
        }else{
           for (let index = 0; index < post.res.length; index++) {
            addRow(post.res[index]);
            
           }
        }
}



      function showAlert(message, alertType) {
        document.getElementById("strong").innerHTML = message;
        document.getElementById("myAlert").className = "alert mt-3 text-center alert-" + alertType;
        document.getElementById("myAlert").style.display = "block";
      }
      
      
      function closeAlert() {
        document.getElementById("myAlert").style.display = "none";
      }
      

      function addRow(value) {
         // Get the container element where you want to append the new row
    var container = document.getElementById("modplay");
    // Create the outer div element for the card
    var cardDiv = document.createElement("div");
    cardDiv.className = "card mb-3 col-xxl-11 ms-xxl-4";
      
    // Create the card header element
    var cardHeader = document.createElement("h5");
    cardHeader.className = "card-header";
    cardHeader.textContent = value.nome;

    // Create the card body element
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

   
    // Create the card text element
    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = "Tag: "+value.tag;

    
    // Create the card text element
    var cardText1 = document.createElement("p");
    cardText1.className = "card-text";
    cardText1.textContent = "Utente: "+value.email;

    // Create the "Go somewhere" button element
    var add = document.createElement("button");
    add.classList="btn btn-outline-danger btn-sm"
    add.innerHTML = "OPEN";
    add.onclick = function() {
      sessionStorage.setItem("playlist", value.nome);
      sessionStorage.setItem("email", value.email);
      window.location.replace("/html/openADD.html");
    };

    // Append all elements to the card body
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardText1);

    cardBody.appendChild(add);

    // Append card header and body to the card
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);

    // Append the card to the container
    container.appendChild(cardDiv);
    

       
       
      }
       