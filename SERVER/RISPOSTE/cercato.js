import { getapi } from './connectapi.js';


async function cercato(tra){
    try{
    var spotifyApi = await getapi();
    var data = await spotifyApi.searchTracks(tra);
    var tracks = data.body;
    return{tracks: tracks, code:200 , status:"ok"};}
    catch(e){
        console.log(e);
        return { res:false ,  code:400 , mess: "Bed Request" };
    }

}

async function artisti(tra){
    try{
    var spotifyApi = await getapi();
    var data = await spotifyApi.searchArtists(tra);
    var artist = data.body;
    return{artist: artist, code:200 , mess:"ok"};}
    catch(e){
        console.log(e);
        return { res:false ,  code:400 , mess: "Bed Request" };
    }

}


export{cercato,artisti}