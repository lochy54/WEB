import { getapi } from './connectapi.js';
 
async function getgenere(){
        try{
        var spotifyApi = await getapi();
        var data = await spotifyApi.getAvailableGenreSeeds();
        var genere = data.body;
        return genere;
        }catch(e){
                console.log(e);
        }
}
export {getgenere}
