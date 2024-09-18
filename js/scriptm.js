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
    const post = await apicall("http://localhost:3000/forgot",{ email: document.getElementById("emailForgot").value }, "POST",true)
}

function forgot(){
    if(document.getElementById("forgot").style.display=="block"){
      document.getElementById("forgot").style.display="none"
    }else{
    document.getElementById("forgot").style.display="block"}
}
