let user,token;

function load(){
    user = sessionStorage.getItem("user");
    token = sessionStorage.getItem("token")
    if(user==null){
        window.location.replace("/html/main.html");
    }
    document.getElementById("User").innerHTML="BENVENUTO: "+user;
}

async function logout(){

    const post = await fetch("http://localhost:3000/logout", {
        method: 'POST',
     headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({token:token}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
    sessionStorage.clear();
    window.location.replace("/html/main.html");
}