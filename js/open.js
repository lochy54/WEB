
let token, user, playlist, duration;


    
    
async function load() {
  user = sessionStorage.getItem("user");
  token = sessionStorage.getItem("token");
  playlist = sessionStorage.getItem("playlist")
  if (user == undefined || token == undefined) {
    await logout();
  }
  if( playlist == undefined || playlist == null){
    window.location.replace("/html/mod1.html")
  }
  playlist = JSON.parse(playlist)
  sessionStorage.removeItem("playlist")


      for (let index = 0; index < playlist.canzoni.tracks.length; index++) {
          addRow(playlist.canzoni.tracks[index])
      }

      
  
      }   
    

      
      function addRow(value) {
      
        var container = document.getElementById("modplay");
        var cardDiv = document.createElement("div");
        cardDiv.className = "card mb-3 p-3";
      
      var cardHeader = document.createElement("h5");
      cardHeader.className = "card-header bg-transparent border-0 p-0 mb-2";
      cardHeader.textContent = value.name;
      
        var cardBody = document.createElement("div");
        cardBody.className = "card-body p-0";
      
        var cardText = document.createElement("div");
        cardText.className = "row g-2 align-items-center";
      
        let minutesd = Math.floor(Math.floor(value.duration_ms/ 1000) / 60);
        let secondsd = Math.floor(value.duration_ms/ 1000) % 60;
      
        if (secondsd < 10) {
          secondsd = "0" + secondsd;
        }
      
        cardText.className = "card-text row";
        cardText.innerHTML =
          "<div class='col-12 col-lg-4'><span class='fw-bold'>Album: </span>" +
          value.album.name +
         "</div> <div class='col-12 col-lg-3'><span class='fw-bold'>Date: </span>" +
          value.album.release_date +
         "</div> <div class='col-12 col-lg-3'><span class='fw-bold'>Artista: </span>" +
          value.artists[0].name +
          "</div> <div class='col-12 col-lg-2'><span class='fw-bold'>Durata: </span>" +
          minutesd +
          ":" +
          secondsd +
          "</div>";
      
          cardBody.appendChild(cardText);
        cardDiv.appendChild(cardHeader);
        cardDiv.appendChild(cardBody);
      
        container.appendChild(cardDiv);
      }
      
      function cerca() {
        element = document.getElementById("modplay").childNodes;
        let serch = document.getElementById("Artista").value
        for (let index = 1; index < element.length; index++) {
          if (element[index].childNodes[0].innerHTML.includes(serch)||
          element[index].childNodes[1].childNodes[0].childNodes[0].childNodes[1].data.includes(serch)||
          element[index].childNodes[1].childNodes[0].childNodes[2].childNodes[1].data.includes(serch) ||
          element[index].childNodes[1].childNodes[0].childNodes[4].childNodes[1].data.includes(serch)

        ) {
            element[index].style.display = "block";
          } else {
            element[index].style.display = "none";
      
          }
        }
      }
      