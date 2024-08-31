import { connectToCluster } from './connect.js';
import { getapi } from './connectapi.js';

async function modplaylist1(email){

    
        try{
    
            const client = await connectToCluster();
            const db = client.db("Uni");
            const col = db.collection("Playlist");
            const playlist = await col.find({"email.0":email}).toArray()
            await client.close();
            return {res: playlist, code:200};

        }catch(error){
            console.error(error);
            return {res:false , code:500};
        }
    }
    


async function modplaylist2(email,nome){

    try{
    
        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");        
        const playlist = await col.findOne({"email.0":email, "nome":nome})
        await client.close();
        if (playlist==null){
                return {res: false, code:400};
            }
            var spotifyApi = await getapi();
            if (playlist.canzoni.length!=0){
                var tra = []
                tra.push(playlist.canzoni)
                var data = await spotifyApi.getTracks(tra);
                var tracks = data.body;
                playlist.canzoni=tracks;
            }else{
                playlist.canzoni.tracks=null; 
            } 
            return {res: playlist, code:200};   
    
    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}


async function modplaylist3(email){

    
    try{

        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");        
        const playlist = await col.find({ "email": { $elemMatch: { $eq: email } } }).toArray()
        await client.close();
        return {res: playlist, code:200};

    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}



async function modplaylist4(email,nome){



try{

    const client = await connectToCluster();
    const db = client.db("Uni");
    const col = db.collection("Playlist");
    const playlist = await col.findOne({ "email": { $elemMatch: { $eq: email } }, nome:nome})
    await client.close();
    if (playlist==null){
        return {res: false, code:400};
    }
        var spotifyApi = await getapi();
        if (playlist.canzoni.length!=0){
            var tra = []
            tra.push(playlist.canzoni)
            var data = await spotifyApi.getTracks(tra);
            var tracks = data.body;
            playlist.canzoni=tracks;
        }else{
            playlist.canzoni.tracks=null; 
        }

            
         
       
        
        return {res: playlist, code:200};}
 catch(error){
    console.error(error);
    return {res:false , code:500 };
}
}

async function modplaylist5(email){
    try{
    
        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");        
        const playlist = await col.find({ "email": { $not: { $elemMatch: { $eq: email }}}, public: true},{ projection: { email: { $slice: 1 } } }).toArray();
        await client.close();
        return {res: playlist, code:200};

    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}


async function ADDplay(email,emailpass,nome){

    try{

        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist"); 
        const res = await col.updateOne(
            { "email.0":emailpass, "nome":nome}, // Filter
            { $push: { email: email }}
        );
        if (res.matchedCount==0){
            await client.close();
            return {res: false, code:400};
        }
        await client.close();
        return {res: true, code:200};

    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }


   
}


async function delPlaylist(email,nome){
    try{

        const client = await connectToCluster();
        const session = client.startSession()
        try{
        await session.startTransaction()
        const db = client.db("Uni");
        const col = db.collection("Playlist");
        const deletecount = await col.deleteOne({"email.0":email, "nome":nome});
        await session.commitTransaction()
        await client.close();
        if (deletecount.deletedCount==0){
            return {res:false , code:400};
        }
        return {res:true , code:200};
   
    }catch(error){
        await session.abortTransaction()
        console.error(error);
        return {res:false , code:500};
    }
}catch(error){
    console.error(error);
    return {res:false , code:500};
}
}

async function remPlaylist(email,nome){
    try{
        const client = await connectToCluster();
        const session = client.startSession()
        try{
        await session.startTransaction()
        const db = client.db("Uni");
        const col = db.collection("Playlist");
        const deletecount = await col.updateOne({ "email": { $elemMatch: {$eq: email, $ne: { $arrayElemAt: ["$email", 0] } } }, "nome": nome }, { $pull: { email: email } });
        await session.commitTransaction()
        await client.close();
        if (deletecount.deletedCount==0){
            return {res:false , code:400};
        }
        return {res:true , code:200 };
   
    }catch(error){
        session.abortTransaction()
        console.error(error);
        return {res:false , code:500};
    }}catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}

export{modplaylist1,modplaylist2,modplaylist3,modplaylist4,modplaylist5,ADDplay,delPlaylist,remPlaylist};