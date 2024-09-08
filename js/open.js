let token, user, playlist, duration;


    
    
async function load() {
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token");
  playlist = sessionStorage.getItem("playlist")
  if (user == undefined || token == undefined) {
    await logout();
  }
  if( playlist == undefined || playlist == null){
    window.location.replace("/html/user.html")
  }
  playlist = JSON.parse(playlist)
  sessionStorage.removeItem("playlist")



      for (let index = 0; index < playlist.length; index++) {
        addRow(value[index])
    }
      

      }
        
        if(user==null){
            window.location.replace("/html/main.html");
        }
      
   
    

    }
    

        
    

    


    function addRow(value) {
 var container = document.getElementById("modplay");
 var cardDiv = document.createElement("div");
 cardDiv.className = "card mb-3 col-lg-11 ms-lg-4";
   
 var cardHeader = document.createElement("h5");
 cardHeader.className = "card-header";
 cardHeader.textContent = value.name;
 var cardBody = document.createElement("div");
 cardBody.className = "card-body";


 var cardText = document.createElement("p");



let minutes = Math.floor(Math.floor(value.duration_ms / 1000) / 60);
let seconds = Math.floor(value.duration_ms / 1000) % 60;

if (seconds < 10) {
    seconds = "0" + seconds;
}

var duration_formatted = minutes + ":" + seconds;


 cardText.className = "card-text row";
 cardText.innerHTML = "<div class='col-lg-6 col-12'><t class='fs-4'>Album: </t>"+value.album.name+"</div> <div class='col-lg-6 col-12'><t class='fs-4'>Date: </t>"+value.album.release_date +"</div> <div class='col-lg-6 col-12'><t class='fs-4'>Artista: </t>"+value.artists[0].name+"</div> <div class='col-lg-6 col-12'><t class='fs-4'>Durata: </t>"+duration_formatted+"</div> "


 cardBody.appendChild(cardText);

 cardDiv.appendChild(cardHeader);
 cardDiv.appendChild(cardBody);

 container.appendChild(cardDiv);
 

    
    
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