let genres,size;

async function load() {
    const get = await fetch("http://localhost:3000/genere").then(res => { sta = res.status; stat= res.statusText; return res.json() });
    genres = get.genres;
    const gen = document.getElementById("gen");
    for (let i = 0; i < genres.length; i++) {
  gen.innerHTML= gen.innerHTML+'<div class="col-6 col-lg-3"><input class="form-check-input" type="checkbox" value="'+genres[i]+'"id="'+i+'"/> <label class="form-check-label"> '+genres[i]+'</label></div>';
  }
  size=genres.length;
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
        method: 'PUT',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(data) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });

    if(post.res==true){
    showAlert(sta+" "+stat , "success");
    }else{
    showAlert(sta+" "+stat  , "danger");}
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
    console.log(art[index].name)
    addRow(art[index],"artist1","ADD")
  }

}

}

function addRow(value,pos,bnt) {
  var container = document.getElementById(pos);
  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3 col-lg-11 ms-lg-4";
    
  var cardHeader = document.createElement("h5");
  cardHeader.className = "card-header";
  cardHeader.textContent = "Nome: "+value.name;
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