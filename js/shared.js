var shown = true;

function showAlert(message, alertType) {
  document.getElementById("strong").innerHTML = message;
  document.getElementById("myAlert").className =
    "alert mt-3 text-center alert-" + alertType;
  document.getElementById("myAlert").style.display = "block";
}

function closeAlert() {
  document.getElementById("myAlert").style.display = "none";
}

async function logout() {
  var token = sessionStorage.getItem("token");
  var res = await apicall(
    "http://localhost:3000/logout",
    { token: token },
    "POST",
    false
  );
  if (res.res) {
    sessionStorage.clear;
    window.location.replace("/html/main.html");
  }
}

async function apicall(url, data, type, allert) {
  let param;
  if (data == null) {
    param = {
      method: type,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    };
  } else {
    param = {
      method: type,
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    };
  }
  const call = await fetch(url, param).then((res) => {
    sta = res.status;
    stat = res.statusText;
    return res.json();
  });

  if (call !== false) {
    if (allert) {
      showAlert(sta + " " + stat, "success");
    }
    return { res: true, data: call, sta: sta };
  } else if (sta != 401) {
    showAlert(sta + " " + stat, "danger");
    return { res: false, data: call, sta: sta };
  } else {
    return { res: false, data: call, sta: sta };
  }
}
//show unshow cambiato
function show() {
  if (shown) {
    document.getElementById("content").classList.replace("d-none", "d-flex");
  } else {
    document.getElementById("content").classList.replace("d-flex", "d-none");
  }
  shown = !shown;
}
