import { connectToCluster } from './connect.js';
import { getapi } from './connectapi.js';

async function modplaylist1(email){

    try{
        const client = await connectToCluster();
        try{
    
            const db = client.db("Uni");
            const col = db.collection("Playlist");
            const playlist = await col.find({"email.0":email}).toArray()
            return {res: playlist, code:200};

        }catch(error){
            console.error(error);
            return {res:false , code:500};
        }finally{
            await client.close();
        }}catch(error){
            console.error(error);
            return {res:false , code:500};
        }
    }
    


async function modplaylist3(email){

try{  
    const client = await connectToCluster();
    try{
        const db = client.db("Uni");
        const col = db.collection("Playlist");        
        const playlist = await col.find({ "email": email }).toArray()
        return {res: playlist, code:200};

    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }finally{
        await client.close();
    }}catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}




async function modplaylist5(email){
    try{
        const client = await connectToCluster();
    try{
    
        const db = client.db("Uni");
        const col = db.collection("Playlist");        
        const playlist = await col.find({ "email": { "$ne": email}, "public": true}).toArray();
        return {res: playlist, code:200};

    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }finally{
        await client.close();
    }}catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}




async function ADDplay(email,emailpass,nome){

    try{
        const client = await connectToCluster();

        try{
        const db = client.db("Uni");
        const col = db.collection("Playlist"); 
        const res = await col.updateOne(
            { "email.0":emailpass, "nome":nome}, // Filter
            { $push: { email: email }}
        );
        if (res.modifiedCount==0){
            return {res: false, code:400};
        }
        return {res: true, code:200};

    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }finally{
        await client.close();
    }}catch(error){
        console.error(error);
        return {res:false , code:500};
    }


   
}


async function delPlaylist(email,nome){
    try{
        const client = await connectToCluster();
        try{
        const db = client.db("Uni");
        const col = db.collection("Playlist");
        const deletecount = await col.deleteOne({"email.0":email, "nome":nome});
        if (deletecount.deletedCount==0){
            return {res:false , code:400};
        }
        return {res:true , code:200};
   
    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }finally{
        await client.close();
    }
}catch(error){
    console.error(error);
    return {res:false , code:500};
}
}

async function remPlaylist(email,nome, email1){
    try{
        const client = await connectToCluster();
        try{
        const db = client.db("Uni");
        const col = db.collection("Playlist");
        const deletecount = await col.updateOne({ "email.0": email1 , "nome": nome }, { $pull: { email: email } });
        if (deletecount.modifiedCount==0){
            return {res:false , code:400};
        }
        return {res:true , code:200 };
   
    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }finally{
        await client.close();
    }}catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}

export{modplaylist1,modplaylist3,modplaylist5,ADDplay,delPlaylist,remPlaylist};