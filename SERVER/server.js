import express from "express"; // Importing express module
import { getgenere } from './RISPOSTE/getgenere.js';
import { register } from './RISPOSTE/register.js';
import {login,forgot} from './RISPOSTE/login.js';
import {mod, modData, modPass} from './RISPOSTE/mod.js';
import {elimina} from './RISPOSTE/elimina.js';
import {cercato, artisti} from './RISPOSTE/cercato.js';
import {salva,salvaMod} from './RISPOSTE/salva.js';
import {modplaylist1,modplaylist3,modplaylist5,ADDplay,delPlaylist,remPlaylist} from './RISPOSTE/modplaylist.js';
import swaggerUi from "swagger-ui-express";
import swaggerDocument  from "./swagger-output.json" with { type: "json" };

const app = express(); // inizzializzazione
const port = 3000; // port

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua e Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaigian", "Bahamas",
  "Bahrein", "Bangladesh", "Barbados", "Bielorussia", "Belgio", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia ed Erzegovina", "Botswana", "Brasile",
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambogia", "Camerun", "Canada", "Capo Verde", "Repubblica Centrafricana", "Ciad", "Cile", "Cina",
  "Colombia", "Comore", "Congo", "Repubblica Democratica del Congo", "Costa Rica", "Croazia", "Cuba", "Cipro", "Repubblica Ceca", "Danimarca",
  "Djibouti", "Dominica", "Repubblica Dominicana", "Timor Est", "Ecuador", "Egitto", "El Salvador", "Guinea Equatoriale", "Eritrea", "Estonia",
  "Eswatini", "Etiopia", "Figi", "Finlandia", "Francia", "Gabon", "Gambia", "Georgia", "Germania", "Ghana", "Grecia", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Ungheria", "Islanda", "India", "Indonesia", "Iran", "Iraq", "Irlanda", "Israele", "Italia",
  "Costa d'Avorio", "Giamaica", "Giappone", "Giordania", "Kazakistan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kirghizistan", "Laos", "Lettonia",
  "Libano", "Lesotho", "Liberia", "Libia", "Liechtenstein", "Lituania", "Lussemburgo", "Madagascar", "Malawi", "Malesia", "Maldive", "Mali", "Malta",
  "Isole Marshall", "Mauritania", "Mauritius", "Messico", "Micronesia", "Moldavia", "Monaco", "Mongolia", "Montenegro", "Marocco", "Mozambico",
  "Myanmar", "Namibia", "Nauru", "Nepal", "Paesi Bassi", "Nuova Zelanda", "Nicaragua", "Niger", "Nigeria", "Corea del Nord", "Macedonia del Nord",
  "Norvegia", "Oman", "Pakistan", "Palau", "Panama", "Papua Nuova Guinea", "Paraguay", "Perù", "Filippine", "Polonia", "Portogallo", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts e Nevis", "Santa Lucia", "Saint Vincent e Grenadine", "Samoa", "San Marino", "Sao Tome e Principe",
  "Arabia Saudita", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovacchia", "Slovenia", "Isole Salomone", "Somalia", "Sudafrica",
  "Corea del Sud", "Sudan del Sud", "Spagna", "Sri Lanka", "Sudan", "Suriname", "Svezia", "Svizzera", "Siria", "Taiwan", "Tagikistan", "Tanzania",
  "Tailandia", "Togo", "Tonga", "Trinidad e Tobago", "Tunisia", "Turchia", "Turkmenistan", "Tuvalu", "Uganda", "Ucraina", "Emirati Arabi Uniti",
  "Regno Unito", "Stati Uniti d'America", "Uruguay", "Uzbekistan", "Vanuatu", "Città del Vaticano", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


// Middleware 
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument ));


//lista generi e array token
let generi = [];
var tokenlis = [];

// Route handlers

//ritorna lista generi
app.get('/genere', (req, res) => {
  console.log("generi richiesti");
  res.status(200).json(generi);
});

