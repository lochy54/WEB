let token, user, duration

async function load() {
  duration = 0;
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token");
  if (user == undefined || token == undefined) {
    await logout()
  }
}


async function cerca() {
  document.getElementById("artist1").innerHTML = "";
  var data = { cercato: document.getElementById("Artista").value,
               token: token }
  if (data.cercato!=""){
  const post = await apicall("http://localhost:3000/cerca", data , "POST", false)
    if (post.sta == 401) {
        await logout();
    } else {
      var item = post.data.tracks.items;
      for (let index = 0; index < item.length; index++) {
        addRow(item[index], "artist1", "ADD");
      }
    }}
  }


function addRow(value, place, bnt) {

  var container = document.getElementById(place);
  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3 p-3";

var cardHeader = document.createElement("h5");
cardHeader.className = "card-header bg-transparent border-0 p-0 mb-2";
cardHeader.textContent = value.name;

  var cardBody = document.createElement("div");
  cardBody.className = "card-body p-0";

  var cardText = document.createElement("div");
  cardText.className = "row g-2 align-items-center";

  let minutesd = Math.floor(Math.floor(value.duration_ms/ 1000) / 60);
  let secondsd = Math.floor(value.duration_ms/ 1000) % 60;

  if (secondsd < 10) {
    secondsd = "0" + secondsd;
  }

  cardText.className = "card-text row";
  cardText.innerHTML =
  "<div class='col-12 col-lg-4'><span class='fw-bold'>Album: </span>" +
  value.album.name +
 "</div> <div class='col-12 col-lg-3'><span class='fw-bold'>Date: </span>" +
  value.album.release_date +
 "</div> <div class='col-12 col-lg-3'><span class='fw-bold'>Artista: </span>" +
  value.artists[0].name +
  "</div> <div class='col-12 col-lg-2'><span class='fw-bold'>Durata: </span>" +
  minutesd +
  ":" +
  secondsd +
  "</div>";

    cardBody.appendChild(cardText);


  var add = document.createElement("div");
  add.className = "hidden";
  add.value = value.id;



  cardDiv.onclick = function () {
    if (bnt == "REM") {
      duration = duration - value.duration_ms;
      container.removeChild(cardDiv);
    } else {
      addRow(value, "artist2", "REM");
      duration = duration + value.duration_ms;
    }

    var minutesd = Math.floor(Math.floor(duration / 1000) / 60);
    var secondsd = Math.floor(duration / 1000) % 60;

    if (secondsd < 10) {
      secondsd = "0" + secondsd;
    }

    document.getElementById("duration").innerHTML = minutesd + ":" + secondsd;
  };

  cardText.appendChild(add)
  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardBody);

  container.appendChild(cardDiv);
}

async function save() {
  var table = document.getElementById("artist2");
  var tbody = table.getElementsByTagName("div");
  var artistArray = [];
  for (var i = 0; i < tbody.length; i =i+8) {
    artistArray.push(tbody[i].childNodes[1].childNodes[0].childNodes[7].value);
  }
  var nome = document.getElementById("nome").value;
  var tag = document.getElementById("tag").value.split(",");
  var desc = document.getElementById("dsc").value;
  var stat = document.getElementById("status").checked;

  var data = {
    nome: nome,
    tag: tag,
    descrizione: desc,
    canzoni: artistArray,
    public: stat,
    durata: duration,
    token: token,
  };

  const post = await apicall("http://localhost:3000/salva",data,"PUT",true)
  if (post.sta == 401) {
      logout();
  }
}
