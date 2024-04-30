
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
    if(!((element[index].childNodes[0].innerHTML.includes(document.getElementById("Artista").value))||(element[index].childNodes[1].childNodes[0].childNodes[2].childNodes[1].data.includes(document.getElementById("Artista").value)))){
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
      
    const post = await fetch("http://localhost:3000/modplaylist3", {
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
    cardText.className = "card-text row";
    let minutesd = Math.floor(Math.floor(value.durata / 1000) / 60);
    let secondsd = Math.floor(value.durata / 1000) % 60;
    
    // Add leading zero if seconds is less than 10
    if (secondsd < 10) {
        secondsd = "0" + secondsd;
    }
    cardText.innerHTML = "<div class='col-xxl-6 col-12'><t class='fs-4'>Utente: </t>"+value.email[0]+"</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Tag: </t>"+value.tag +"</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Durata: </t>"+minutesd + ":" + secondsd +"</div>"

    // Create the "Go somewhere" button element
    var add = document.createElement("button");
    add.classList="btn btn-outline-danger btn-sm"
    add.innerHTML = "OPEN";
    add.onclick = function() {
      sessionStorage.setItem("playlist", value.nome);
      window.location.replace("/html/open.html");
    };

      // Create the "Go somewhere" button element
  var del = document.createElement("button");
  del.classList="btn btn-outline-danger btn-sm ms-2"
  del.innerHTML = "RIM";
  del.onclick = async function() {
    await elimina(value.nome)
    container.innerHTML="";
await load()  };

    // Append all elements to the card body
    cardBody.appendChild(cardText);
    cardBody.appendChild(add);
    if(value.email!=user){
      cardBody.appendChild(del);
    }

    // Append card header and body to the card
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);

    // Append the card to the container
    container.appendChild(cardDiv);
    

       
       
      }

      async function elimina(nome){
        const post = await fetch("http://localhost:3000/togliPlaylist", {
          method: 'POST',
      headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token:token, nome:nome}) }).then(res => res.json())
      if(post.res===false){
          if(post.code===400){
            showAlert(post.code+" "+post.status , "danger");
          }else{
            logout()
          }
      
      }else{
        showAlert(post.code+" "+post.status , "success");
      }}
       