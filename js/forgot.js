let sta, stat
async function sendEmail() {

    var post = await fetch("http://localhost:3000/forgot", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: document.getElementById("email").value })
  }).then(res => { sta = res.status; stat = res.statusText; return res.json() });


  if (post.res == false) {
    showAlert(sta + " " + stat, "danger");
  }
  else {
    showAlert(sta + " " + stat, "success");

  }
}


function showAlert(message, alertType) {
  document.getElementById("strong").innerHTML = message;
  document.getElementById("myAlert").className = "alert mt-3 text-center alert-" + alertType;
  document.getElementById("myAlert").style.display = "block";
}


function closeAlert() {
  document.getElementById("myAlert").style.display = "none";
}
