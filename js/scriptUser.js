let user,token;

async function load() {
    user = sessionStorage.getItem("user");
    token = sessionStorage.getItem("token");
    if (user == undefined || token == undefined) {
      await logout();
    }
    document.getElementById("User").innerHTML=user;
}