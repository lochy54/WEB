
let token, user, nome, play, id , value,emailpass;


    async function logout(){
    
        const post = await fetch("http://localhost:3000/logout", {
            method: 'POST',
         headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token:token}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
        sessionStorage.clear;
        window.location.replace("/html/main.html");
    }
    
    function cerca(){
        element = document.getElementById("modplay").childNodes;
        for (let index = 1; index < element.length; index++) {
          if(!(element[index].childNodes[0].innerHTML.includes(document.getElementById("Artista").value))){
            element[index].style.display="none"
          }else{
            element[index].style.display="block"
      
          }
       
      }
      }
    async function load() {
        user = sessionStorage.getItem("user");
        token = sessionStorage.getItem("token");
        play = sessionStorage.getItem("playlist");
        emailpass =  sessionStorage.getItem("email");
        sessionStorage.removeItem("playlist");
        sessionStorage.removeItem("email");


      var value = []
        const post = await fetch("http://localhost:3000/modplaylist6", {
        method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({playlist:play, token:token , emailpass:emailpass}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
    
    if(post.res===false){
      if(sta===400){
        showAlert(sta+" "+stat , "danger");
      }else{
        logout()
      }
      }else{
        if(play==null){
          window.location.replace("/html/libreria.html");
      }
         id = post.res._id
      value=post.res.canzoni.tracks
      if(value==null){
        return
      }
      for (let index = 0; index < value.length; index++) {
        addRow(value[index])
    }
      

      }
        
        if(user==null){
            window.location.replace("/html/main.html");
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


    function addRow(value) {
      // Get the container element where you want to append the new row
 var container = document.getElementById("modplay");
 // Create the outer div element for the card
 var cardDiv = document.createElement("div");
 cardDiv.className = "card mb-3 col-xxl-11 ms-xxl-4";
   
 // Create the card header element
 var cardHeader = document.createElement("h5");
 cardHeader.className = "card-header";
 cardHeader.textContent = value.name;
 // Create the card body element
 var cardBody = document.createElement("div");
 cardBody.className = "card-body";


 // Create the card text element
 var cardText = document.createElement("p");
 cardText.className = "card-text";
 cardText.textContent = "Album : "+value.album.name;

 // Create the card text element
 var cardText = document.createElement("p");



// Calculate minutes and remaining seconds
let minutes = Math.floor(Math.floor(value.duration_ms / 1000) / 60);
let seconds = Math.floor(value.duration_ms / 1000) % 60;

// Add leading zero if seconds is less than 10
if (seconds < 10) {
    seconds = "0" + seconds;
}

// Format the duration as "mm:ss"
var duration_formatted = minutes + ":" + seconds;


 cardText.className = "card-text row";
 cardText.innerHTML = "<div class='col-xxl-6 col-12'><t class='fs-4'>Album: </t>"+value.album.name+"</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Date: </t>"+value.album.release_date +"</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Artista: </t>"+value.artists[0].name+"</div> <div class='col-xxl-6 col-12'><t class='fs-4'>Durata: </t>"+duration_formatted+"</div> "


 cardBody.appendChild(cardText);

 // Append card header and body to the card
 cardDiv.appendChild(cardHeader);
 cardDiv.appendChild(cardBody);

 // Append the card to the container
 container.appendChild(cardDiv);
 

    
    
   }

   async function save(){

    const post = await fetch("http://localhost:3000/ADDplaylist", {
      method: 'PUT',
  headers: {
  'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({playlist:play, token:token , emailpass:emailpass}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
  
  if(post.res===false){
    if(sta===400){
      showAlert(sta+" "+stat , "danger");
    }else{
      logout()
    }
    }
    window.location.replace("/html/cerca.html");
   }