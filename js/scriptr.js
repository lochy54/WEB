let genres
var generi = []
var artisti = []

async function load() {
    const get = await apicall("http://localhost:3000/genere",null,"GET",false)
    genres = get.data.genres;
    const gen = document.getElementById("gen");
    for (let i = 0; i < genres.length; i++) {
  gen.innerHTML= gen.innerHTML+'<div class="col-6 col-md-3"><input class="form-check-input" type="checkbox" onchange="generiPushPop(value)" value="'+genres[i]+'"id="'+i+' "/> <label class="form-check-label"> '+genres[i]+'</label></div>';
  }
}

function generiPushPop(value){
    if(generi.includes(value)){
      generi = generi.filter((e)=>e!=value)
    }else{
      generi.push(value)
    }
}

  async function register(){
    var data = {
        nome: document.getElementById("nome").value,
        cognome: document.getElementById("cognome").value,
        data: document.getElementById("data").value,
        paese:  document.getElementById("paese").options[document.getElementById("paese").selectedIndex].value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        generi: generi,
        artisti: artisti
    };
    await apicall("http://localhost:3000/register",data, "PUT", true)

  }


async function addArtist() {
  var cercato = document.getElementById("Artista").value;
  let cercatotrim = cercato.trim()
  document.getElementById("artist1").innerHTML = "";
  if (cercatotrim!=""){
  const post = await apicall("http://localhost:3000/artisti", {cercato: cercato} , "POST", false)
      art = post.data.artists.items
      for (let index = 0; index < art.length; index++) {
        addRow(art[index],"artist1","ADD")
      }
    }
  }


function addRow(value, place, bnt) {

  var container = document.getElementById(place);
  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3";

var cardHeader = document.createElement("h5");
cardHeader.className = "card-header bg-transparent border-0";
cardHeader.textContent = value.name;


  cardDiv.onclick = function () {
    if (bnt == "REM") {
      container.removeChild(cardDiv);
      artisti = artisti.filter((e)=>e!=value.name)
    } else {
      if(!artisti.includes(value.name)){artisti.push(value.name);addRow(value, "artist2", "REM");}
    }
  }
  cardDiv.appendChild(cardHeader);;
  container.appendChild(cardDiv);
}

