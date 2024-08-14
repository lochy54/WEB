
let token, user, size, genres;

async function logout(){

    const post = await fetch("http://localhost:3000/logout", {
        method: 'POST',
     headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({token:token}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
    sessionStorage.clear;
    window.location.replace("/html/main.html");
}

async function load() {
    user = sessionStorage.getItem("user");
    token = sessionStorage.getItem("token")
    if(user==null){
        window.location.replace("/html/main.html");
    }
    const get = await fetch("http://localhost:3000/genere").then(res => { sta = res.status; stat= res.statusText; return res.json() });
    genres = get.genres;
    const gen = document.getElementById("gen");
    for (let i = 0; i < genres.length; i++) {
  gen.innerHTML= gen.innerHTML+'<div class="col-6 col-xxl-3"><input class="form-check-input" type="checkbox" value="'+genres[i]+'"id="'+genres[i]+'"/> <label class="form-check-label"> '+genres[i]+'</label></div>';
  }
  size=genres.length;

  const post1 = await fetch("http://localhost:3000/mod", {
        method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({token: token}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });

if(post1.res==false){
    logout();
}else{
  data = post1.res
  document.getElementById("nome").value = data.nome;
  document.getElementById("cognome").value = data.cognome;
  document.getElementById("email").value = data.email;
  document.getElementById("paese").value = data.paese;
  document.getElementById("passv").value = "";
  document.getElementById("passn").value = "";
  for (let j = 0; j < data.generi.length; j++) {
    document.getElementById(data.generi[j]).checked=true;
  }



  for (let j = 0; j < data.artisti.length; j++) {
    addRow(data.artisti[j],"artist2","REM");
  }

  var isoDate = new Date(data.data);
                
  var formattedDate = isoDate.toISOString().split('T')[0];

  document.getElementById("data").value = formattedDate;
}


  }

  function show(){
    document.getElementById("content").classList.replace('d-none','d-flex')
  }

  function unshow(){
    document.getElementById("content").classList.replace('d-flex','d-none')
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
body: JSON.stringify({cercato: cercato}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });

if(post.res===false){
  if(sta===400){
    showAlert(sta+" "+stat , "danger");
  }
  }
  art = post.artist.artists.items
  for (let index = 0; index < art.length; index++) {
    addRow(art[index].name,"artist1","ADD")
  }

}

}

function addRow(value,pos,bnt) {
  var container = document.getElementById(pos);
  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3 col-xxl-11 ms-xxl-4";
    
  var cardHeader = document.createElement("h5");
  cardHeader.className = "card-header";
  cardHeader.textContent = "Nome: "+value;
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

async function modData(){

  var data = {
    token: token,
    nome: document.getElementById("nome").value,
    cognome: document.getElementById("cognome").value,
    data: document.getElementById("data").value,
    paese:  document.getElementById("paese").options[document.getElementById("paese").selectedIndex].value,
    email: document.getElementById("email").value,
    generi: getSelectedGenres(),
    artisti: selectedArtist()
};
const post = await fetch("http://localhost:3000/modData", {
    method: 'PUT',
headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify(data) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });


if(post.res==true){
  showAlert(sta+" "+stat , "success");
  sessionStorage.setItem("user",document.getElementById("email").value)
  }else{
  if(sta===500){
    logout();
  }
  showAlert(sta+" "+stat  , "danger");}
  load()
}

async function modPass(){
  var data = {
    token: token,
    passv: document.getElementById("passv").value,
    passn: document.getElementById("passn").value


};
const post = await fetch("http://localhost:3000/modPass", {
    method: 'PUT',
headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify(data) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });


if(post.res==true){
  showAlert(sta+" "+stat , "success");
  }else{
  if(sta===500){
    logout();
  }
  showAlert(sta+" "+stat  , "danger");}
  load()
}

async function elimina(){
  const post = await fetch("http://localhost:3000/elimina", {
    method: 'DELETE',
 headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify({token:token}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
if(sta===500){
  showAlert(sta+" "+stat  , "danger");}
else{
  logout()
}
}