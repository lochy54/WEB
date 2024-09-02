let token, user, duration, sta, stat;

async function load() {
  duration = 0;
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token");
  if (user == null) {
    await logout()
  }
}


async function logout() {
  await fetch("http://localhost:3000/logout", {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({ token: token }),
})
sessionStorage.clear;
window.location.replace("/html/main.html");
}


function show() {
  document.getElementById("content1").classList.replace("d-none", "d-flex");
}

function unshow() {
  document.getElementById("content1").classList.replace("d-flex", "d-none");
}

async function cerca() {
  var cercato = document.getElementById("Artista").value;
  document.getElementById("artist1").innerHTML = "";

  if (cercato != "") {
      var post = await fetch("http://localhost:3000/cerca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ cercato: cercato, token: token }),
    }).then((res) => {
      return res.json();
    });
    if (post.res == false) {
        logout();
    } else {
      item = post.tracks.tracks.items;
      for (let index = 0; index < item.length; index++) {
        addRow(item[index], "artist1", "ADD");
      }
    }
  }
}

function showAlert(message, alertType) {
  document.getElementById("strong").innerHTML = message;
  document.getElementById("myAlert").className =
    "alert mt-3 text-center alert-" + alertType;
  document.getElementById("myAlert").style.display = "block";
}

function closeAlert() {
  document.getElementById("myAlert").style.display = "none";
}

function addRow(value, place, bnt) {
  var container = document.getElementById(place);
  var cardDiv = document.createElement("div");
  cardDiv.className = "card mb-3 col-xxl-11 ms-xxl-4";

  var cardHeader = document.createElement("h5");
  cardHeader.className = "card-header";
  cardHeader.textContent = "Nome: " + value.name;
  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var cardText = document.createElement("p");

  var minutes = Math.floor(Math.floor(value.duration_ms / 1000) / 60);
  var seconds = Math.floor(value.duration_ms / 1000) % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  var duration_formatted = minutes + ":" + seconds;

  cardText.className = "card-text row";
  cardText.innerHTML =
    "<div class='col-xxl-6 col-12'><t class='fs-4'>Album: </t>" +
    value.album.name +
    "</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Date: </t>" +
    value.album.release_date +
    "</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Artista: </t>" +
    value.artists[0].name +
    "</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Durata: </t>" +
    duration_formatted +
    "</div> ";

  var add = document.createElement("button");
  add.classList = "btn btn-outline-danger btn-sm";
  add.innerHTML = bnt;
  add.value = value.id;
  add.onclick = function () {
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

  cardBody.appendChild(cardText);
  cardBody.appendChild(add);

  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardBody);

  container.appendChild(cardDiv);
}

async function save() {
  var table = document.getElementById("artist2");
  var tbody = table.getElementsByTagName("div");
  var artistArray = [];

  for (var i = 1; i < tbody.length; i = i + 6) {
    artistArray.push(tbody[i].childNodes[1].value);
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
  console.log(data);
  var post = await fetch("http://localhost:3000/salva", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    sta = res.status;
    stat = res.statusText;
    return res.json();
  });

  if (post.res == false) {
    if (sta == 400) {
      showAlert(sta + " " + stat, "danger");
    } else {
      logout();
    }
  } else {
    showAlert(sta + " " + stat, "success");
  }
}
