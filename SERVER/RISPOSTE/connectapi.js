import request  from "request";
import SpotifyWebApi from "spotify-web-api-node";


async function gettoken() {
    const client_id = '80c861fd6b084de3bddd82e305be6fcc';
    const client_secret = '0d45b84ca78e436eaf57b2a7d8961944';
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
    };


    return new Promise((resolve, reject) => {
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body.access_token);
            } else {
                reject(error);
            }
        });
    });
}


async function getapi() {

        var access_token = await gettoken();
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(access_token);
        return spotifyApi;
}

   
export {getapi}
