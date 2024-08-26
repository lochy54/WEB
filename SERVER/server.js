import express from "express"; // Importing express module
import { getgenere } from './RISPOSTE/getgenere.js';
import { register } from './RISPOSTE/register.js';
import mongoSanitize from 'express-mongo-sanitize';
import {login,forgot} from './RISPOSTE/login.js';
import {mod, modData, modPass} from './RISPOSTE/mod.js';
import {elimina} from './RISPOSTE/elimina.js';
import {cercato, artisti} from './RISPOSTE/cercato.js';
import {salva,salvaMod} from './RISPOSTE/salva.js';
import {modplaylist1,modplaylist2,modplaylist3,modplaylist4,modplaylist5,ADDplay,delPlaylist,remPlaylist} from './RISPOSTE/modplaylist.js';
import swaggerUi from "swagger-ui-express";
import swaggerDocument  from "./swagger-output.json" with { type: "json" };

const app = express(); // inizzializzazione
const port = 3000; // port



// Middleware 
app.use(express.json());
app.use(mongoSanitize());
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
app.get('/genere', (req, res) => {
  console.log("generi richiesti");
  res.status(200).json(generi);
});

//elimina un profilo
app.delete('/elimina', async (req, res) => {
  console.log("Received elimination request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await elimina(findtoken(req.body.token))
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//trova playlist create e ancora attive di un dato profilo 
app.post('/modplaylist1', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist1(findtoken(req.body.token))
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//trova canzioni in una playlist creata ancora attiva di un dato profilo
app.post('/modplaylist2', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist2(findtoken(req.body.token) ,req.body.playlist)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//trova le playlist create e non dall'utente ancora attive
app.post('/modplaylist3', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist3(findtoken(req.body.token))
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});
//trova le canzini data una plyalist creata o non creata dall'utente ancora attiva
app.post('/modplaylist4', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist4(findtoken(req.body.token) ,req.body.playlist)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//elimina una playlist
app.delete('/eliminaPlaylist', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await delPlaylist(findtoken(req.body.token),req.body.nome)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//togli una playlist da un profilo
app.delete('/togliPlaylist', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await remPlaylist(findtoken(req.body.token),req.body.nome)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});



//trova le playlist non create e non aggiunte dall'utente
app.post('/modplaylist5', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist5(findtoken(req.body.token))
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//trova le canzini data una plyalist non creata dall'utente ancora attiva
app.post('/modplaylist6', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await modplaylist2(req.body.emailpass,req.body.playlist)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//registra profilo
app.put('/register', async (req, res) => {
  console.log("Received registration request with message:", req.body);
  let v = await register(req.body,generi)
  console.log(v);
  res.status(v.code).json(v);
});

//login profilo , aggiungi token 
app.post('/login', async (req, res) => {
  console.log("Received login request with message:", req.body);
  let v = await login(req.body)
  console.log(v);
  res.status(v.code).json(v);
  if(v.res!=false){
   if(!chektoken(v.res)){
      tokenlis.push({token: v.res , time: new Date() , user: req.body.email})
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
    res.status(200).json({ res:true , code:200});
});

//modifica profilo (get data)
app.post('/mod', async (req, res) => {
  console.log("Received mod request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await mod(findtoken(req.body.token))
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//cambia la password di un profilo
app.put('/modPass', async(req, res) => {
  console.log("modifica richiesta: ", req.body);
  if(chektoken(req.body.token)){
    let v = await modPass(req.body,findtoken(req.body.token))
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//modifica i dati di un profilo
app.put('/modData', async(req, res) => {
  var tokenre = req.body.token;
  delete req.body.token;
  console.log("modifica richiesta: ", req.body);
  if(chektoken(tokenre)){
    let v = await modData(req.body,findtoken(tokenre),generi)
    res.status(v.code).json(v);
  for (let index = 0; index < tokenlis.length; index++) {
    if (tokenlis[index].token === tokenre) {
        tokenlis[index].user= req.body.email;
        console.log(tokenlis)
    }}
  }else{
    res.status(401).json({ res:false});
  }
});

//aggiungi playlist a profilo 
app.put('/ADDplaylist', async (req, res) => {
  console.log("Received add request with message:", req.body);
  if(chektoken(req.body.token)){
    let v = await ADDplay(findtoken(req.body.token),req.body.emailpass,req.body.playlist)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

// cerca canzone
app.post('/cerca', async (req, res) => {
  console.log("cercato", req.body.cercato);
  if(chektoken(req.body.token)){
    let v = await cercato(req.body.cercato)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});


// cerca artisti
app.post('/artisti', async (req, res) => {
  console.log("cercato", req.body.cercato);
    let v = await artisti(req.body.cercato)
    res.status(v.code).json(v);
});


//salva playlist
app.put('/salva', async (req, res) => {
  console.log("salva playlist: ", req.body);
  if(chektoken(req.body.token)){
    let v = await salva(req.body, findtoken(req.body.token))
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//salva modifiche playlist
app.put('/salvaMod', async (req, res) => {
  console.log("salva playlist: ", req.body);
  if(chektoken(req.body.token)){
    let v = await salvaMod(req.body)
    res.status(v.code).json(v);
  }else{
    res.status(401).json({ res:false});
  }
});

//forgot password
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


  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
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