//elimina un profilo
app.delete('/elimina', async (req, res) => {
  console.log("Richiesta eliminazione profilo", req.body);
  if(chektoken(req.body.token)){
    let v = await elimina(findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});

//trova playlist create e ancora attive di un dato profilo 
app.post('/modplaylist1', async (req, res) => {
  console.log("Trovo playlist mp1:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist1(findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});



//trova le playlist create e non dall'utente ancora attive
app.post('/modplaylist3', async (req, res) => {
  console.log("Trovo playlist mp3:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist3(findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});


//elimina una playlist
app.delete('/eliminaPlaylist', async (req, res) => {
  console.log("Eliminazione playlist:", req.body);
  if(chektoken(req.body.token)){
    let v = await delPlaylist(findtoken(req.body.token),req.body.nome)
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});

//togli una playlist da un profilo
app.delete('/togliPlaylist', async (req, res) => {
  console.log("Tolgo la playlist:", req.body);  
  if(chektoken(req.body.token)){
    let v = await remPlaylist(findtoken(req.body.token),req.body.nome,req.body.email)
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});



//trova le playlist non create e non aggiunte dall'utente
app.post('/modplaylist5', async (req, res) => {
  console.log("Trovo playlist mp5:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist5(findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});


//registra profilo
app.put('/register', async (req, res) => {
  console.log("Richiesta registrazione:", req.body);
  let v = await register(req.body,generi,countries)
  res.status(v.code).json(v.res);
});

//login profilo , aggiungi token 
app.post('/login', async (req, res) => {
  console.log("Richiesta login:", req.body);
  let v = await login(req.body)
  res.status(v.code).json(v.res);
  if(v.res!=false){
   if(!chektoken(v.res)){
      tokenlis.push({token: v.res , time: new Date() , user: req.body.email})
      console.log("tokenlist:",tokenlis);
  }}
});
//logout profilo
app.post('/logout', (req, res) => {
  console.log("Richieta logout:", req.body);
      for (let index = 0; index < tokenlis.length; index++) {
        if (tokenlis[index].token === req.body.token) {
            tokenlis.splice(index, 1);
            console.log("rimuovo token:"+req.body.token);
          }}  
    res.status(200).json(true);
});

//modifica profilo (get data)
app.post('/mod', async (req, res) => {
  console.log("Mando dati profilo per modifica:", req.body);
  if(chektoken(req.body.token)){
    let v = await mod(findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});

//cambia la password di un profilo
app.put('/modPass', async(req, res) => {
  console.log("Richiesta modifica password: ", req.body);
  if(chektoken(req.body.token)){
    let v = await modPass(req.body,findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});

//modifica i dati di un profilo
app.put('/modData', async(req, res) => {
  var tokenre = req.body.token;
  delete req.body.token;
  console.log("Ridviesta modifica dati: ", req.body);
  if(chektoken(tokenre)){
    let v = await modData(req.body,findtoken(tokenre),generi,countries)
    res.status(v.code).json(v.res);
  for (let index = 0; index < tokenlis.length; index++) {
    if (tokenlis[index].token === tokenre) {
        tokenlis[index].user= req.body.email;
    }}
  }else{
    res.status(401).json(false);
  }
});

//aggiungi playlist a profilo 
app.put('/ADDplaylist', async (req, res) => {
  console.log("Aggiungo playlist a profilo:", req.body);
  if(chektoken(req.body.token)){
    let v = await ADDplay(findtoken(req.body.token),req.body.emailpass,req.body.playlist)
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});

// cerca canzone
app.post('/cerca', async (req, res) => {
  console.log("Cercato generico:", req.body.cercato);
  if(chektoken(req.body.token)){
    let v = await cercato(req.body.cercato)
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});


// cerca artisti
app.post('/artisti', async (req, res) => {
  console.log("Cercato artisti:", req.body.cercato);
    let v = await artisti(req.body.cercato)
    res.status(v.code).json(v.res);
});


//salva playlist
app.put('/salva', async (req, res) => {
  console.log("Rischiesta salvataggio playlist: ", req.body);
  if(chektoken(req.body.token)){
    let v = await salva(req.body, findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});

//salva modifiche playlist
app.put('/salvaMod', async (req, res) => {
  console.log("Richiesta salvataggio modifiche playlist: ", req.body);
  if(chektoken(req.body.token)){
    let v = await salvaMod(req.body, findtoken(req.body.token))
    res.status(v.code).json(v.res);
  }else{
    res.status(401).json(false);
  }
});

//forgot password
app.post('/forgot', async (req, res) => {
  console.log("Forgot pass: ", req.body);
  let v = forgot(req.body.email);
    res.status(v.code).json(v.res);

});


//setup generi ask ogni 5 min (potrebbero cambiare)
(async () => {
  generi = await getgenere();
  setInterval(async () => {
    generi = await getgenere();
  }, 5 * 60 * 1000);


  // Start server
  app.listen(port, () => {
    console.log(port);
  });

})();


//ce un token attivo , se cè aggiorno l'oriario
function chektoken(value) {
  const currentTime = new Date(); 
  const tenMinutesAgo = new Date(currentTime.getTime() - (5 * 100 * 1000)); 

  for (let index = 0; index < tokenlis.length; index++) {
      if (tokenlis[index].token === value) {
          if (tokenlis[index].time <= tenMinutesAgo) {
              tokenlis.splice(index, 1);
              return false;
          } else {
              tokenlis[index].time = currentTime; 
              console.log("Token aggiornato");
              return true;
          }
      }
  }

  // Se il token non è stato trovato
  return false;
}

//dato un token trova l'email
function findtoken(token){
  for (let index = 0; index < tokenlis.length; index++) {
    if (tokenlis[index].token === token) {
        return tokenlis[index].user;
        }}}