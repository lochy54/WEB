
let token, user;

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


async function load() {
    user = sessionStorage.getItem("user");
    token = sessionStorage.getItem("token")
    if(user==null){
        window.location.replace("/html/main.html");
    }}

    function show(){
        document.getElementById("content1").classList.replace('d-none','d-flex')
      }
    
      function unshow(){
        document.getElementById("content1").classList.replace('d-flex','d-none')
      }
    

      async function cerca(){
        var cercato = document.getElementById("Artista").value;
        document.getElementById("artist1").innerHTML="";
      
      if(cercato!=""){
      
      const post = await fetch("http://localhost:3000/cerca", {
          method: 'POST',
      headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({cercato: cercato, token:token}) }).then(res => res.json());
      
      if(post.res===false){
        if(post.code===400){
          showAlert(post.code+" "+post.status , "danger");
        }else{
          logout()
        }
        }else{
           item = post.tracks.tracks.items
        for (let index = 0; index < item.length; index++) {
            addRow(item[index],"artist1","ADD")
          
        }
      
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


function addRow(value,place,bnt) {
  // Get the container element where you want to append the new row
var container = document.getElementById(place);
// Create the outer div element for the card
var cardDiv = document.createElement("div");
cardDiv.className = "card mb-3 col-xxl-11 ms-xxl-4";

// Create the card header element
var cardHeader = document.createElement("h5");
cardHeader.className = "card-header";
cardHeader.textContent = "Artista: "+value.artists[0].name;
// Create the card body element
var cardBody = document.createElement("div");
cardBody.className = "card-body";


// Create the card text element
var cardText = document.createElement("p");
cardText.className = "card-text";
cardText.textContent = "Album : "+value.album.name;

// Create the card text element
var cardText1 = document.createElement("p");
cardText1.className = "card-text";
cardText1.textContent = "Nome : "+value.name;

// Create the "Go somewhere" button element
var add = document.createElement("button");
add.classList="btn btn-outline-danger btn-sm"
add.innerHTML = bnt;
add.value= value.id;
add.onclick = function() {
if(bnt=="REM"){
container.removeChild(cardDiv)
console.log("di")
}else{
addRow(value,"artist2","REM")
}
};

// Append all elements to the card body
cardBody.appendChild(cardText);
cardBody.appendChild(cardText1);
cardBody.appendChild(add)

// Append card header and body to the card
cardDiv.appendChild(cardHeader);
cardDiv.appendChild(cardBody);

// Append the card to the container
container.appendChild(cardDiv);




}

async function save(){
    
  var table = document.getElementById("artist2");
  var tbody = table.getElementsByTagName('div');
  var artistArray = [];

  for (var i = 0; i < tbody.length; i=i+2) {
    artistArray.push(tbody[i].childNodes[1].children[2].value)  
  }
  var nome = document.getElementById("nome").value;
  var tag = document.getElementById("tag").value.split(",");
  var desc = document.getElementById("dsc").value;
  var stat = document.getElementById("status").checked;

  var data = { nome: nome , tag : tag  , descrizione : desc , canzoni : artistArray,public : stat, token: token} ;

  const post = await fetch("http://localhost:3000/salva", {
    method: 'POST',
headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify(data) }).then(res => res.json());

if(post.res===false){
  if(post.code===400){
    showAlert(post.code+" "+post.status , "danger");
  }else{
    logout()
  }
  }else{
    showAlert(post.code+" "+post.status , "success");

  }

 
}