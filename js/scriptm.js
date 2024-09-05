async function login(){
    var data = {
        email: document.getElementById("email").value,
        password: document.getElementById("pass").value
    }
    const post = await apicall("http://localhost:3000/login", data, "POST", false)
    if(post.res==true){
      sessionStorage.setItem("token", post.data);
      sessionStorage.setItem("user", document.getElementById("email").value);
      window.location.replace("/html/user.html");
    }
    
  }

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

// da implementare che siapre il coso
function forgot(){

}