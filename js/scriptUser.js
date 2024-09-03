let user,token;

function load(){
    user = sessionStorage.getItem("user");
    token = sessionStorage.getItem("token")
    if(user==null){
        window.location.replace("/html/main.html");
    }
    document.getElementById("User").innerHTML="BENVENUTO: "+user;
}
