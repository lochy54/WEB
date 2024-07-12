import { connectToCluster } from './connect.js';
import { getapi } from './connectapi.js';


async function cercacanzone(email){
    try{
    
        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");
    try {

        
        const playlist = await col.find({ "email": { $not: { $elemMatch: { $eq: email }}}, public: true},{ projection: { email: { $slice: 1 } } }).toArray();
        await client.close();
        return {res: playlist, code:200 , mess:"ok"};

    } catch (error) {
        await client.close();
        console.error(error);
        return {res:false , code:500 , mess: "Internal Server Error"};
    }}catch(error){
        console.error(error);
        return {res:false , code:500 , mess: "Internal Server Error"};
    }
}

export{cercacanzone}