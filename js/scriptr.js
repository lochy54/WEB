let genres,size;

async function load() {
    const get = await fetch("http://localhost:3000/genere").then(res => res.json());
    genres = get.genres;
    const gen = document.getElementById("gen");
    for (let i = 0; i < genres.length; i++) {
  gen.innerHTML= gen.innerHTML+'<div class="col-6 col-xxl-3"><input class="form-check-input" type="checkbox" value="'+genres[i]+'"id="'+i+'"/> <label class="form-check-label"> '+genres[i]+'</label></div>';
  }
  size=genres.length;
}

  function show(){
    document.getElementById("content").classList.replace('d-none','d-flex')
  }

  function unshow(){
    document.getElementById("content").classList.replace('d-flex','d-none')
  }

  async function register(){
    var data = {
        nome: document.getElementById("nome").value,
        cognome: document.getElementById("cognome").value,
        data: document.getElementById("data").value,
        paese:  document.getElementById("paese").options[document.getElementById("paese").selectedIndex].value,
        email: document.getElementById("email").value,
        password: document.getElementById("pass").value,
        generi: getSelectedGenres(),
        artisti: selectedArtist()
    };
    const post = await fetch("http://localhost:3000/register", {
        method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(data) }).then(res => res.json());

    if(post.res==true){
    showAlert(post.code+" "+post.status , "success");
    }else{
    showAlert(post.code+" "+post.status  , "danger");}
  }


  function getSelectedGenres() {
    var selectedGenres = [];
    var checkboxes = document.querySelectorAll('.form-check-input');
    
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedGenres.push(checkbox.value);
        }
    });
    
    return selectedGenres;
}


function showAlert(message, alertType) {
  document.getElementById("strong").innerHTML = message;
  document.getElementById("myAlert").className = "alert mt-3 text-center alert-" + alertType;
  document.getElementById("myAlert").style.display = "block";
}


function closeAlert() {
  document.getElementById("myAlert").style.display = "none";
}



async function addArtist(){
  var cercato = document.getElementById("Artista").value;
  document.getElementById("artist1").innerHTML="";

if(cercato!=""){

const post = await fetch("http://localhost:3000/artisti", {
    method: 'POST',
headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify({cercato: cercato}) }).then(res => res.json());

if(post.res===false){
  if(post.code===400){
    showAlert(post.code+" "+post.status , "danger");
  }
  }
  art = post.artist.artists.items
  for (let index = 0; index < art.length; index++) {
    console.log(art[index].name)
    addRow(art[index],"artist1","ADD")
  }

}

}

function addRow(value,pos,bnt) {
  var container = document.getElementById(pos);
  // Create the outer div element for the card
  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3 col-xxl-11 ms-xxl-4";
    
  // Create the card header element
  var cardHeader = document.createElement("h5");
  cardHeader.className = "card-header";
  cardHeader.textContent = "Nome: "+value.name;
 // Create the card body element
 var cardBody = document.createElement("div");
 cardBody.className = "card-body";


  var add = document.createElement("button");
  add.innerHTML=bnt
  add.classList="btn btn-outline-danger btn-sm"
  add.onclick = function() {
    if(bnt=="REM"){
    container.removeChild(cardDiv)
    }else{
      container.removeChild(cardDiv)
      addRow(value,"artist2","REM")
    }
   }
  cardBody.appendChild(add)
  cardDiv.appendChild(cardHeader)
  cardDiv.appendChild(cardBody)
  container.appendChild(cardDiv)
}

function selectedArtist() {
  var table = document.getElementById("artist2");
  var tbody = table.getElementsByTagName('div');
  var artistArray = [];

  for (var i = 0; i < tbody.length; i=i+2) {
    artistArray.push(tbody[i].childNodes[0].innerHTML.split(":")[1])  
  }

  return artistArray;
}