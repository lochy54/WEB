
let token, user;

async function load() {
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token");
  if (user == undefined || token == undefined) {
    await logout();
  }

  const post = await apicall(
    "http://localhost:3000/modplaylist1",
    { token: token },
    "POST",
    false
  );
  if (post.sta == 401) {
    await logout();
  } else {
    for (let index = 0; index < post.data.length; index++) {
      addRow(post.data[index]);
    }
  }
}



     

function addRow(value) {
  var container = document.getElementById("modplay");

  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3 p-3 col-9";

  var cardHeader = document.createElement("h5");
  cardHeader.className = "card-header bg-transparent border-0 p-0 mb-2";
  cardHeader.textContent = value.nome;

  var cardBody = document.createElement("div");
  cardBody.className = "card-body p-0";

  var cardText = document.createElement("div");
  cardText.className = "row g-2 align-items-center";

  let minutesd = Math.floor(Math.floor(value.durata / 1000) / 60);
  let secondsd = Math.floor(value.durata / 1000) % 60;

  if (secondsd < 10) {
    secondsd = "0" + secondsd;
  }

  cardText.innerHTML =
    "<div class='col-12 col-lg-5'><span class='fw-bold'>Utente: </span>" +
    value.email[0] +
    "</div> <div class='col-12 col-lg-3'><span class='fw-bold'>Tag: </span>" +
    value.tag +
    "</div> <div class='col-12 col-lg-4'><span class='fw-bold'>Durata: </span>" +
    minutesd +
    ":" +
    secondsd +
    "</div>";

  cardBody.appendChild(cardText);


  cardDiv.onclick = function () {
    sessionStorage.setItem("playlist", value.nome);
    window.location.replace("/html/open.html");
  };


  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardBody);

  container.appendChild(cardDiv);


  var btdiv = document.createElement("div")
  btdiv.classList="col-2 row g-0"

  var del = document.createElement("button");
  del.classList = "btn btn-outline-danger btn-lg col-12 mb-3 bi bi-trash"
  del.onclick = async function () {
    await elimina(value.nome,value.email[0])
    container.innerHTML = "";
    await load()
  };

  var mod = document.createElement("button");
  mod.classList = "btn btn-outline-light btn-lg col-12 mb-3 bi bi-caret-right-square-fill"
  mod.onclick = ()=>{ 
    sessionStorage.setItem("playlist",JSON.stringify(value))
    window.location.replace("/html/mod2.html");}

  btdiv.appendChild(del)
  btdiv.appendChild(mod)


  container.appendChild(btdiv)

}


function cerca() {
  let element = document.getElementById("modplay").childNodes;
  let serch = document.getElementById("Artista").value
  for (let index = 1; index < element.length; index=index+2) {


    if (element[index].childNodes[0].innerHTML.includes(serch)||
    element[index].childNodes[1].childNodes[0].childNodes[0].childNodes[1].data.includes(serch)||
    element[index].childNodes[1].childNodes[0].childNodes[2].childNodes[1].data.includes(serch)
  ) {
      element[index].style.display = "block"
      element[index+1].style.position = "relative"
      element[index+1].childNodes[0].style.display = "block"
      element[index+1].childNodes[1].style.display = "block"


    } else {
      element[index].style.display = "none"
      element[index+1].style.position = "absolute"
      element[index+1].childNodes[0].style.display = "none"
      element[index+1].childNodes[1].style.display = "none"

    }

  }
}

async function elimina(nome) {
  var data = {token:token, nome:nome }
  const post = await apicall("http://localhost:3000/eliminaPlaylist",data,"DELETE",true)

  if (post.sta == 401) {
    logout()
}
}

