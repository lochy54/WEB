
let token, user
let genres
var generi = []
var artisti = []



async function load() {

  const get = await apicall("http://localhost:3000/genere",null,"GET",false)
  genres = get.data.genres;
  const gen = document.getElementById("gen");
  for (let i = 0; i < genres.length; i++) {
    gen.innerHTML = gen.innerHTML+'<div class="col-6 col-md-3"><input class="form-check-input" id="'+genres[i]+'" type="checkbox" onchange="generiPushPop(value)" value="'+genres[i]+'"id="'+i+' "/> <label class="form-check-label"> '+genres[i]+'</label></div>';
}

user = sessionStorage.getItem("user");
token = sessionStorage.getItem("token");
if (user == undefined || token == undefined) {
  await logout()
}



  const post = await apicall("http://localhost:3000/mod",{token: token},"POST",false)
  if (post.sta == 401) {
    await logout();
  } else {
  data = post.data
  document.getElementById("nome").value = data.nome;
  document.getElementById("cognome").value = data.cognome;
  document.getElementById("email").value = data.email;
  document.getElementById("paese").value = data.paese;
  document.getElementById("passv").value = "";
  document.getElementById("passn").value = "";
  for (let j = 0; j < data.generi.length; j++) {
    document.getElementById(data.generi[j]).checked=true;
    generi.push(data.generi[j])
  }
  for (let j = 0; j < data.artisti.length; j++) {
    addRow(data.artisti[j],"artist2","REM");
    artisti.push(data.artisti[j])
  }

  var isoDate = new Date(data.data);
                
  var formattedDate = isoDate.toISOString().split('T')[0];

  document.getElementById("data").value = formattedDate;
}

}

function generiPushPop(value){
  if(generi.includes(value)){
    generi = generi.filter((e)=>e!=value)
  }else{
    generi.push(value)
  }
}







async function addArtist() {
  var cercato = document.getElementById("Artista").value;
  let cercatotrim = cercato.trim()
  document.getElementById("artist1").innerHTML = "";
  if (cercatotrim!=""){
  const post = await apicall("http://localhost:3000/artisti", {cercato: cercato} , "POST", false)
      document.getElementById("artist1").innerHTML = "";
      art = post.data.artists.items
      for (let index = 0; index < art.length; index++) {
        addRow(art[index].name,"artist1","ADD")
      }
    }
  }

function addRow(value, place, bnt) {

  var container = document.getElementById(place);
  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3";

var cardHeader = document.createElement("h5");
cardHeader.className = "card-header bg-transparent border-0";
cardHeader.textContent = value;


  cardDiv.onclick = function () {
    if (bnt == "REM") {
      container.removeChild(cardDiv);
      artisti = artisti.filter((e)=>e!=value)
    } else {
      if(!artisti.includes(value)){artisti.push(value);addRow(value, "artist2", "REM");}
    }
  }
  cardDiv.appendChild(cardHeader);;
  container.appendChild(cardDiv);
}
  




async function modData(){

  var data = {
    token : token,
    nome: document.getElementById("nome").value,
    cognome: document.getElementById("cognome").value,
    data: document.getElementById("data").value,
    paese:  document.getElementById("paese").options[document.getElementById("paese").selectedIndex].value,
    email: document.getElementById("email").value,
    generi: generi,
    artisti: artisti
};
const post = await apicall("http://localhost:3000/modData", data , "PUT", true)
if (post.sta == 401) {
  await logout();
}
}

async function modPass(){
  var data = {
    token: token,
    passv: document.getElementById("passv").value,
    passn: document.getElementById("passn").value
};
const post = await apicall("http://localhost:3000/modPass", data , "PUT", true)
if (post.sta == 401) {
  await logout();
}
}


async function elimina(){
  const post = await apicall("http://localhost:3000/elimina", {token:token} , "DELETE", false)
  if (post.sta == 401) {
    await logout();
  }
  await logout();
}