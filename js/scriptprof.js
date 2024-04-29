
let token, user, size, genres;

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
    }
    const post = await fetch("http://localhost:3000/genere").then(res => res.json());
    genres = post.genres;
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
  body: JSON.stringify({token: token}) }).then(res => res.json());

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

  document.getElementById("myTable").getElementsByTagName('tbody')[0].innerHTML="";


  for (let j = 0; j < data.artisti.length; j++) {
    addRow(document.createTextNode(data.artisti[j]));
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

function addArtist(){
  if(document.getElementById('Artista').value==""){
    return false;
  }
  addRow(document.createTextNode(document.getElementById('Artista').value))
  document.getElementById('Artista').value="";

}

function addRow(value) {
  var tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
  var newRow = tableBody.insertRow();
  
  var cell1 = newRow.insertCell(0);
  cell1.appendChild(value);
  
  var cell2 = newRow.insertCell(1);
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Elimina";
  deleteButton.classList="btn btn-outline-danger btn-sm"
  deleteButton.onclick = function() {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  };
  cell2.appendChild(deleteButton);
}

  

function selectedArtist() {
  var table = document.getElementById("myTable");
  var tbody = table.getElementsByTagName('tbody')[0];
  var rows = tbody.getElementsByTagName('tr');
  var artistArray = [];

  for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName('td');
      if (cells.length > 0) {
          var artistName = cells[0].innerText;
          artistArray.push(artistName);
      }
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
    method: 'POST',
headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify(data) }).then(res => res.json());


if(post.res==true){
  showAlert(post.code+" "+post.status , "success");
  sessionStorage.setItem("user",document.getElementById("email").value)
  }else{
  if(post.code===500){
    logout();
  }
  showAlert(post.code+" "+post.status  , "danger");}
  load()
}

async function modPass(){
  var data = {
    token: token,
    passv: document.getElementById("passv").value,
    passn: document.getElementById("passn").value


};
const post = await fetch("http://localhost:3000/modPass", {
    method: 'POST',
headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify(data) }).then(res => res.json());


if(post.res==true){
  showAlert(post.code+" "+post.status , "success");
  }else{
  if(post.code===500){
    logout();
  }
  showAlert(post.code+" "+post.status  , "danger");}
  load()
}

async function elimina(){
  const post = await fetch("http://localhost:3000/elimina", {
    method: 'POST',
 headers: {
'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify({token:token}) }).then(res => res.json());
if(post.code===500){
  showAlert(post.code+" "+post.status  , "danger");}
else{
  logout()
}
}