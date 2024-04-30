import express from "express"; // Importing express module
import { getgenere } from './RISPOSTE/getgenere.js';
import { register } from './RISPOSTE/register.js';
import mongoSanitize from 'express-mongo-sanitize';
import { login } from './RISPOSTE/login.js';
import { forgot } from './RISPOSTE/login.js';

import { mod , modData, modPass } from './RISPOSTE/mod.js';
import {elimina} from './RISPOSTE/elimina.js';
import {cercato} from './RISPOSTE/cercato.js';
import {salva} from './RISPOSTE/salva.js';
import {salvaMod} from './RISPOSTE/salva.js';
import {modplaylist1} from './RISPOSTE/modplaylist.js';
import {modplaylist2} from './RISPOSTE/modplaylist.js';
import {modplaylist3} from './RISPOSTE/modplaylist.js';
import {modplaylist4} from './RISPOSTE/modplaylist.js';
import {ADDplay} from './RISPOSTE/modplaylist.js';
import {delPlaylist} from './RISPOSTE/modplaylist.js';
import {cercacanzone} from './RISPOSTE/carcacanzone.js';


const app = express(); // inizzializzazione
const port = 3000; // port

// Middleware 
app.use(express.json());
app.use(mongoSanitize());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

//lista generi e array token
let generi = [];
var tokenlis = [];

// Route handlers
app.get('/genere', (req, res) => {
  console.log("generi richiesti");
  res.json(generi);
});

//elimina un profilo
app.post('/elimina', async (req, res) => {
  console.log("Received elimination request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await elimina(findtoken(req.body.token)));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//trova playlist di un dato profilo (modifica playlist)
app.post('/modplaylist1', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await modplaylist1(findtoken(req.body.token)));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});


//elimina una playlist
app.post('/eliminaPlaylist', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await delPlaylist(findtoken(req.body.token),req.body.nome));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//trova canzioni in una playlist di un dato profilo (modifica playlist)
app.post('/modplaylist2', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await modplaylist2(findtoken(req.body.token) ,req.body.playlist));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//trova playlist che non sono state salvate da un profilo (libreria)
app.post('/modplaylist3', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await modplaylist3(findtoken(req.body.token)));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//cerca playlist che non contengono la mail di un profilo (cerca)
app.post('/cercacanzone', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await cercacanzone(findtoken(req.body.token)));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//trova canzioni in una playlist di un dato profilo (libreria) per via dell'array delle email l'implementazione è diversa
app.post('/modplaylist4', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await modplaylist4(findtoken(req.body.token) ,req.body.playlist));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//trova canzioni in una playlist di un dato profilo (cerca)
app.post('/modplaylist5', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  
  if(chektoken(req.body.token)){
    res.json(await modplaylist2(req.body.emailpass,req.body.playlist));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//registra profilo
app.post('/register', async (req, res) => {
  console.log("Received registration request with message:", req.body);
  var ris = await register(req.body,generi)
  console.log(ris);
  res.json(ris);
});
//login profilo , aggiungi token 
app.post('/login', async (req, res) => {
  console.log("Received login request with message:", req.body);
  var ris = await login(req.body)
  console.log(ris);
  res.json(ris);
  if(ris.res!=false){

   if(!chektoken(ris.res)){
      tokenlis.push({token: ris.res , time: new Date() , user: req.body.email})
      console.log(tokenlis);
  }}
});
//logout profilo
app.post('/logout', (req, res) => {
  console.log("Received logout request with message:", req.body);

      for (let index = 0; index < tokenlis.length; index++) {
        if (tokenlis[index].token === req.body.token) {
            tokenlis.splice(index, 1);
            console.log("rimuovo "+req.body.token);
          }}  

    res.json({ res:true , code:200 , status: "OK" });
});

//modifica profilo (get data)
app.post('/mod', async (req, res) => {
  console.log("Received mod request with message:", req.body);

  if(chektoken(req.body.token)){
    res.json(await mod(findtoken(req.body.token)));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//aggiungi playlist a profilo (cerca)
app.post('/ADDplaylist', async (req, res) => {
  console.log("Received add request with message:", req.body);

  if(chektoken(req.body.token)){
    res.json(await ADDplay(findtoken(req.body.token),req.body.emailpass,req.body.playlist));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//cambia la password di un profilo
app.post('/modPass', async(req, res) => {
  console.log("modifica richiesta: ", req.body);
  if(chektoken(req.body.token)){
    res.json( await modPass(req.body,findtoken(req.body.token)));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//modifica i dati di un profilo
app.post('/modData', async(req, res) => {
  var tokenre = req.body.token;
  delete req.body.token;
  console.log("modifica richiesta: ", req.body);
  if(chektoken(tokenre)){
    res.json( await modData(req.body,findtoken(tokenre),generi));
    
  for (let index = 0; index < tokenlis.length; index++) {
    if (tokenlis[index].token === tokenre) {
        tokenlis[index].user= req.body.email;
        console.log(tokenlis)
    }}
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});


// cerca canzone
app.post('/cerca', async (req, res) => {
  console.log("cercato", req.body.cercato);
  if(chektoken(req.body.token)){
    res.json(await cercato(req.body.cercato));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//salva playlist
app.post('/salva', async (req, res) => {
  console.log("salva playlist: ", req.body);
  if(chektoken(req.body.token)){
    res.json(await salva(req.body, findtoken(req.body.token)));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//salva modifiche playlist
app.post('/salvaMod', async (req, res) => {
  console.log("salva playlist: ", req.body);
  if(chektoken(req.body.token)){
    res.json(await salvaMod(req.body));
  }else{
    res.json({ res:false ,  code:500 , status: "Internal server error" });
  }
});

//salva playlist
app.post('/forgot', async (req, res) => {
  console.log("Forgot passwor: ", req.body);
    res.json(forgot(req.body.email));

});


//setup generi ask ogni 5 min (potrebbero cambiare)
(async () => {
  generi = await getgenere();
  setInterval(async () => {
    generi = await getgenere();
  }, 5 * 60 * 1000);


  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

})();


//ce un token attivo , se cè aggiorno l'oriario
function chektoken(value) {
  const currentTime = new Date(); // Ottieni l'ora corrente
  const tenMinutesAgo = new Date(currentTime.getTime() - (5 * 100 * 1000)); // Calcola il tempo 5 minuti fa

  for (let index = 0; index < tokenlis.length; index++) {
      if (tokenlis[index].token === value) {
          // Se il token è stato trovato
          if (tokenlis[index].time <= tenMinutesAgo) {
              // Se il token è più vecchio di 5 minuti
              tokenlis.splice(index, 1);
              return false;
          } else {
              // Se il token è stato trovato e ha meno di 5 minuti
              tokenlis[index].time = currentTime; // Aggiorna il tempo del token con l'ora corrente
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