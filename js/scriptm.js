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

