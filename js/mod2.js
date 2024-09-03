
let token, user, nome, play, id , value, durata;


    
    
    async function load() {

        user = sessionStorage.getItem("user");
        token = sessionStorage.getItem("token");
        play = sessionStorage.getItem("playlist");
        sessionStorage.removeItem("playlist");


      var value = []
        const post = await fetch("http://localhost:3000/modplaylist2", {
        method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({playlist:play, token:token}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
    
    if(post.res===false){
      if(sta===400){
        showAlert(sta+" "+stat , "danger");
      }else{
        logout()
      }
      }else{
        if(play==null){
          window.location.replace("/html/mod1.html");
      }
        tag=post.res.tag.toString();

        document.getElementById("nome").value=post.res.nome;
        document.getElementById("tag").value=tag;
        document.getElementById("dsc").value=post.res.descrizione;
        document.getElementById("Artista").value="";
        document.getElementById("status").checked=post.res.public;
        durata = post.res.durata;
        let minutes = Math.floor(Math.floor(post.res.durata / 1000) / 60);
        let seconds = Math.floor(post.res.durata / 1000) % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }


        document.getElementById("duration").innerHTML=  minutes + ":" + seconds;
         id = post.res._id
      value=post.res.canzoni.tracks
      if(value==null){
        return
      }
      for (let index = 0; index < value.length; index++) {
          addRow(value[index],"artist2","REM")
      }
      

      }
        
        if(user==null){
            window.location.replace("/html/main.html");
        }
      
   
    

    }
    
     
        
    
    async function cerca(){
      var cercato = document.getElementById("Artista").value;
      document.getElementById("artist1").innerHTML="";
    
    if(cercato!=""){
    
    const post = await fetch("http://localhost:3000/cerca", {
        method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({cercato: cercato, token:token}) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
    
    if(post.res===false){
      if(sta===400){
        showAlert(sta+" "+stat , "danger");
      }else{
        logout()
      }
      }else{
         item = post.tracks.tracks.items
      for (let index = 0; index < item.length; index++) {
          addRow(item[index],"artist1","ADD")
        
      }
    
    }
    }
    }
    

 
    
    

    function addRow(value,place,bnt) {
 var container = document.getElementById(place);
 var cardDiv = document.createElement("div");
 cardDiv.className = "card mb-3 col-lg-11 ms-lg-4";
   
 var cardHeader = document.createElement("h5");
 cardHeader.className = "card-header";
 cardHeader.textContent = "Nome: "+value.name;
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
 cardText.innerHTML = "<div class='col-lg-6 col-12'><t class='fs-4'>Album: </t>"+value.album.name+"</div> <div class='col-lg-6 col-12'><t class='fs-4'>Date: </t>"+value.album.release_date +"</div> <div class='col-lg-6 col-12'><t class='fs-4'>Nome: </t>"+value.artists[0].name+"</div> <div class='col-lg-6 col-12'><t class='fs-4'>Durata: </t>"+duration_formatted+"</div> "



var add = document.createElement("button");
add.classList="btn btn-outline-danger btn-sm"
add.innerHTML = bnt;
add.value= value.id;
add.onclick = function() {
  if(bnt=="REM"){
    container.removeChild(cardDiv)
    durata = durata - value.duration_ms
  }else{
    addRow(value,"artist2","REM")
    durata = durata + value.duration_ms

  }

  
 let minutesd = Math.floor(Math.floor(durata / 1000) / 60);
 let secondsd = Math.floor(durata / 1000) % 60;
 
 if (secondsd < 10) {
     secondsd = "0" + secondsd;
 }
 
 document.getElementById("duration").innerHTML= minutesd + ":" + secondsd ;

};

 cardBody.appendChild(cardText);
 cardBody.appendChild(add)

 cardDiv.appendChild(cardHeader);
 cardDiv.appendChild(cardBody);

 container.appendChild(cardDiv);
 
    
    
   }
      
    
    async function save(){
    
        var table = document.getElementById("artist2");
        var tbody = table.getElementsByTagName('div');
        var artistArray = [];

        for (var i = 1; i < tbody.length; i=i+6) {
          artistArray.push(tbody[i].childNodes[1].value)  
        }
        var nome = document.getElementById("nome").value;
        var tag = document.getElementById("tag").value.split(",");
        var desc = document.getElementById("dsc").value;
        var stat = document.getElementById("status").checked;
    
        var data = { nome: nome , tag : tag  , descrizione : desc , canzoni : artistArray,public : stat, token: token, id:id, durata:durata} ;
      
        const post = await fetch("http://localhost:3000/salvaMod", {
          method: 'PUT',
      headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data) }).then(res => { sta = res.status; stat= res.statusText; return res.json() });
      
      if(post.res===false){
        if(sta===400){
          showAlert(sta+" "+stat , "danger");
        }else{
          logout()
        }
        }else{
          showAlert(sta+" "+stat , "success");
    
        }
    
       
      }
    
    
    