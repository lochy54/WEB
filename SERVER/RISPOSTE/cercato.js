import { getapi } from './connectapi.js';


async function cercato(tra){
    try{
    var spotifyApi = await getapi();
    var data = await spotifyApi.searchTracks(tra , {limit:10});
    var tracks = data.body;
    return{res: tracks, code:200};}
    catch(e){
        return { res:false ,  code:500};
    }

}

async function artisti(tra){
    try{
    var spotifyApi = await getapi();
    var data = await spotifyApi.searchArtists(tra , {limit:5});
    var artist = data.body;
    return{res: artist, code:200};}
    catch(e){
        return { res:false ,  code:500};
    }

}


export{cercato,artisti}