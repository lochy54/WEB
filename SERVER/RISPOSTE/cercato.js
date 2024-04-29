import { getapi } from './connectapi.js';


async function cercato(tra){
    try{
    var spotifyApi = await getapi();
    var data = await spotifyApi.searchTracks('track:'+tra);
    var tracks = data.body;
    return{tracks: tracks, code:200 , status:"ok"};}
    catch(e){
        console.log(e);
        return { res:false ,  code:400 , status: "Bed Request" };
    }

}


export{cercato}