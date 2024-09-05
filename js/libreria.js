
let token, user;



function cerca() {
  var element = document.getElementById("modplay").childNodes;
  for (let index = 1; index < element.length; index++) {
    if (!((element[index].childNodes[0].innerHTML.includes(document.getElementById("Artista").value)) || (element[index].childNodes[1].childNodes[0].childNodes[2].childNodes[1].data.includes(document.getElementById("Artista").value)))) {
      element[index].style.display = "none"
    } else {
      element[index].style.display = "block"

    }

  }
}

async function load() {
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token")
  if (user == null) {
    logout()
  }
  const post = await apicall("http://localhost:3000/modplaylist3", {token: token },"POST",true)

  if (post.sta == 401) {
      logout()
  } else {
    for (let index = 0; index < post.data.length; index++) {
      addRow(post.data[index]);
    }
  }
}


function addRow(value) {
  var container = document.getElementById("modplay");

  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3 p-3";

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
    "<div class='col-12 col-md-4'><span class='fw-bold'>Utente: </span>" +
    value.email[0] +
    "</div> <div class='col-12 col-md-4'><span class='fw-bold'>Tag: </span>" +
    value.tag +
    "</div> <div class='col-12 col-md-4'><span class='fw-bold'>Durata: </span>" +
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
if(value.email!=user){
  container.classList.add(["row","g-0"])
  cardDiv.classList.add("col-9")
  var del = document.createElement("button");
  del.classList = "btn btn-outline-danger btn-sm col-2"
  del.innerHTML = "REM";
  del.onclick = async function () {
    await elimina(value.nome)
    container.innerHTML = "";
    await load()
  };

  container.appendChild(del)
}
}


async function elimina(nome) {
  const post = await fetch("http://localhost:3000/togliPlaylist", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: token, nome: nome })
  }).then(res => { sta = res.status; stat = res.statusText; return res.json() });
  if (post.res === false) {
    if (sta === 400) {
      showAlert(sta + " " + stat, "danger");
    } else {
      logout()
    }

  } else {
    showAlert(sta + " " + stat, "success");
  }
}
