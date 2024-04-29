let genres,size;

async function load() {
    const get = await fetch("http://localhost:3000/genere").then(res => res.json());
    genres = get.genres;
    const gen = document.getElementById("gen");
    for (let i = 0; i < genres.length; i++) {
  gen.innerHTML= gen.innerHTML+'<div class="col-6 col-xxl-3"><input class="form-check-input" type="checkbox" value="'+genres[i]+'"id="'+i+'"/> <label class="form-check-label"> '+genres[i]+'</label></div>';
  }
  size=genres.length;
}

  function show(){
    document.getElementById("content").classList.replace('d-none','d-flex')
  }

  function unshow(){
    document.getElementById("content").classList.replace('d-flex','d-none')
  }

  async function register(){
    var data = {
        nome: document.getElementById("nome").value,
        cognome: document.getElementById("cognome").value,
        data: document.getElementById("data").value,
        paese:  document.getElementById("paese").options[document.getElementById("paese").selectedIndex].value,
        email: document.getElementById("email").value,
        password: document.getElementById("pass").value,
        generi: getSelectedGenres(),
        artisti: selectedArtist()
    };
    const post = await fetch("http://localhost:3000/register", {
        method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(data) }).then(res => res.json());

    if(post.res==true){
    showAlert(post.code+" "+post.status , "success");
    }else{
    showAlert(post.code+" "+post.status  , "danger");}
  }


  function getSelectedGenres() {
    var selectedGenres = [];
    var checkboxes = document.querySelectorAll('.form-check-input');
    
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedGenres.push(checkbox.value);
        }
    });
    
    return selectedGenres;
}


function showAlert(message, alertType) {
  document.getElementById("strong").innerHTML = message;
  document.getElementById("myAlert").className = "alert mt-3 text-center alert-" + alertType;
  document.getElementById("myAlert").style.display = "block";
}


function closeAlert() {
  document.getElementById("myAlert").style.display = "none";
}



function addArtist(){
  
  if(document.getElementById('Artista').value==""){
    return false;
  }
  addRow(document.createTextNode(document.getElementById('Artista').value))
  document.getElementById('Artista').value="";
}

function addRow(value) {
  var tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
  var newRow = tableBody.insertRow();
  
  var cell1 = newRow.insertCell(0);
  cell1.appendChild(value);
  
  var cell2 = newRow.insertCell(1);
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Elimina";
  deleteButton.classList="btn btn-outline-danger btn-sm"

  deleteButton.onclick = function() {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  };
  cell2.appendChild(deleteButton);
}

function selectedArtist() {
  var table = document.getElementById("myTable");
  var tbody = table.getElementsByTagName('tbody')[0];
  var rows = tbody.getElementsByTagName('tr');
  var artistArray = [];

  for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName('td');
      if (cells.length > 0) {
          var artistName = cells[0].innerText;
          artistArray.push(artistName);
      }
  }

  return artistArray;
}