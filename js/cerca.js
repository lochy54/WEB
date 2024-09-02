let token, user;


async function load() {
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token");
  if (user == null) {
    await logout()
  }

  var post = await fetch("http://localhost:3000/modplaylist5", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  }).then((res) => {
    return res.json();
  });
  if (post.res == false) {
      logout();
  } else {
    for (let index = 0; index < post.res.length; index++) {
      addRow(post.res[index]);
    }
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
  cardDiv.className = "card mb-3 col-xxl-11 ms-xxl-4";

  var cardHeader = document.createElement("h5");
  cardHeader.className = "card-header";
  cardHeader.textContent = value.nome;

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var cardText = document.createElement("p");
  cardText.className = "card-text row";
  let minutesd = Math.floor(Math.floor(value.durata / 1000) / 60);
  let secondsd = Math.floor(value.durata / 1000) % 60;

  if (secondsd < 10) {
    secondsd = "0" + secondsd;
  }
  cardText.innerHTML =
    "<div class='col-xxl-6 col-12'><t class='fs-4'>Utente: </t>" +
    value.email[0] +
    "</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Tag: </t>" +
    value.tag +
    "</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Durata: </t>" +
    minutesd +
    ":" +
    secondsd +
    "</div>";

  var add = document.createElement("button");
  add.classList = "btn btn-outline-danger btn-sm";
  add.innerHTML = "OPEN";
  add.onclick = function () {
    sessionStorage.setItem("playlist", value.nome);
    sessionStorage.setItem("email", value.email);
    window.location.replace("/html/openADD.html");
  };

  cardBody.appendChild(cardText);

  cardBody.appendChild(add);

  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardBody);

  container.appendChild(cardDiv);
}
