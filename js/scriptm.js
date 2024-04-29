async function login(){
    var data = {

        email: document.getElementById("email").value,
        password: document.getElementById("pass").value
    };
    const post = await fetch("http://localhost:3000/login", {
        method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(data) }).then(res => res.json());


  if(post.res==false){
    showAlert(post.code+" "+post.status , "danger");
    }
  else{
    sessionStorage.setItem("token", post.res);
    sessionStorage.setItem("user", document.getElementById("email").value);
    window.location.replace("/html/user.html");

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
