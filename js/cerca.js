let token, user;

async function load() {
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token");
  if (user == undefined || token == undefined) {
    await logout();
  }

  const post = await apicall(
    "http://localhost:3000/modplaylist5",
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

function cerca() {
  element = document.getElementById("modplay").childNodes;
  for (let index = 1; index < element.length; index++) {
    if (
      !(
        element[index].childNodes[0].innerHTML.includes(
          document.getElementById("Artista").value
        ) ||
        element[
          index
        ].childNodes[1].childNodes[0].childNodes[2].childNodes[1].data.includes(
          document.getElementById("Artista").value
        )
      )
    ) {
      element[index].style.display = "none";
    } else {
      element[index].style.display = "block";
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

  var add = document.createElement("button");
  add.className = "btn btn-outline-danger btn-sm ms-4";
  add.innerHTML = "OPEN";
  add.onclick = function () {
    sessionStorage.setItem("playlist", value.nome);
    sessionStorage.setItem("email", value.email);
    window.location.replace("/html/openADD.html");
  };

  cardHeader.appendChild(add)

  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardBody);

  container.appendChild(cardDiv);
}
